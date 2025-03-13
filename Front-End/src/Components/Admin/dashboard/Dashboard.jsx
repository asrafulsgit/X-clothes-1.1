import { useState } from "react";
import Analytics from "./analytics/Analytics";
import Sales from "./sales/Sales";

const DashBoard = () => {
  return (
    <>
      <Sales />
      <Analytics />
    </>
  );
};

export default DashBoard;
