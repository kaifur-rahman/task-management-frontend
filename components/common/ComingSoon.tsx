import ConstructionIcon from "@mui/icons-material/Construction";

interface ComingSoonProps {
  title: string;
  subtitle?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fadeIn">
      <div className="bg-white/10 rounded-full p-6 mb-4 shadow-md">
        <ConstructionIcon sx={{ fontSize: 60, color: "#faa325" }} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-base">
        {subtitle || "This feature is coming soon!"}
      </p>
    </div>
  );
};

export default ComingSoon;
