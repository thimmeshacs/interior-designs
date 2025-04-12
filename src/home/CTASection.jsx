import { motion } from "framer-motion";
import { Send } from "lucide-react";

function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-serif text-center mb-4">
            Get Your Free Estimate Today!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below to get a personalized estimate for your
            interior design project.
          </p>
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select Project Type</option>
                <option value="remodeling">Remodeling</option>
                <option value="new-construction">New Construction</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
            <div>
              <textarea
                placeholder="Message (optional)"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
