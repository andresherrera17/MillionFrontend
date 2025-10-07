import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./_layouts/MainLayout";
import { Administration } from "./_pages/Administration";
import "./App.css";
import { Home } from "./_pages/Home";
import { PropertyDetail } from "./_pages/PropertyDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="admin" element={<Administration />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
