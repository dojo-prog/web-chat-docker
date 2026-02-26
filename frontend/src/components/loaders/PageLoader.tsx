import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-200">
      <Loader2 size={80} className="text-white animate-spin" />
    </div>
  );
};

export default PageLoader;
