import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Accedi a RentMeNow360
        </h1>
        <p className="text-xs text-gray-500 mb-4">
          Inserisci le tue credenziali per entrare nel gestionale.
        </p>

        <form className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              placeholder="es. nome@rentmenow.it"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Accedi
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-400 text-center">
          Schermata di login demo – l&apos;autenticazione reale verrà collegata
          più avanti.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
