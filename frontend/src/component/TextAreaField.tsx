// components/TextareaField.tsx
import React, { ChangeEvent } from 'react';

interface TextAreaFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, id, name, placeholder, value, onChange, required = false }) => (
  <div className="flex flex-col w-[45%] mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
    />
  </div>
);

export default TextAreaField;
