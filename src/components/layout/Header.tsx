import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { AuthButton, Button } from "../common";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-solid border-gray2">
      <Button
        label={"DevPrep"}
        onClick={() => navigate(ROUTES.ROOT)}
        className="px-4 text-xl font-black"
      />
      <AuthButton />
    </header>
  );
};

export default Header;
