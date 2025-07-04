// src/app/components/Footer.jsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Product
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/demo">Demo</FooterLink>
              <FooterLink href="/updates">Updates</FooterLink>
              <FooterLink href="/roadmap">Roadmap</FooterLink>
            </ul>
          </div>

          {/* Social/Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Connect With Us
            </h3>
            <div className="flex gap-5 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <ContactItem 
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                }
                text="support@pharmacare.com"
                href="mailto:support@pharmacare.com"
              />
              <ContactItem 
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                }
                text="Bangalore, India"
              />
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              PharmaCare
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              All-in-one ERP solution for modern pharmacies and chemist shops with GST compliance and inventory management.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Made in India 🇮🇳</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">GST Compliant</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">PCI-Secure</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PharmaCare. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="/terms" className="hover:text-green-600 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-green-600 transition-colors">Privacy</a>
            <a href="/cookies" className="hover:text-green-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-600 hover:text-green-600 transition-colors flex items-start group"
    >
      <span className="mr-2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      {children}
    </a>
  </li>
);

const ContactItem = ({ icon, text, href }) => (
  <div className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
    <span className="text-green-500">{icon}</span>
    {href ? (
      <a href={href} className="hover:underline">{text}</a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/yournumber",
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-12.21c-5.297 0-9.59 4.293-9.59 9.59 0 1.691.448 3.31 1.294 4.768L1.254 21.8l3.846-1.01a9.58 9.58 0 0 0 4.583 1.166c5.293 0 9.588-4.293 9.588-9.59 0-5.297-4.295-9.59-9.588-9.59" />
      </svg>
    )
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/yourprofile",
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourprofile",
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourpage",
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )
  }
];