// src/features/booking/Chatbot.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../services/supabaseClient";

export default function Chatbot() {
  const [step, setStep] = useState(1); // Step in the conversation flow
  const [chatMessages, setChatMessages] = useState([]); // To store chat history
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    city: "",
    contact1: "",
    contact2: "",
  });
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]); // List of cities fetched from Supabase

  // Fetch active cities from Supabase on component mount
  useEffect(() => {
    const fetchCities = async () => {
      const { data, error } = await supabase
        .from("Citys_Data")
        .select("city_name, contact_1, contact_2")
        .eq("status", "Active");

      if (error) console.error("Error fetching cities:", error.message);
      else setCities(data || []);
    };
    fetchCities();
  }, []);

  // Handle city selection
  const handleCitySelect = (selectedCity) => {
    setFormData({
      ...formData,
      city: selectedCity.city_name,
      contact1: selectedCity.contact_1,
      contact2: selectedCity.contact_2,
    });
    setChatMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: `Great! You've selected ${selectedCity.city_name}. What service do you need?`,
      },
    ]);
    setStep(2);
  };

  // Handle user input for service type
  const handleServiceSelect = (service) => {
    setFormData({ ...formData, serviceType: service });
    setChatMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: `You've selected "${service}". Please provide your details.`,
      },
    ]);
    setStep(3);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phoneNumber) {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Please provide your full name and phone number to proceed.",
        },
      ]);
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("get_quotation_data").insert([
        {
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email_address: formData.email,
          service_type: formData.serviceType,
          city_name: formData.city,
        },
      ]);

      if (error) throw error;

      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Thank you, ${formData.fullName}! Our team in ${formData.city} will contact you shortly.`,
        },
        {
          type: "bot",
          text: `Contact Details:\nPrimary: ${formData.contact1}\nSecondary: ${
            formData.contact2 || "Not available"
          }`,
        },
      ]);
      setStep(5); // Show success message
    } catch (err) {
      console.error("Error submitting data:", err.message);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Oops! Something went wrong. Please try again or call us directly.",
        },
        { type: "bot", text: `Primary Contact: ${formData.contact1}` },
      ]);
      setStep(6); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 p-4 text-center text-white font-bold rounded-t-lg">
        Chat with Us
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[350px]">
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
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        {step === 1 && (
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              Please select your city:
            </p>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => {
                const selectedCity = cities.find(
                  (city) => city.city_name === e.target.value
                );
                handleCitySelect(selectedCity);
              }}
            >
              <option value="">Choose City</option>
              {cities.map((city) => (
                <option key={city.city_name} value={city.city_name}>
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              What service do you need?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Full Home Interior",
                "Kitchen & Bath Design",
                "Office Space Design",
              ].map((service) => (
                <button
                  key={service}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  onClick={() => handleServiceSelect(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <button
              className="w-full p-2 bg-teal-600 text-white rounded"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
