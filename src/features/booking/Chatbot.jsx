import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "../../services/supabaseClient";

export default function Chatbot({ onClose }) {
  // Added onClose prop
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! How can I assist you today? Ask me anything about our services!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isFirstResponse, setIsFirstResponse] = useState(true);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const scrollToNewMessage = () => {
    if (lastMessageRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const newMessage = lastMessageRef.current;

      const scrollPosition = newMessage.offsetTop - container.offsetTop;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (chatMessages.length > 0) {
      scrollToNewMessage();
    }
  }, [chatMessages]);

  const signature = `
Team,
Homealive Super Interior Designer's
📞 +91 72073 44618`;

  const searchInteriorDesigns = async category => {
    try {
      const { data, error } = await supabase
        .from("interior_designs")
        .select("*")
        .ilike("category", `%${category}%`);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error searching designs:", error);
      return [];
    }
  };

  const handleChatSubmit = async e => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setChatMessages(prev => [...prev, { type: "user", text: userInput }]);
    setIsChatLoading(true);

    try {
      const keywords = [
        "kitchen",
        "bedroom",
        "hall",
        "bathroom",
        "dining",
        "office",
        "entertainment",
        "penthouse",
        "garden",
      ];
      const matchedKeyword = keywords.find(keyword =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      );

      let designs = [];
      if (matchedKeyword) {
        designs = await searchInteriorDesigns(matchedKeyword);
      }

      const formattedPrompt = `You have received the following message from a customer who visited our website, 'Super Interior Designer's': '${userInput}'. Provide a response without mentioning specific costs or amounts in INR or any currency. If the user asks about pricing (e.g., cost of a kitchen interior, modular setup, or design work), reply with: "The cost may vary depending on the materials chosen, design preferences, and location. We recommend getting in touch with our expert team for a more accurate and customized quote." Ensure the response is polite, informative, and professional. Do not include phrases like "Thank you for reaching out" or similar thank-you statements unless explicitly instructed.`;

      const botResponse = await window.puter.ai.chat(formattedPrompt, {
        model: "gpt-4o-mini",
        systemPrompt:
          "You are a helpful assistant for Super Interior Designer's, an interior design company. Provide concise, friendly responses without specific cost estimates or thank-you phrases (e.g., 'Thank you for reaching out'), guiding users to contact the team for quotes when pricing is inquired.",
      });

      let responseText =
        typeof botResponse === "string"
          ? botResponse
          : botResponse?.message?.content ||
            "Sorry, I couldn't process that. How can I assist you further?";

      if (!isFirstResponse) {
        responseText = responseText
          .replace(
            /Thank you for reaching out to (us at )?Super Interior Designer's!?/gi,
            ""
          )
          .trim();
      }

      if (isFirstResponse) {
        responseText = `Dear Customer, Thank you for reaching out to Super Interior Designer's!\n\n${responseText}`;
        setIsFirstResponse(false);
      }

      responseText = `${responseText}\n\n${signature}`;

      setChatMessages(prev => [...prev, { type: "bot", text: responseText }]);

      if (designs.length > 0) {
        const imageMessage = {
          type: "bot",
          text: "Here are some relevant designs for your reference:",
          images: designs.map(design => ({
            url: design.image_url,
            description: design.description,
          })),
        };
        setChatMessages(prev => [...prev, imageMessage]);
      }
    } catch (error) {
      console.error("Chatbot error:", error.message);
      let errorResponse = "Oops! Something went wrong. Please try again!";

      if (isFirstResponse) {
        errorResponse = `Dear Customer, Thank you for reaching out to Super Interior Designer's!\n\n${errorResponse}`;
        setIsFirstResponse(false);
      }
      errorResponse = `${errorResponse}\n\n${signature}`;

      setChatMessages(prev => [...prev, { type: "bot", text: errorResponse }]);
    } finally {
      setIsChatLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="h-96 flex flex-col">
      <div className="bg-accent-teal p-4 text-white flex justify-between items-center">
        <h3 className="font-semibold">Chat with Us</h3>
        <button
          onClick={onClose} // Use the onClose prop to close the chat
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            ref={index === chatMessages.length - 1 ? lastMessageRef : null}
            className={`flex ${
              message.type === "user" ? "justify-center" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-accent-teal text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text.split("\n").map((line, i) => (
                <p key={i} className="mb-1 last:mb-0">
                  {line}
                </p>
              ))}
              {message.images && (
                <div className="mt-2 space-y-2">
                  {message.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="space-y-1">
                      <img
                        src={image.url}
                        alt={image.description}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                      <p className="text-sm text-gray-600">
                        {image.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent-teal focus:border-transparent disabled:opacity-50 text-gray-800"
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
  );
}
