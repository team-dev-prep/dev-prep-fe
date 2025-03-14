import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-gray2 flex h-[70px] w-full items-center justify-start border-b border-solid">
      <button onClick={() => navigate("/")} className="px-4 text-xl font-[900]">
        DevPrep
      </button>
    </header>
  );
};

export default Header;
