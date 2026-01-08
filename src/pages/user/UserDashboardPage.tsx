import React from 'react';
import useUserHome from '../../hooks/useUserHome';
import SearchForm from '../../components/user/SearchForm'; 

const UserDashboardPage: React.FC = () => {
  const { userName, isLoading } = useUserHome();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="text-white text-2xl">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <span className="text-lg font-medium">Home</span>
        <div className="flex items-center gap-8">
          <span className="text-sm">Help ★ 0</span>
          <span className="bg-white text-[#001233] px-6 py-2 rounded-full font-semibold">
            hai {userName}
          </span>
        </div>
      </header>

      {/* Logo + Tagline */}
      <div className="text-center mt-12 px-8">
        <div className="flex justify-center items-center gap-4 mb-8">
          {/* Replace with your actual logo in public/assets/ */}
          <img src="/assets/skylife-logo.png" alt="Skylife" className="h-12" />
          <h2 className="text-4xl font-bold">Skylife</h2>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Millions of cheap flights.<br />One simple search.
        </h1>
      </div>

      {/* Search Form */}
      <div className="mt-12 px-8 max-w-6xl mx-auto">
        <SearchForm />
      </div>

      {/* Hero Banner */}
      <div 
        className="mt-20 mx-8 rounded-3xl h-96 md:h-[600px] bg-cover bg-center flex items-center relative overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,18,51,0.85), transparent 70%), url('https://thumbs.dreamstime.com/b/airplane-flying-above-clouds-sunset-vibrant-pink-purple-sky-serene-atmosphere-beautiful-landscape-airplane-flying-above-357071805.jpg')`,
          backgroundPosition: 'center',
        }}
      >
        <div className="ml-12 max-w-3xl">
          <h2 className="text-6xl md:text-8xl font-bold leading-none">
            Skylife for Life.
          </h2>
          <p className="text-2xl md:text-3xl mt-8">
            For any details contact us on chat bot Amrutha
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 px-8 py-8 text-sm border-t border-white/30">
        <div className="flex flex-wrap justify-between items-center gap-6 max-w-6xl mx-auto">
          <span>India.English(UK) - INR</span>
          <div className="flex flex-wrap gap-8">
            <span>Help</span>
            <span>Privacy settings</span>
            <span>Company details</span>
            <span>International sites</span>
            <span>Explore</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboardPage;