import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router";
import "./assets/main.css";
import CreatePartner from "./CreatePartner";
import UpdatePartner from "./UpdatePartner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/create" element={<CreatePartner />} />
        <Route path="/update" element={<UpdatePartner />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
