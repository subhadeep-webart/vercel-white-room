import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogoutHandler = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {

            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                },
            });

            if (response.ok) {
                toast.success("Logged out successfully");
                router.push('/admin/login');
            } else {
                console.error('Logout failed with status:', response.status);
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error('Network or unexpected error during logout:', error);
            toast.error(`Network error ${error}`)
        }
    };

    return handleLogout;
};