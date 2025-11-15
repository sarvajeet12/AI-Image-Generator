import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { useState } from "react";
import { toast } from "sonner";
import logo from "../assets/website-logo.png";
import GoogleIcon from "../assets/google-icon.png";
import ProfileImage from "../assets/profile-img.png";
import { IoLogOutOutline } from "react-icons/io5";

const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-500/10 text-blue-600 backdrop-blur-sm"
          : "text-gray-700 hover:bg-gray-200/50 hover:backdrop-blur-sm"
      }`
    }
    onClick={onClick}
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          <img src={logo} alt="website-logo" className="w-20" />
        </Link>

        {/* Desktop nav (>= lg) */}
        <nav className="hidden lg:flex items-center gap-2">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          {user ? (
            <NavItem to="/generate" label="Generate" />
          ) : (
            <button
              onClick={() => {
                toast.info("Please login first to generate images");
              }}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200/50 hover:backdrop-blur-sm transition-all duration-200"
            >
              Generate
            </button>
          )}
          {user && <NavItem to="/dashboard" label="Dashboard" />}
          {user?.role === "admin" && <NavItem to="/admin" label="Admin" />}
        </nav>

        {/* Desktop auth (>= lg) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <div className="relative">
                <img
                  src={user?.photoURL || user?.avatar || ProfileImage}
                  alt="profile"
                  className="rounded-full h-8 w-8 object-cover border border-gray-200"
                  onError={(e) => {
                    console.log(
                      "Failed to load avatar, falling back to default"
                    );
                    e.target.src = ProfileImage;
                  }}
                />
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm font-semibold rounded-full bg-white/80 text-slate-600 hover:bg-slate-200 hover:shadow-sm transition-all duration-200 border border-slate-200/80 hover:border-slate-300/80 backdrop-blur-sm flex items-center gap-2"
              >
                <IoLogOutOutline className="text-xl"/> Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="px-3 py-1.5 text-sm rounded-full bg-white/80 text-slate-600 hover:bg-slate-200 hover:shadow-sm transition-all duration-200 border border-slate-200/80 hover:border-slate-300/80 backdrop-blur-sm flex items-center gap-2"
            >
              <img src={GoogleIcon} className="size-4" />{" "}
              <span className="font-semibold text-sm">
                Continue with Google
              </span>
            </button>
          )}
        </div>

        {/* Mobile menu button (< lg) */}
        <button
          className={`lg:hidden inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 bg-gray-200/70 cursor-pointer`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`lg:hidden fixed inset-0 z-30 ${open ? "block" : "hidden"}`}
        onClick={close}
      >
        {/* Invisible clickable overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: -1,
            opacity: 0,
            cursor: "pointer",
          }}
        />

        {/* Menu panel */}
        <div
          className="fixed top-14 right-0 left-0 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-10px)",
            transition:
              "opacity 150ms ease-in-out, transform 150ms ease-in-out",
          }}
        >
          <div className="container mx-auto px-4 py-3 space-y-1">
            <NavItem to="/" label="Home" onClick={close} />
            <NavItem to="/about" label="About" onClick={close} />
            {user ? (
              <NavItem to="/generate" label="Generate" onClick={close} />
            ) : (
              <button
                onClick={() => {
                  toast("Please login first to generate images");
                  close();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200/50 hover:backdrop-blur-sm transition-colors duration-200"
              >
                Generate
              </button>
            )}
            {user && (
              <NavItem to="/dashboard" label="Dashboard" onClick={close} />
            )}
            {user?.role === "admin" && (
              <NavItem to="/admin" label="Admin" onClick={close} />
            )}

            <div className="pt-2 border-t mt-2">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    close();
                  }}
                  className="w-full text-left px-4 py-2 rounded-full text-sm font-semibold bg-white/80 hover:bg-slate-200 transition-all duration-200 border border-gray-200/80 hover:border-gray-300/80 backdrop-blur-sm flex items-center gap-2"
                >
                  <IoLogOutOutline className="text-xl"/> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    loginWithGoogle();
                    close();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 bg-white/80 transition-all duration-200 border border-gray-200/80 hover:border-gray-300/80 backdrop-blur-sm"
                >
                  <img src={GoogleIcon} className="size-4" />{" "}
                  <span className="font-semibold text-sm">
                    Continue with Google
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
