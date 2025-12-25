import React from 'react';
import ProviderMainLayout from '../../layouts/ProviderMainLayout';
import FlightForm from '../../components/flight/flightForm';
import useFlights from '../../hooks/useFlight';

const AddFlightPage: React.FC = () => {
  const { formik, isLoading } = useFlights();

  if (isLoading && formik.isSubmitting) {
    return (
      <ProviderMainLayout>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
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
          minHeight: '100vh'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px]">
          <div className="w-full max-w-4xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <FlightForm />
          </div>
        </div>
      </div>
    </ProviderMainLayout>
  );
};

export default AddFlightPage;
