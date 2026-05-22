// components/Footer.jsx
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const serviceLinks = [
  { name: "Browse Tutors", href: "/tutors" },
  { name: "Add a Tutor", href: "/add-tutor" },
  { name: "My Tutors", href: "/my-tutors" },
  { name: "Booked Sessions", href: "/my-sessions" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

const socials = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-[#1877F2]",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter / X",
    color: "hover:text-[#1DA1F2]",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-[#E1306C]",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-[#0A66C2]",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
    color: "hover:text-[#FF0000]",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand + Social */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold text-purple-600 dark:text-purple-400 tracking-tight"
            >
              Mediqueue
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Connecting students with expert tutors for personalized, flexible
              learning — anytime, anywhere.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:scale-110 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Learning Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@mediqueue.com"
                  className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <MdEmail
                    size={16}
                    className="flex-shrink-0 text-purple-500"
                  />
                  support@mediqueue.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <MdPhone size={16} className="flex-shrink-0 text-green-500" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <MdLocationOn
                  size={16}
                  className="flex-shrink-0 text-red-400 mt-0.5"
                />
                123 Education St, Learning City, LC 12345
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {year} Mediqueue. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link
              href="/terms"
              className="hover:text-purple-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-purple-500 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
