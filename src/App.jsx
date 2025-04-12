import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./ui/Layout";
import HomePage from "./home/HomePage";
import DesignExplorerPage from "./pages/ExploreDesignPage";
import DesignsPage from "./pages/DesignsPage";
import DesignDetailsPage from "./pages/DesignDetailsPage";
import BookingPage from "./features/booking/BookingPage";
import AboutPage from "./features/about/AboutPage";
import IllustrationsPage from "./features/illustrations/IllustrationGallery";
import TestimonialsPage from "./features/testimonials/TestimonialCarousel";
import Contactus from "./features/booking/Contactus";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="designs/:categoryname" element={<DesignsPage />} />
            <Route
              path="designs/:categoryname/:id"
              element={<DesignDetailsPage />}
            />
            <Route path="designs" element={<DesignExplorerPage />} />
            <Route path="products/:category" element={<p>Coming</p>} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="illustrations" element={<IllustrationsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="contact" element={<Contactus />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
