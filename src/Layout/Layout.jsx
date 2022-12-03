import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard";
import Reservations from "../Reservations/Reservations"
import NotFound from "./NotFound"
import Tables from "../Tables/Tables"
import { today } from "../utils/date-time";
import Header from "../Header/Header";
function Layout() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard date={today()}/>} />
        {/* <Route path="/dashboard/:date" element={<Dashboard date={today()}/>} /> */}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/tables" element={<Tables />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Layout;
