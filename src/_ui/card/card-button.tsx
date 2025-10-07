import { useNavigate } from "react-router";

export function CardButton({ idProperty }: { idProperty: string }) {
  const navigate = useNavigate();
  return (
    <button
      className="mt-4 w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
      onClick={() => navigate(`/property/${idProperty}`)}
    >
      View more
    </button>
  );
}
