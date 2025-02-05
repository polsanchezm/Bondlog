export const FormField = ({
  label,
  id,
  label_type,
  value,
  setValue,
  error,
}: {
  label: string;
  id: string;
  label_type: string;
  value: string;
  setValue: (val: string) => void;
  error?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        type={label_type}
        id={id}
        className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};
