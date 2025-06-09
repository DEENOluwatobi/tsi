import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';

interface TutorData {
    id: string;
    course: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
}

interface TutorState {
    tutor: TutorData | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: TutorState = {
    tutor: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// Async thunk for tutor login
export const loginTutor = createAsyncThunk(
    'tutor/login',
    async ({ email, passkey }: { email: string; passkey: string }, { rejectWithValue }) => {
        try {
        // Query the tutors collection to find a tutor with matching email
        const tutorsRef = collection(db, 'tutors');
        const q = query(tutorsRef, where('email', '==', email.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error('Invalid email or passkey');
        }

        // Get the first (and should be only) matching document
        const tutorDoc = querySnapshot.docs[0];
        const tutorData = tutorDoc.data();
        
        // Check if passkey matches
        if (tutorData.passkey !== passkey) {
            throw new Error('Invalid email or passkey');
        }

        // Check if role is tutor
        if (tutorData.role !== 'tutor') {
            throw new Error('Access denied');
        }

        const tutor: TutorData = {
            id: tutorDoc.id,
            course: tutorData.course,
            email: tutorData.email,
            firstname: tutorData.firstname,
            lastname: tutorData.lastname,
            role: tutorData.role,
        };

        // Store in localStorage for tutor dashboard persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('tutorAuth', JSON.stringify(tutor));
        }

        return tutor;
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

// Check if tutor is already logged in from localStorage
export const checkTutorAuth = createAsyncThunk(
    'tutor/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
        if (typeof window === 'undefined') {
            throw new Error('No window object available');
        }
        
        const tutorAuth = localStorage.getItem('tutorAuth');
        if (tutorAuth) {
            const tutor: TutorData = JSON.parse(tutorAuth);
            return tutor;
        }
        throw new Error('No tutor session found');
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

const tutorSlice = createSlice({
    name: 'tutor',
    initialState,
    reducers: {
        clearTutorError: (state) => {
        state.error = null;
        },
        logoutTutor: (state) => {
        state.tutor = null;
        state.isAuthenticated = false;
        state.error = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('tutorAuth');
        }
        },
    },
    extraReducers: (builder) => {
        builder
        // Login tutor
        .addCase(loginTutor.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginTutor.fulfilled, (state, action: PayloadAction<TutorData>) => {
            state.isLoading = false;
            state.tutor = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(loginTutor.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
        })
        // Check tutor auth
        .addCase(checkTutorAuth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkTutorAuth.fulfilled, (state, action: PayloadAction<TutorData>) => {
            state.isLoading = false;
            state.tutor = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(checkTutorAuth.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        });
    },
});

export const { clearTutorError, logoutTutor } = tutorSlice.actions;
export default tutorSlice.reducer;