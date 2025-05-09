interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ label, children, onClick, className, disabled = false }: ButtonProps) => {
  const disabledStyle = "bg-gray2 text-gray6 cursor-not-allowed";

  return (
    <button
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
      }}
      disabled={disabled}
      className={`${disabled ? disabledStyle : className} rounded-lg px-6 py-2 transition-transform duration-200 hover:scale-105`}
    >
      {children ?? label}
    </button>
  );
};

export default Button;
