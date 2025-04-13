import React from "react";
import { useParams } from "react-router-dom";
import Designs from "../features/designs/Designs";

function DesignsPage() {
  const { categoryname } = useParams();

  return (
    <div className="min-h-screen bg-grey-50 dark:bg-grey-900">
      <Designs />
    </div>
  );
}

export default DesignsPage;
