interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-gray2 px-6 py-2 text-black transition hover:bg-gray8 hover:text-white"
    >
      {label}
    </button>
  );
};

export default Button;
