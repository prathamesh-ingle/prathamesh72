import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      
      {/* Global floating components */}
      <BackToTop />
    </>
  );
}

export default App;