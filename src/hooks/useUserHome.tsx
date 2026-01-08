import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { User } from '../redux/auth/authTypes';

const useUserHome = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const userName = user?.firstName?.toLowerCase() || 'there';

  return {
    user: user as User | null,
    isLoading,
    userName,
  };
};

export default useUserHome;