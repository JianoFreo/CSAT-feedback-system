import NotGoodFeedback from "./pages/NotGoodFeedback";  
import JustOkayFeedback from "./pages/JustOkayFeedback";
import VeryGoodFeedback from "./pages/VeryGoodFeedback";
import Access from "./pages/Access";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

/** Redirects an old rating path to its new one while preserving query params (e.g. ?agent=...). */
function LegacyRedirect({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Access />} />
      <Route path="/not-good" element={<NotGoodFeedback />} />
      <Route path="/just-okay" element={<JustOkayFeedback />} />
      <Route path="/awesome" element={<VeryGoodFeedback />} />

      {/* Legacy paths kept so previously sent survey emails keep working */}
      <Route path="/disappointed" element={<LegacyRedirect to="/not-good" />} />
      <Route path="/neutral" element={<LegacyRedirect to="/just-okay" />} />
      <Route path="/satisfied" element={<LegacyRedirect to="/awesome" />} />
    </Routes>
  );
}