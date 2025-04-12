import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex h-[70px] w-full items-center justify-start border-b border-solid border-gray2">
      <button onClick={() => navigate("/")} className="px-4 text-xl font-black">
        DevPrep
      </button>
    </header>
  );
};

export default Header;
