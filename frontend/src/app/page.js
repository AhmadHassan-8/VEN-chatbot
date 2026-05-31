"use client"
import { MessageSquareText, ShieldCheck, Clock, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const launchChat = () => {
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter antialiased">

      {/* Header Section */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-800 shadow-lg">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">VEN Chat</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-blue-400 transition duration-300">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition duration-300">How it Works</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition duration-300">Contact</a>
          </div>
          <button
            onClick={launchChat}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Launch Chat
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 to-gray-800 text-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-blue-500 to-purple-600 animate-gradient-shift"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
            Your Smart Assistant for Apartment Living
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get instant answers to all your building-related questions, from maintenance schedules to amenity bookings, 24/7.
          </p>
          <button
            onClick={launchChat}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Start Chatting Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white">Why Choose VEN Chat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <MessageSquareText className="h-12 w-12 text-green-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">Instant Answers</h3>
              <p className="text-gray-400">
                Get immediate responses to common questions about building policies, maintenance, and events.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">24/7 Availability</h3>
              <p className="text-gray-400">
                Our chatbot is always online, providing support whenever you need it, day or night.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <ShieldCheck className="h-12 w-12 text-red-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">Reliable Information</h3>
              <p className="text-gray-400">
                Powered by an hourly updated database, ensuring you always get the most current information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Ask Your Question</h3>
              <p className="text-gray-300">Type your query into the chat interface.</p>
            </div>
            <div className="text-white text-4xl hidden md:block">→</div>
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-purple-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Instant Retrieval</h3>
              <p className="text-gray-300">Our system quickly finds the most relevant information from the building&apos;s knowledge base.</p>
            </div>
            <div className="text-white text-4xl hidden md:block">→</div>
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-green-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Get Your Answer</h3>
              <p className="text-gray-300">Receive a clear and concise response in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Ready to Simplify Your Building Experience?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join your fellow residents and get instant access to all the information you need, right at your fingertips.
          </p>
          <button
            onClick={launchChat}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Launch VEN Chat
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} VEN Chat. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Designed with <span className="text-red-500">❤️</span> for modern living.
        </p>
      </footer>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
