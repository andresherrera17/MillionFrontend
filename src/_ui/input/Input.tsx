interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  register: any;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
}

export const InputField = ({
  label,
  name,
  type = "text",
  error,
  register,
  placeholder,
  accept,
  multiple,
}: InputFieldProps) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-700 mb-1.5">
      {label}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type={type}
      accept={accept}
      multiple={multiple}
      placeholder={placeholder}
      {...register}
      className={`
        w-full px-3 py-2 border rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2
        ${
          error
            ? "border-red-400 focus:ring-red-300 bg-red-50"
            : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
        }
        disabled:bg-gray-100 disabled:cursor-not-allowed
      `}
    />
    {error && (
      <span className="text-xs text-red-600 mt-1 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </span>
    )}
  </div>
);
