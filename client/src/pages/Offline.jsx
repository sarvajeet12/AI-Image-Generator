import { motion } from 'framer-motion';
import { FaWifi, FaHome, FaSync } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Offline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (!isOnline) {
      setRetryCount(prev => prev + 1);
      // Force a network check
      fetch(window.location.href, { method: 'HEAD' })
        .then(() => window.location.reload())
        .catch(() => {});
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Animated background elements */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-400/10 rounded-full mix-blend-screen filter blur-xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-400/10 rounded-full mix-blend-screen filter blur-xl animate-pulse-slow animation-delay-2000"></div>
          
          <div className="relative z-10 bg-gray-800/70 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700/50">
            <motion.div
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <FaWifi className="text-8xl text-blue-400/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Connection Lost
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              {retryCount > 0 
                ? `Still trying to reconnect... (Attempt ${retryCount})` 
                : "We're having trouble connecting to the internet. Please check your connection and try again."}
            </motion.p>
            
            <div className="space-y-4">
              <motion.button
                onClick={handleRetry}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaSync className={`text-lg ${!isOnline && 'animate-spin'}`} />
                  {isOnline ? 'Reload Page' : 'Retry Connection'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-gray-500 text-sm"
        >
          <p>If the problem persists, check your network settings or contact support.</p>
        </motion.div>
      </div>
      
      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Offline;