import * as React from "react";

export function Select({ value, onValueChange, children }) {
  return (
    <div className="relative w-full">
      <select
        className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export function SelectTrigger({ children, className = "", ...props }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}

export function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}
