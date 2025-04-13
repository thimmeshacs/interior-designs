import { motion } from "framer-motion";
import { Send } from "lucide-react";

function CTASection() {
  return (
    <section className="py-xl bg-grey-50">
      <div className="container mx-auto px-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-sans text-grey-900 text-center mb-md">
            Get Your Free Estimate Today!
          </h2>
          <p className="text-center text-grey-600 mb-lg">
            Fill out the form below to get a personalized estimate for your
            interior design project.
          </p>
          <form className="space-y-md">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-md border border-grey-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-grey-0 transition-base shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-md border border-grey-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-grey-0 transition-base shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-md border border-grey-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-grey-0 transition-base shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <select className="w-full p-md border border-grey-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-grey-0 transition-base shadow-sm hover:shadow-md">
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
                className="w-full p-md border border-grey-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-grey-0 transition-base shadow-sm hover:shadow-md"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-600 text-grey-0 py-md px-lg rounded-md hover:bg-brand-700 transition-smooth flex items-center justify-center shadow-md"
            >
              <Send className="w-4 h-4 mr-sm" />
              Get Free Estimate
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
