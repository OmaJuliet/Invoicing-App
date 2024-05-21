// components/InputField.tsx
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, name, type, placeholder, value, onChange, required = false }) => (
  <div className="flex flex-col w-[45%] mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
    />
  </div>
);

export default InputField;
