import { useParams } from "react-router-dom";
import DesignDetails from "../features/designs/DesignDetails";

function DesignDetailsPage() {
  const { categoryname, id } = useParams();

  return (
    <div className="container mx-auto px-4 pt-24">
      <DesignDetails categoryname={categoryname} id={id} />
    </div>
  );
}

export default DesignDetailsPage;
