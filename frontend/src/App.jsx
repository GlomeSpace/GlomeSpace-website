import { useState } from "react";
import "./App.css";
import InvestorForm from "./pages/InvestorForm";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { Layout } from "./components/Layout.jsx";
import { Travelers } from "./pages/Travelers.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import { Analytics } from "@vercel/analytics/react";
import { AboutUs } from "./pages/AboutUs.jsx";
import { BlogPosts } from "./pages/OurBlogs.jsx";

function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/travelers" element={<Travelers />} />
          <Route path="/become-an-investor" element={<InvestorForm />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog-posts" element={<BlogPosts />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
