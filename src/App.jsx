import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import Layout from "./ui/Layout";
import HomePage from "./home/HomePage";
import DesignExplorerPage from "./pages/ExploreDesignPage";
import DesignsPage from "./pages/DesignsPage";
import DesignDetailsPage from "./pages/DesignDetailsPage";
import ProductCategoriesPage from "./pages/ProductCategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import BookingPage from "./features/booking/BookingPage";
import AboutPage from "./features/about/AboutPage";
import IllustrationsPage from "./features/illustrations/IllustrationGallery";
import TestimonialsPage from "./features/testimonials/TestimonialCarousel";
import Contactus from "./features/booking/Contactus";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./ui/ScrollToTop";
import Chatbot from "./features/booking/Chatbot";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const queryClient = new QueryClient();

function App() {
  const [cityData, setCityData] = useState({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleCitySelect = (data) => {
    console.log("App set cityData:", data);
    setCityData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  onCitySelect={handleCitySelect}
                  cityDetails={cityData.cityDetails}
                  notFound={cityData.notFound}
                />
              }
            >
              <Route
                index
                element={<HomePage notFound={cityData.notFound} />}
              />
              <Route path="designs/:categoryname" element={<DesignsPage />} />
              <Route
                path="designs/:categoryname/:id"
                element={<DesignDetailsPage />}
              />
              <Route path="designs" element={<DesignExplorerPage />} />
              <Route path="/products" element={<ProductCategoriesPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route
                path="/products/:category/:id"
                element={<ProductDetailsPage />}
              />
              <Route
                path="booking"
                element={<BookingPage selectedCity={cityData} />}
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="illustrations" element={<IllustrationsPage />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="contact" element={<Contactus />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Chatbot - now includes close icon internally */}
          {isChatbotOpen && (
            <Chatbot
              onClose={() => setIsChatbotOpen(false)}
              selectedCity={cityData.city || ""}
            />
          )}
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
