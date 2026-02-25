import { type LucideIcon } from "lucide-react";
import type { ChangeEvent } from "react";

interface CustomInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  Icon: LucideIcon;
  inputStyles?: string;
}

const CustomInput = ({
  label,
  type = "text",
  placeholder = "Type here",
  id,
  value,
  onChange,
  required = true,
  Icon,
  inputStyles,
}: CustomInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 pl-10 py-2 border border-gray-400 rounded-md text-sm focus:outline-0 focus:ring-2 focus:ring-blue-500  ${inputStyles}`}
        />
        <div className="absolute left-0 top-0 bottom-0 w-10 p-2 flex items-center justify-center">
          <Icon className="h-full text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
