import React from "react";
import { useModalStore } from "../store/store";
import { useTranslation } from "react-i18next";

function Register() {
  const { modalType, openModal, closeModal } = useModalStore();
  const { t } = useTranslation();

  if (modalType !== "register") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 text-center">
          {t("register.title")}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder={t("register.namePlaceholder")}
            className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
          />
          <input
            type="email"
            placeholder={t("register.emailPlaceholder")}
            className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
          />
          <input
            type="password"
            placeholder={t("register.passwordPlaceholder")}
            className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {t("register.button")}
          </button>
        </form>
        <p className="flex justify-center items-center text-neutral-900 gap-2 mt-2.5">
          {t("register.prompt")}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              openModal("login");
            }}
          >
            {t("register.loginLink")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
