import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Chatbot from "../features/booking/Chatbot";

function Layout({ onCitySelect, cityDetails, notFound }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  console.log("Layout height applied", { cityDetails, notFound });

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grey-50">
      <Header onCitySelect={onCitySelect} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer cityDetails={cityDetails} />

      {/* Chat Toggle Button with Larger Image */}
      <motion.button
        id="unique-chat-toggle"
        onClick={toggleChat}
        className="fixed bottom-lg right-lg bg-brand-600 text-grey-0 p-md rounded-full shadow-lg z-50 hover:bg-brand-700 transition-base"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat support"
      >
        <img
          src="https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/images//Chatbot.png"
          alt="Chatbot Icon"
          className="w-10 h-10"
        />
      </motion.button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-xl right-lg w-80 bg-grey-0 rounded-xl shadow-xl overflow-hidden z-50 animate-slideIn"
        >
          <Chatbot onClose={toggleChat} />
        </motion.div>
      )}
    </div>
  );
}

export default Layout;
