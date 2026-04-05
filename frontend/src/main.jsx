import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ProviderPage from "./pages/ProviderPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<About />} />
      <Route path="provider" element={<ProviderPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="auth" element={<AuthPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
