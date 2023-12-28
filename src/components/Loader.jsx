import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="loader">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
};

export default Loader;
