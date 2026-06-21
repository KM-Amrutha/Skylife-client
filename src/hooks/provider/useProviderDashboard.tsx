import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../redux/store';
import { getProviderProfile } from '../../redux/auth/authThunk';
import { showErrorToast } from '../../utils/toast';
import { Provider } from '../../redux/auth/authTypes';

interface UseProviderDashboardReturn {
  provider: Provider | null;
  isLoading: boolean;
  error: string | null;
  goToBookings: () => void;
  goToWallet: () => void;
}

const useProviderDashboard = (): UseProviderDashboardReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

    if (!provider?.id) {
      fetchProviderData();
    }
  }, [dispatch, provider?.id]);

  const goToBookings = () => navigate('/provider/bookings');
  const goToWallet = () => navigate('/provider/wallet');

  return { provider, isLoading, error, goToBookings, goToWallet };
};

export default useProviderDashboard;