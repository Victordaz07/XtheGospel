import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import './CustomSelect.css';

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  label?: string;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Seleccionar...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-wrapper">
      {label && <label className="custom-select-label">{label}</label>}
      <div className={`custom-select ${isOpen ? 'open' : ''}`} ref={selectRef}>
        <button
          type="button"
          className="custom-select-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="custom-select-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FaChevronDown className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
        </button>
        {isOpen && (
          <div className="custom-select-dropdown">
            <ul className="custom-select-options" role="listbox">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

