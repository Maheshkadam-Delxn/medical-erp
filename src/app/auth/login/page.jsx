"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MultiUserLogin() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState("chemist");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});

  // User type configurations
  const userTypes = {
    chemist: {
      title: "Chemist Portal",
      subtitle: "Manage your pharmacy inventory and sales with precision",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    supplier: {
      title: "Supplier Portal",
      subtitle: "Streamline orders and deliveries efficiently",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h6"
          />
        </svg>
      ),
    },
    superadmin: {
      title: "Super Admin",
      subtitle: "Complete system administration and control",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  // Handle login submission
  const handleLogin = async () => {
    const validationErrors = validateForm();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userType: selectedUserType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Redirect based on role
      switch (selectedUserType) {
        case "chemist":
          router.push("/dashboard/chemist");
          break;
        case "supplier":
          router.push("/dashboard/supplier");
          break;
        case "superadmin":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setSelectedUserType(type);
    setError("");
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex">
      <div className="flex flex-1">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-gray-50">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-3 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-700 mb-1">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to your pharmacy management system
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(userTypes).map(([key, type]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleUserTypeChange(key)}
                    className={`group flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedUserType === key
                        ? "border-green-500 bg-green-50 text-green-600 shadow-md"
                        : "border-gray-200 hover:border-green-300 hover:bg-white text-gray-700 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mb-1 transition-all duration-300 ${
                        selectedUserType === key
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500 group-hover:bg-green-50"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <span className="text-xs font-medium text-center leading-tight">
                      {type.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.email
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                    placeholder="your@email.com"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 pl-10 pr-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                    placeholder="••••••••"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/registration"
                  className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200"
                >
                  Don't have an account?{" "}
                  <span className="text-green-600 hover:text-green-500">
                    Register here
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Welcome Content */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-6 lg:p-8 flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-10 w-20 h-20 bg-white rounded-full"></div>
          </div>

          <div className="text-center text-white max-w-md w-full relative z-10">
            <div className="relative w-full h-48 lg:h-56 mx-auto mb-6">
              <Image
                src="/login.jpg"
                alt="Pharmacy Management System"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Welcome to {userTypes[selectedUserType].title}
            </h2>
            <p className="text-base lg:text-lg opacity-90 mb-8">
              {userTypes[selectedUserType].subtitle}
            </p>

            <div className="flex justify-center space-x-8">
              <div className="text-center group">
                <div
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2  animate-bounce "
                  style={{ animationDelay: "0.6s" }}
                >
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-green-700 transition-transform duration-300 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium opacity-90">
                  Inventory
                </span>
              </div>

              <div className="text-center group">
                <div
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2  animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-green-700 transition-transform duration-300 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium opacity-90">Sales</span>
              </div>

              <div className="text-center group">
                <div
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2   animate-bounce "
                  style={{ animationDelay: "0.4s" }}
                >
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-green-700 transition-transform duration-300 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium opacity-90">Reports</span>
              </div>
            </div>

            {/* Additional features showcase */}
            <div className="mt-8 pt-6 border-t border-white border-opacity-20">
              <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span>Reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
