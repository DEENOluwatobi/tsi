import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { logoutAdmin, clearAdminError } from '@/store/slices/adminSlice';

export const useAdmin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { admin, isAuthenticated, isLoading, error } = useSelector(
        (state: RootState) => state.admin
    );

    const logout = () => {
        dispatch(logoutAdmin());
        router.push('/admin/login');
    };

    const clearError = () => {
        dispatch(clearAdminError());
    };

    const isAdmin = isAuthenticated && admin;
    const isSuperAdmin = isAdmin && admin.designation === 'superAdmin';

    return {
        admin,
        isAuthenticated,
        isLoading,
        error,
        isAdmin,
        isSuperAdmin,
        logout,
        clearError,
    };
};