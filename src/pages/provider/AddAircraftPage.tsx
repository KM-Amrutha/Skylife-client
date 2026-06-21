import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import AircraftForm from "../../components/aircraft/aircraftForm";
const AddAircraftPage: React.FC = () => {
    return (
      <ProviderMainLayout>
         <AircraftForm/>
      </ProviderMainLayout>
    );
  }

export default AddAircraftPage;
