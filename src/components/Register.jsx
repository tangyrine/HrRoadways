import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useModalStore, useAuthStore } from "../store/store";
import { useTranslation } from "react-i18next";

function Register() {
  const { modalType, openModal, closeModal } = useModalStore();
  const { login } = useAuthStore(); // Zustand auth store
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- NEW

  if (modalType !== "register") return null;

  const handleRegister = (e) => {
    e.preventDefault();
    login({ name, email }); // Simulated registration
    closeModal();
  };

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

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={t("register.namePlaceholder")}
            className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t("register.emailPlaceholder")}
            className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password field with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("register.passwordPlaceholder")}
              className="w-full px-4 py-2 border rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-300 placeholder:font-medium text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22}/> : <AiOutlineEye size={22}/>}
            </span>
          </div>

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
            onClick={() => openModal("login")}
          >
            {t("register.loginLink")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
