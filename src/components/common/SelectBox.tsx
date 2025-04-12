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
    <div className="relative w-[360px]" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md border border-gray4 bg-white px-4 py-2 text-base font-[400] text-gray6 shadow-sm focus:outline-none"
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {value || placeholder}
        </span>
        <span
          className={`inline-block text-xs text-gray5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`absolute z-10 mt-2 w-full rounded-md border border-gray4 bg-white shadow-md transition-all duration-200 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul className="max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 text-base text-black transition-colors hover:bg-gray1"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectBox;
