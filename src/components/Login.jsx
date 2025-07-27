import React from "react";
import { useModalStore } from "../store/store";
import { useTranslation } from "react-i18next";

function Login() {
  const { modalType, openModal, closeModal } = useModalStore();
  const { t } = useTranslation();

  if (modalType !== "login") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-neutral-800 text-center">
          {t("login.title")}
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg text-neutral-600"
          />

          <input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg text-neutral-600"
          />

          <div className="text-right">
            <span
              className="text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => openModal("forgotPassword")}
            >
              {t("login.forgotPassword")}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("login.button")}
          </button>
        </form>

        <p className="flex justify-center items-center text-neutral-900 gap-2 mt-2.5">
          {t("login.prompt")}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => openModal("register")}
          >
            {t("login.registerLink")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
