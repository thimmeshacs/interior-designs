import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Chatbot from "../features/booking/Chatbot";

function Layout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Chat Toggle Button with Larger Image */}
      <motion.button
        id="unique-chat-toggle"
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-accent-teal text-white p-4 rounded-full shadow-lg z-50 hover:bg-teal-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat support"
      >
        <img
          src="https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/images//Chatbot.png"
          alt="Chatbot Icon"
          className="w-10 h-10" // Increased to 48px x 48px for zooming effect
        />
      </motion.button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 right-8 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50"
        >
          <Chatbot onClose={toggleChat} />
        </motion.div>
      )}
    </div>
  );
}

export default Layout;
