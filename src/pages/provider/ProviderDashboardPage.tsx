import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import ProviderDashboard from '../../components/provider/ProviderDashboard';
import useProviderDashboard from '../../hooks/useProviderDashboard';

const ProviderDashboardPage: React.FC = () => {
  const { provider, isLoading } = useProviderDashboard();

  return (
    <ProviderMainLayout>
      <ProviderDashboard provider={provider} isLoading={isLoading} />
    </ProviderMainLayout>
  );
};

export default ProviderDashboardPage;
