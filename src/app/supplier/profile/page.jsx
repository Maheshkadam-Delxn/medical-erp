"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";

const SupplierProfileSettings = () => {
  const router = useRouter();
  const { user, loading: sessionLoading, updateUser } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  // Only allow suppliers
  useEffect(() => {
    if (!sessionLoading && (!user || user.role !== "supplier")) {
      router.push("/auth/login");
    }
  }, [user, sessionLoading, router]);

  // Populate form with session user data
  useEffect(() => {
    if (user && user.role === "supplier") {
      reset({
        companyName: user.companyName || "",
        contactPerson: user.contactPerson || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        gstNumber: user.gstNumber || "",
        drugLicenseNumber: user.drugLicenseNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/supplier/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update profile");
      updateUser(data); // update session context
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4">Loading session...</p>
        </div>
      </div>
    );
  }
  if (!user || user.role !== "supplier") {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Supplier Profile Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Account status */}
        <div className="md:w-1/3">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900">Account Status</h3>
            <div className={`mt-2 p-3 rounded-md ${user.isApproved ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
              <p className="text-sm">
                {user.isApproved ? "Verified Supplier ✓" : "Pending Approval"}
              </p>
              <p className="text-xs mt-1">
                {user.isApproved
                  ? "Your account is active and visible to buyers"
                  : "Your account is pending admin approval"}
              </p>
            </div>
          </div>
        </div>
        {/* Right column - Form fields */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{successMessage}</div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name *</label>
                <input type="text" id="companyName" {...register("companyName", { required: "Company name is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person *</label>
                <input type="text" id="contactPerson" {...register("contactPerson", { required: "Contact person is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" id="email" {...register("email", { required: "Email is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input type="tel" id="phone" {...register("phone", { required: "Phone number is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                <input type="text" id="address" {...register("address", { required: "Address is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <input type="text" id="city" {...register("city", { required: "City is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State *</label>
                <input type="text" id="state" {...register("state", { required: "State is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode *</label>
                <input type="text" id="pincode" {...register("pincode", { required: "Pincode is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>}
              </div>
              <div>
                <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">GST Number *</label>
                <input type="text" id="gstNumber" {...register("gstNumber", { required: "GST number is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.gstNumber && <p className="mt-1 text-sm text-red-600">{errors.gstNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="drugLicenseNumber" className="block text-sm font-medium text-gray-700">Drug License Number *</label>
                <input type="text" id="drugLicenseNumber" {...register("drugLicenseNumber", { required: "Drug license number is required" })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                {errors.drugLicenseNumber && <p className="mt-1 text-sm text-red-600">{errors.drugLicenseNumber.message}</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfileSettings;