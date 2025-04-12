import React from "react";
import { useParams } from "react-router-dom";
import Designs from "../features/designs/Designs";

function DesignsPage() {
  const { categoryname } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Designs />
    </div>
  );
}

export default DesignsPage;
