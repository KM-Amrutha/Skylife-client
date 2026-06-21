import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import AircraftList from '../../components/aircraft/aircraftListForm';

const AircraftListPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <AircraftList />
    </ProviderMainLayout>
  );
};

export default AircraftListPage;
