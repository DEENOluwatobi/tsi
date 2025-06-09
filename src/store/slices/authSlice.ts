import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.config';

export interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  techSkill: string;
  state: string;
  country: string;
  displayName: string;
  bio: string;
}

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Sign up with email and password
export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    techSkill: string;
    state: string;
    country: string;
  }) => {
    const { email, password, ...profileData } = userData;
    
    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: `${profileData.firstName} ${profileData.lastName}`
    });
    
    // Save additional user data to Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      displayName: `${profileData.firstName} ${profileData.lastName}`,
      ...profileData,
      createdAt: new Date().toISOString(),
    };
    
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    return userDoc as unknown as UserData;
  }
);

// Sign in with email and password
export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data() as UserData;
    
    return userData;
  }
);

// Sign in with Google
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document for Google sign-in users
      const newUserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        phone: '',
        techSkill: '',
        state: '',
        country: 'Nigeria',
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', user.uid), newUserData);
      return newUserData as unknown as UserData;
    }
    
    return userDoc.data() as UserData;
  }
);

// Sign out
export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async () => {
    await signOut(auth);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Sign up
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      
    // Sign in
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      
    // Google sign in
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Google sign in failed';
      })
      
    // Sign out
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;