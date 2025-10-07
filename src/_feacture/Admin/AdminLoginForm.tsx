import React from "react";

interface AdminLoginFormProps {
  password: string;
  error: string;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminLoginForm({
  password,
  error,
  onPasswordChange,
  onSubmit,
}: AdminLoginFormProps) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Access</h2>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
