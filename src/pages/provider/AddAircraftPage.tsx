import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import AircraftForm from '../../components/aircraft/aircraftForm';
import useAircraft from '../../hooks/useAircraft';

const AddAircraftPage: React.FC = () => {
  const {
    formik,
    isLoading,
    baseStationSearchResults,
    currentLocationSearchResults,
    baseStationDisplayName,
    currentLocationDisplayName,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  } = useAircraft();

  if (isLoading && formik.isSubmitting) {
    return (
      <ProviderMainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </ProviderMainLayout>
    );
  }

  return (
    <ProviderMainLayout>
      <div className="relative rounded-2xl overflow-hidden p-8"
        style={{
          backgroundImage: 'url(/image/airplane-sunset.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px]">
          <div className="w-full max-w-4xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <AircraftForm
              formik={formik}
              isLoading={isLoading}
              baseStationSearchResults={baseStationSearchResults}
              currentLocationSearchResults={currentLocationSearchResults}
              baseStationDisplayName={baseStationDisplayName}
              currentLocationDisplayName={currentLocationDisplayName}
              handleBaseStationSearch={handleBaseStationSearch}
              handleCurrentLocationSearch={handleCurrentLocationSearch}
              selectBaseStation={selectBaseStation}
              selectCurrentLocation={selectCurrentLocation}
              clearBaseStationResults={clearBaseStationResults}
              clearCurrentLocationResults={clearCurrentLocationResults}
            />
          </div>
        </div>
      </div>
    </ProviderMainLayout>
  );
};

export default AddAircraftPage;
