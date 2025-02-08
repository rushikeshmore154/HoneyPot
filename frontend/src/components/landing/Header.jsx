import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    (<header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Link href="/" className="text-2xl font-bold text-gray-800">
            HospitalQ
          </Link>
        </motion.div>
        <div className="hidden md:flex space-x-4">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#for-patients">For Patients</NavLink>
          <NavLink href="#for-hospitals">For Hospitals</NavLink>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white py-2">
          <NavLink href="#features" mobile>
            Features
          </NavLink>
          <NavLink href="#for-patients" mobile>
            For Patients
          </NavLink>
          <NavLink href="#for-hospitals" mobile>
            For Hospitals
          </NavLink>
        </motion.div>
      )}
    </header>)
  );
}

function NavLink({
  href,
  children,
  mobile = false
}) {
  return (
    (<Link
      href={href}
      className={`text-gray-600 hover:text-gray-800 transition-colors duration-200 ${mobile ? "block py-2 px-4" : ""}`}>
      {children}
    </Link>)
  );
}

