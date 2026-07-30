import DisappointedFeedback from "./pages/DisappointedFeedback";  
import NeutralFeedback from "./pages/NeutralFeedback";
import SatisfiedFeedback from "./pages/SatisfiedFeedback";
import Access from "./pages/Access";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Access />} />
      <Route path="/disappointed" element={<DisappointedFeedback />} />
      <Route path="/neutral" element={<NeutralFeedback />} />
      <Route path="/satisfied" element={<SatisfiedFeedback />} />
    </Routes>
  );
}