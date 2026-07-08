import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    
      <div className="relative min-h-screen bg-[#000D2B]">

      {/* Airplane Background - NO FILTER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        // style={{
        //   backgroundImage: "url('/image/wall1.jpg')"
        // }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <img 
          src="/image/gemlogo.png" 
          alt="Logo" 
          className="w-32 sm:w-48 md:w-64 mb-8"
        />
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
          Fly Anywhere, Anytime
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-white text-center mb-12 max-w-2xl">
          Book your next adventure with ease
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => navigate('/sign-up')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Get Started
          </button>
          
          <button
            onClick={() => navigate('/sign-in')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white text-lg font-semibold rounded-lg border-2 border-white transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
