"use client";
import { Settings, User, Lock, Bell, CreditCard } from "lucide-react";

export default function SettingsDashboard() {
  const settings = [
    { icon: <User className="h-5 w-5" />, title: "Profile", description: "Update your profile information" },
    { icon: <Lock className="h-5 w-5" />, title: "Security", description: "Change password and security settings" },
    { icon: <Bell className="h-5 w-5" />, title: "Notifications", description: "Configure notification preferences" },
    { icon: <CreditCard className="h-5 w-5" />, title: "Billing", description: "Manage payment methods and invoices" },
  ];

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" /> Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((setting, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  {setting.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
              {setting.title === "Notifications" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-notifications" className="text-sm">Email Notifications</label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="email-notifications" 
                        defaultChecked
                        className="sr-only"
                      />
                      <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="push-notifications" className="text-sm">Push Notifications</label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="push-notifications" 
                        className="sr-only"
                      />
                      <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-50">
                  Configure
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}