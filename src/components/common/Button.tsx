interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button = ({ label, children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg px-6 py-2 transition-transform duration-200 hover:scale-105`}
    >
      {children ?? label}
    </button>
  );
};

export default Button;
