import { useNavigate } from "react-router-dom";

interface ButtonProps {
  to: string;
  label: string;
}

const Button = ({ to, label }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-gray2 hover:bg-gray8 rounded-lg px-6 py-2 text-black transition hover:text-white"
    >
      {label}
    </button>
  );
};
export default Button;
