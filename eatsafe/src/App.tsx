import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SavedIngredientsPage from './components/SavedIngredientsPage';
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/saved-ingredients" element={<SavedIngredientsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;