import { useEffect, useRef, useState } from "react";

interface SelectBoxProps {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (selected: string) => void;
}

const SelectBox = ({ options, placeholder, value, onChange }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-80">
      <button
        onClick={toggleDropdown}
        className="w-full rounded-md border border-gray4 bg-white px-4 py-2 text-base font-[400] text-gray6 shadow-sm focus:outline-none"
      >
        {value || placeholder}
        <span className="float-right text-xs text-gray5">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray4 bg-white shadow-md">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 text-base text-black hover:bg-gray1"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
