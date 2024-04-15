"use client";

import { Label } from "./label";

export const TextInput = ({
  placeholder,
  onChange,
  label,
  type = "text",
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  type?: string;
}) => {
  return (
    <div className="pt-2">
      <Label label={label} />
      <input
        onChange={(e) => onChange(e.target.value)}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};