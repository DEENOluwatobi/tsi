import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';

interface Admin {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    designation: string;
    role: string;
}

interface AdminState {
    admin: Admin | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
    'admin/loginAdmin',
    async (credentials: { email: string; passkey: string }, { rejectWithValue }) => {
        try {
        const adminCollection = collection(db, 'admin');
        const q = query(
            adminCollection,
            where('email', '==', credentials.email.toLowerCase()),
            where('passkey', '==', credentials.passkey)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return rejectWithValue('Invalid email or passkey');
        }

        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data() as Omit<Admin, 'id'>;

        const admin: Admin = {
            id: adminDoc.id,
            ...adminData,
        };

        // Store in localStorage with admin-specific key
        localStorage.setItem('adminAuth', JSON.stringify({
            admin,
            isAuthenticated: true,
            timestamp: Date.now()
        }));

        return admin;
        } catch (error: any) {
        return rejectWithValue(error.message || 'Login failed');
        }
    }
);

// Async thunk to check admin authentication
export const checkAdminAuth = createAsyncThunk(
    'admin/checkAdminAuth',
    async (_, { rejectWithValue }) => {
        try {
        const adminAuth = localStorage.getItem('adminAuth');
        
        if (!adminAuth) {
            return rejectWithValue('No admin authentication found');
        }

        const { admin, isAuthenticated, timestamp } = JSON.parse(adminAuth);
        
        // Check if session is older than 24 hours
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp > TWENTY_FOUR_HOURS) {
            localStorage.removeItem('adminAuth');
            return rejectWithValue('Session expired');
        }

        if (!isAuthenticated || !admin) {
            return rejectWithValue('Invalid admin authentication');
        }

        return admin;
        } catch (error: any) {
        localStorage.removeItem('adminAuth');
        return rejectWithValue('Authentication check failed');
        }
    }
);

// Async thunk for admin logout
export const logoutAdmin = createAsyncThunk(
    'admin/logoutAdmin',
    async () => {
        localStorage.removeItem('adminAuth');
        return null;
    }
    );

    const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAdminError: (state) => {
        state.error = null;
        },
        resetAdminState: (state) => {
        state.admin = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Login Admin
        .addCase(loginAdmin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
            state.isLoading = false;
            state.admin = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
            state.admin = null;
        })
        
        // Check Admin Auth
        .addCase(checkAdminAuth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkAdminAuth.fulfilled, (state, action: PayloadAction<Admin>) => {
            state.isLoading = false;
            state.admin = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(checkAdminAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
            state.admin = null;
        })
        
        // Logout Admin
        .addCase(logoutAdmin.fulfilled, (state) => {
            state.admin = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        });
    },
});

export const { clearAdminError, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;