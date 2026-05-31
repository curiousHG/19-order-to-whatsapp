import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./globals.css";
import { HomePage } from "@/pages/HomePage";
import { CheckoutPage } from "@/pages/CheckoutPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Toaster position="top-center" richColors closeButton />
    </BrowserRouter>
  </StrictMode>
);
