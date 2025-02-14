import React, { ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  id: string;
  label_type: string;
  value?: string; // Opcional en caso de que se use children
  rows?: number;
  setValue?: (val: string) => void; // Opcional si se usa children
  error?: string;
  children?: ReactNode;
}

export const FormField = ({
  label,
  id,
  label_type,
  value = "",
  rows,
  setValue,
  error,
  children,
}: FormFieldProps) => {
  const isTextarea = label_type === "textarea";

  // Elemento de entrada predeterminado, en caso de no pasar children
  const inputElement = isTextarea ? (
    <textarea
      id={id}
      rows={rows || 4}
      className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 transition resize-none"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required
    />
  ) : (
    <input
      type={label_type}
      id={id}
      className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 transition"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required
    />
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {children ? children : inputElement}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};
