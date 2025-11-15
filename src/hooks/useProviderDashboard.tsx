import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getProviderProfile } from '../redux/auth/authThunk';
import { showErrorToast } from '../utils/toast';
import { Provider } from '../redux/auth/authTypes';

interface UseProviderDashboardReturn {
  provider: Provider | null;
  isLoading: boolean;
  error: string | null;
}

const useProviderDashboard = (): UseProviderDashboardReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { provider, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        await dispatch(getProviderProfile()).unwrap();
      } catch (error: any) {
        showErrorToast(error.message || 'Failed to fetch provider profile');
      }
    };

    // Only fetch if provider data is not already loaded
    if (!provider?._id) {
      fetchProviderData();
    }
  }, [dispatch, provider?._id]);

  return { provider, isLoading, error };
};

export default useProviderDashboard;
