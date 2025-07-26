// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useState } from "react"
// import { Package, Menu, X, ChevronDown } from "lucide-react"

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

//   const isActive = (path) => pathname === path

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false)
//   }

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center text-xl font-bold text-green-600">
//               <Package className="h-6 w-6 mr-2" />
//               MediEase
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               href="/features"
//               className={`${isActive("/features") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
//             >
//               Features
//             </Link>
//             <Link
//               href="/pricing"
//               className={`${isActive("/pricing") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/about"
//               className={`${isActive("/about") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
//             >
//               About
//             </Link>

//             <div className="flex items-center space-x-4">
//               <Link
//                 href="/auth/login"
//                 className="px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 transition-colors"
//               >
//                 Sign In
//               </Link>

//               {/* Desktop Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="flex items-center px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-colors"
//                 >
//                   Get Started
//                   <ChevronDown className="ml-1 h-4 w-4" />
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                     <div className="py-1">
//                       <Link
//                         href="/registration/chemist"
//                         className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         <div className="font-medium">Register as Chemist</div>
//                         <div className="text-xs text-gray-500">For pharmacy owners</div>
//                       </Link>
//                       <Link
//                         href="/registration/supplier"
//                         className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         <div className="font-medium">Register as Supplier</div>
//                         <div className="text-xs text-gray-500">For medicine suppliers</div>
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMobileMenu}
//               className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2"
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
//               <Link
//                 href="/features"
//                 className={`block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive("/features")
//                     ? "text-green-600 bg-green-50"
//                     : "text-gray-500 hover:text-green-500 hover:bg-green-50"
//                 } transition-colors`}
//                 onClick={closeMobileMenu}
//               >
//                 Features
//               </Link>
//               <Link
//                 href="/pricing"
//                 className={`block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive("/pricing")
//                     ? "text-green-600 bg-green-50"
//                     : "text-gray-500 hover:text-green-500 hover:bg-green-50"
//                 } transition-colors`}
//                 onClick={closeMobileMenu}
//               >
//                 Pricing
//               </Link>
//               <Link
//                 href="/about"
//                 className={`block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive("/about")
//                     ? "text-green-600 bg-green-50"
//                     : "text-gray-500 hover:text-green-500 hover:bg-green-50"
//                 } transition-colors`}
//                 onClick={closeMobileMenu}
//               >
//                 About
//               </Link>

//               <div className="border-t border-gray-200 pt-4 mt-4">
//                 <Link
//                   href="/auth/login"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-500 hover:bg-green-50 transition-colors"
//                   onClick={closeMobileMenu}
//                 >
//                   Sign In
//                 </Link>

//                 {/* Mobile Registration Options */}
//                 <div className="mt-2 space-y-2">
//                   <Link
//                     href="/registration"
//                     className="block px-3 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
//                     onClick={closeMobileMenu}
//                   >
//                     <div className="font-medium">Register as Chemist</div>
//                     <div className="text-sm text-green-100">For pharmacy owners</div>
//                   </Link>
//                   <Link
//                     href="/registration"
//                     className="block px-3 py-3 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
//                     onClick={closeMobileMenu}
//                   >
//                     <div className="font-medium">Register as Supplier</div>
//                     <div className="text-sm text-green-600">For medicine suppliers</div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Overlay for dropdown */}
//       {isDropdownOpen && <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)} />}
//     </nav>
//   )
// }
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Package, Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isActive = (path) => pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center text-xl font-bold text-green-600"
              onClick={closeMobileMenu}
            >
              <Package className="h-6 w-6 mr-2" />
              MediEase
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className={`${isActive("/features") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`${isActive("/pricing") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`${isActive("/about") ? "text-green-600" : "text-gray-500"} hover:text-green-500 transition-colors`}
            >
              About
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 transition-colors"
              >
                Sign In
              </Link>

              {/* Desktop Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Get Started
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <Link
                        href="/registration/chemist"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        onClick={() => {
                          setIsDropdownOpen(false)
                          closeMobileMenu()
                        }}
                      >
                        <div className="font-medium">Register as Chemist</div>
                        <div className="text-xs text-gray-500">For pharmacy owners</div>
                      </Link>
                      <Link
                        href="/registration/supplier"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        onClick={() => {
                          setIsDropdownOpen(false)
                          closeMobileMenu()
                        }}
                      >
                        <div className="font-medium">Register as Supplier</div>
                        <div className="text-xs text-gray-500">For medicine suppliers</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                href="/features"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/features")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-green-500 hover:bg-green-50"
                } transition-colors`}
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/pricing")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-green-500 hover:bg-green-50"
                } transition-colors`}
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/about")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-green-500 hover:bg-green-50"
                } transition-colors`}
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-500 hover:bg-green-50 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>

                {/* Mobile Registration Options */}
                <div className="mt-2 space-y-2">
                  <Link
                    href="/registration/chemist"
                    className="block px-3 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">Register as Chemist</div>
                    <div className="text-sm text-green-100">For pharmacy owners</div>
                  </Link>
                  <Link
                    href="/registration/supplier"
                    className="block px-3 py-3 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">Register as Supplier</div>
                    <div className="text-sm text-green-600">For medicine suppliers</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  )
}