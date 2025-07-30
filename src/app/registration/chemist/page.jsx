"use client"

import { useState, useRef } from "react"
import {
  User,
  Mail,
  Phone,
  CalendarCheck,
  Lock,
  FileBarChart2,
  Zap,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Home,
  Building,
  MailIcon,
  MapIcon,
  BadgeIcon as IdCard,
  Calendar,
  CreditCard,
  LogIn,
} from "lucide-react"

const steps = [
  { title: "Personal", icon: User },
  { title: "Shop", icon: Home }, // Changed icon to Home for Shop
  { title: "Validation", icon: FileBarChart2 },
]

const shopTypes = [
  "Retail Pharmacy",
  "Wholesale Pharmacy",
  "Hospital Pharmacy",
  "Online Pharmacy",
  "Clinical Pharmacy",
  "Community Pharmacy",
]

function InputField({ icon, name, placeholder, value, onChange, type = "text", error, maxLength }) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">{icon}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 border ${
          error ? "border-red-300 bg-red-50/80" : "border-green-200 hover:border-green-300"
        } rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm transition-all bg-green-50 hover:bg-white`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center">
          <X className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function ChemistRegistration() {
  const [step, setStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    aadharNumber: "",
    panNumber: "",
    storeName: "",
    shoptype: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    licenseNumber: "",
    licenseExpiry: "",
    gstNumber: "",
  })

  const [licenseFile, setLicenseFile] = useState(null)
  const [licensePreview, setLicensePreview] = useState(null)
  const [gstFile, setGstFile] = useState(null)
  const [gstPreview, setGstPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [userId, setUserId] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const licenseRef = useRef(null)
  const gstRef = useRef(null)

  const handleChange = (e) => {
    let value = e.target.value

    // Format specific fields
    if (e.target.name === "panNumber") {
      value = value.toUpperCase()
    }
    if (e.target.name === "gstNumber") {
      value = value.toUpperCase()
    }
    if (e.target.name === "aadharNumber") {
      value = value.replace(/\D/g, "") // Only numbers
    }
    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "") // Only numbers
    }
    if (e.target.name === "pincode") {
      value = value.replace(/\D/g, "") // Only numbers
    }

    setForm({ ...form, [e.target.name]: value })

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]

    if (file && !validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        [type]: "Invalid file type. Only PDF, JPG, PNG allowed.",
      })
      if (type === "licenseFile") {
        setLicenseFile(null)
        setLicensePreview(null)
      }
      if (type === "gstFile") {
        setGstFile(null)
        setGstPreview(null)
      }
    } else {
      if (type === "licenseFile") {
        setLicenseFile(file)
        if (file && file.type.includes("image")) {
          const reader = new FileReader()
          reader.onload = () => setLicensePreview(reader.result)
          reader.readAsDataURL(file)
        } else {
          setLicensePreview(null)
        }
      }
      if (type === "gstFile") {
        setGstFile(file)
        if (file && file.type.includes("image")) {
          const reader = new FileReader()
          reader.onload = () => setGstPreview(reader.result)
          reader.readAsDataURL(file)
        } else {
          setGstPreview(null)
        }
      }
      setErrors({ ...errors, [type]: "" })
    }
  }

  const removeFile = (type) => {
    if (type === "licenseFile") {
      setLicenseFile(null)
      setLicensePreview(null)
      if (licenseRef.current) licenseRef.current.value = ""
    }
    if (type === "gstFile") {
      setGstFile(null)
      setGstPreview(null)
      if (gstRef.current) gstRef.current.value = ""
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Personal information validation
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = "Name is required"
      if (!form.email.trim()) newErrors.email = "Email is required"
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email format"
      if (!form.phone.trim()) newErrors.phone = "Phone is required"
      else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Invalid phone number (10 digits)"
      if (!form.aadharNumber.trim()) newErrors.aadharNumber = "Aadhar number is required"
      else if (!/^[0-9]{12}$/.test(form.aadharNumber)) newErrors.aadharNumber = "Invalid Aadhar number (12 digits)"
      if (!form.panNumber.trim()) newErrors.panNumber = "PAN number is required"
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber))
        newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)"
      if (!form.password.trim()) newErrors.password = "Password is required"
      else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    }
    // Shop information validation
    else if (step === 1) {
      if (!form.storeName.trim()) newErrors.storeName = "Store name is required"
      if (!form.shoptype.trim()) newErrors.shoptype = "Shop type is required"
      if (!form.address.trim()) newErrors.address = "Address is required"
      if (!form.city.trim()) newErrors.city = "City is required"
      if (!form.state.trim()) newErrors.state = "State is required"
      if (!form.pincode.trim()) newErrors.pincode = "Pincode is required"
      else if (!/^[0-9]{6}$/.test(form.pincode)) newErrors.pincode = "Invalid pincode (6 digits)"
    }
    // Legal information validation
    else if (step === 2) {
      if (!form.licenseNumber.trim()) newErrors.licenseNumber = "License number is required"
      if (!form.licenseExpiry.trim()) newErrors.licenseExpiry = "License expiry date is required"
      else {
        const expiryDate = new Date(form.licenseExpiry)
        const today = new Date()
        if (expiryDate <= today) newErrors.licenseExpiry = "License expiry date must be in the future"
      }
      if (!licenseFile) newErrors.licenseFile = "License copy is required"
      if (!form.gstNumber.trim()) newErrors.gstNumber = "GST number is required"
      else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/.test(form.gstNumber)) {
        newErrors.gstNumber = "Invalid GST format (e.g., 27ABCDE1234F1Z5)"
      }
      if (!gstFile) newErrors.gstFile = "GST Copy is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      isValid = false
    } else {
      setErrors({})
    }

    return isValid
  }

  const nextStep = () => {
    if (validateForm() && step < steps.length - 1) {
      setStep((prev) => prev + 1)
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step])
      }
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const submitForm = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setSubmitError("")

    const formData = new FormData()

    // Append all form fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })

    // Append files
    if (licenseFile) formData.append("licenseFile", licenseFile)
    if (gstFile) formData.append("gstFile", gstFile)

    try {
      const response = await fetch("/api/chemist/register", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      if (result.data?.registrationId) {
        setUserId(result.data.registrationId)
      }

      setIsSubmitted(true)
      setCompletedSteps([...completedSteps, step])
    } catch (error) {
      console.error("Registration error:", error)
      setSubmitError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex font-sans">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 lg:px-16 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Chemist Registration</h1>
          <p className="text-gray-600 text-sm mt-2">Join our healthcare network in simple steps</p>
        </div>

        {/* Stepper */}
        <div className="relative w-full max-w-xl mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i <= step
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                  }`}
                >
                  {completedSteps.includes(i) ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <p className={`text-xs mt-2 font-medium ${i <= step ? "text-gray-700" : "text-gray-400"}`}>{s.title}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 z-0">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-in-out"
              style={{
                width: step > 0 ? `${(step / (steps.length - 1)) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 border border-gray-200">
          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
              <p className="text-sm text-green-700 mb-4">Thank you for registering with us!</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 mb-2">Your Registration ID:</p>
                <div className="text-green-900 text-lg font-mono font-bold">{userId}</div>
                <p className="text-xs text-green-600 mt-2">Please save this ID for future reference</p>
              </div>
              <button
                onClick={() => (window.location.href = "/auth/login")}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2 inline-block" />
                login to Dashboard
              </button>
              <p className="text-xs text-gray-500 mt-4">
                You can now log in to your dashboard and manage your pharmacy.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                <ChevronLeft className="w-4 h-4 mr-2 inline-block" />
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center text-green-800 mb-2">{steps[step].title} Information</h2>
              <p className="text-xs text-center text-green-600 mb-6">
                {step === 0 && "Enter your personal details to get started"}
                {step === 1 && "Tell us about your pharmacy"}
                {step === 2 && "Legal and business information"}
              </p>

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center">
                  <X className="w-4 h-4 mr-2 flex-shrink-0" />
                  {submitError}
                </div>
              )}

              <div className="space-y-4">
                {step === 0 && (
                  <>
                    <InputField
                      icon={<User className="w-4 h-4 text-green-400" />}
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <InputField
                      icon={<Mail className="w-4 h-4 text-green-400" />}
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <InputField
                      icon={<Phone className="w-4 h-4 text-green-400" />}
                      name="phone"
                      placeholder="Mobile Number"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      maxLength={10}
                    />
                    <InputField
                      icon={<IdCard className="w-4 h-4 text-green-400" />}
                      name="aadharNumber"
                      placeholder="Aadhar Number"
                      value={form.aadharNumber}
                      onChange={handleChange}
                      error={errors.aadharNumber}
                      maxLength={12}
                    />
                    <InputField
                      icon={<CreditCard className="w-4 h-4 text-green-400" />}
                      name="panNumber"
                      placeholder="PAN Number (e.g., ABCDE1234F)"
                      value={form.panNumber}
                      onChange={handleChange}
                      error={errors.panNumber}
                      maxLength={10}
                    />
                    <InputField
                      icon={<Lock className="w-4 h-4 text-green-400" />}
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      error={errors.password}
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <InputField
                      icon={<Home className="w-4 h-4 text-green-400" />}
                      name="storeName"
                      placeholder="Store Name"
                      value={form.storeName}
                      onChange={handleChange}
                      error={errors.storeName}
                    />
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <select
                        name="shoptype"
                        value={form.shoptype}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                          errors.shoptype ? "border-red-300 bg-red-50/80" : "border-green-200 hover:border-green-300"
                        } rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm transition-all bg-green-50 hover:bg-white appearance-none`}
                      >
                        <option value="">Select Shop Type</option>
                        {shopTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.shoptype && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <X className="w-3 h-3 mr-1" />
                          {errors.shoptype}
                        </p>
                      )}
                    </div>
                    <InputField
                      icon={<MapPin className="w-4 h-4 text-green-400" />}
                      name="address"
                      placeholder="Full Address"
                      value={form.address}
                      onChange={handleChange}
                      error={errors.address}
                    />
                    <InputField
                      icon={<Building className="w-4 h-4 text-green-400" />}
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      error={errors.city}
                    />
                    <InputField
                      icon={<MapIcon className="w-4 h-4 text-green-400" />}
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      error={errors.state}
                    />
                    <InputField
                      icon={<MailIcon className="w-4 h-4 text-green-400" />}
                      name="pincode"
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      error={errors.pincode}
                      maxLength={6}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <InputField
                      icon={<IdCard className="w-4 h-4 text-green-400" />}
                      name="licenseNumber"
                      placeholder="License Number"
                      value={form.licenseNumber}
                      onChange={handleChange}
                      error={errors.licenseNumber}
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Expiry Date</label>
                    <InputField
                      icon={<Calendar className="w-4 h-4 text-green-400" />}
                      name="licenseExpiry"
                      type="date"
                      placeholder="License Expiry Date"
                      value={form.licenseExpiry}
                      onChange={handleChange}
                      error={errors.licenseExpiry}
                    />

                    {/* License File Upload */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload License Copy (PDF/Image)
                      </label>
                      <div className="relative">
                        <input
                          ref={licenseRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "licenseFile")}
                          className={`w-full text-sm p-3 rounded-xl bg-white border-2 focus:outline-none focus:border-green-500 ${
                            errors.licenseFile ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                          } transition-colors duration-200 cursor-pointer`}
                        />
                        {licenseFile && (
                          <div className="mt-2 flex items-center space-x-2">
                            {licensePreview ? (
                              <div className="relative group">
                                <img
                                  src={licensePreview || "/placeholder.svg"}
                                  alt="License preview"
                                  className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                />
                                <button
                                  type="button"
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                  onClick={() => removeFile("licenseFile")}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs flex items-center">
                                <FileBarChart2 className="w-3 h-3 mr-1" />
                                {licenseFile.name}
                                <button
                                  type="button"
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  onClick={() => removeFile("licenseFile")}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {errors.licenseFile && (
                        <div className="mt-1 text-red-500 text-xs flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          {errors.licenseFile}
                        </div>
                      )}
                    </div>

                    <InputField
                      icon={<FileBarChart2 className="w-4 h-4 text-green-400" />}
                      name="gstNumber"
                      placeholder="GST Number (e.g., 27ABCDE1234F1Z5)"
                      value={form.gstNumber}
                      onChange={handleChange}
                      error={errors.gstNumber}
                      maxLength={15}
                    />

                    {/* GST File Upload */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload GST Certificate (Image/PDF)
                      </label>
                      <div className="relative">
                        <input
                          ref={gstRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png" // Changed to allow PDF
                          onChange={(e) => handleFileChange(e, "gstFile")}
                          className={`w-full text-sm p-3 rounded-xl bg-white border-2 focus:outline-none focus:border-green-500 ${
                            errors.gstFile ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                          } transition-colors duration-200 cursor-pointer`}
                        />
                        {gstFile && (
                          <div className="mt-2 flex items-center space-x-2">
                            {gstPreview ? (
                              <div className="relative group">
                                <img
                                  src={gstPreview || "/placeholder.svg"}
                                  alt="GST preview"
                                  className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                />
                                <button
                                  type="button"
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                  onClick={() => removeFile("gstFile")}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs flex items-center">
                                <FileBarChart2 className="w-3 h-3 mr-1" />
                                {gstFile.name}
                                <button
                                  type="button"
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  onClick={() => removeFile("gstFile")}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {errors.gstFile && (
                        <div className="mt-1 text-red-500 text-xs flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          {errors.gstFile}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 0}
                  className={`flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    step === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-green-200 text-green-700 hover:bg-green-300"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={step === steps.length - 1 ? submitForm : nextStep}
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      {step === steps.length - 1 ? "Submitting..." : "Processing..."}
                    </span>
                  ) : (
                    <>
                      {step === steps.length - 1 ? "Submit Application" : "Next Step"}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Visual Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-green-700 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-10 text-center">
          <img
            src="/placeholder.svg?height=400&width=400&text=Chemist Registration"
            alt="Healthcare Registration"
            className="w-full max-w-sm mb-6 "
          />
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Network</h3>
          <p className="text-green-100 text-base mb-6">
            Connect with thousands of healthcare professionals and transform your pharmacy management
          </p>
          <div className="space-y-3">
            {[
              {
                icon: CalendarCheck,
                text: "Smart scheduling system",
                color: "bg-teal-400",
              },
              {
                icon: FileBarChart2,
                text: "Digital health records",
                color: "bg-cyan-400",
              },
              {
                icon: Zap,
                text: "Instant prescriptions",
                color: "bg-yellow-400",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
