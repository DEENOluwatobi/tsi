import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.config';
import { setUser } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';
import { UserData } from '@/store/slices/authSlice';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
            // Get additional user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data() as UserData;
                dispatch(setUser(userData));
            } else {
                // Handle case where user exists in auth but not in Firestore
                const basicUserData: UserData = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || '',
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                phone: '',
                techSkill: '',
                state: '',
                country: 'Nigeria'
                };
                dispatch(setUser(basicUserData));
            }
            } catch (error) {
            console.error('Error fetching user data:', error);
            dispatch(setUser(null));
            }
        } else {
            dispatch(setUser(null));
        }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider;