import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import EditAircraftForm from '../../components/aircraft/EditAircraftForm';
import useEditAircraft from '../../hooks/provider/useEditAircraft';

const EditAircraftPage: React.FC = () => {
  const {
    aircraft,
    isLoading,
    formik,
    baseStationResults,
    currentLocationResults,
    baseStationDisplayName,
    currentLocationDisplayName,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  } = useEditAircraft();

  if (isLoading && formik.isSubmitting) {
    return (
      <ProviderMainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      </ProviderMainLayout>
    );
  }

  if (!aircraft) {
    return (
      <ProviderMainLayout>
        <div className="text-white text-center py-20">Aircraft not found.</div>
      </ProviderMainLayout>
    );
  }

  return (
    <ProviderMainLayout>
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{
          backgroundImage: 'url(/image/airplane-sunset.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px]">
          <div className="w-full max-w-4xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <EditAircraftForm
              formik={formik}
              isLoading={isLoading}
              baseStationResults={baseStationResults}
              currentLocationResults={currentLocationResults}
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

export default EditAircraftPage;