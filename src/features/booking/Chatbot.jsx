import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Send } from "lucide-react";

const API_KEY =
  "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! How can I assist you today? Ask me anything about our services!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleChatSubmit = async e => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setChatMessages(prev => [...prev, { type: "user", text: userInput }]);
    setIsChatLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for InteriorCo, an interior design company. Provide concise, friendly responses about our services, designs, or booking consultations.",
            },
            { role: "user", content: userInput },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${errorText}`);
      }

      const data = await response.json();

      if (
        !data.choices ||
        !Array.isArray(data.choices) ||
        data.choices.length === 0
      ) {
        throw new Error("Invalid API response format");
      }

      const botResponse =
        data.choices[0].message?.content?.trim() ||
        "Sorry, I couldn't understand that. Please try rephrasing!";

      setChatMessages(prev => [...prev, { type: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error.message);
      setChatMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent-teal text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors duration-300"
      >
        <MessageSquareText size={24} />
      </motion.button>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="bg-accent-teal p-4 text-white flex justify-between items-center">
              <h3 className="font-semibold">Chat with Us</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="h-96 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-accent-teal text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isChatLoading}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent-teal focus:border-transparent disabled:opacity-50 text-gray-800" // Fixed text color here
                  />
                  <motion.button
                    type="submit"
                    disabled={isChatLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent-teal text-white p-2 rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50"
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
