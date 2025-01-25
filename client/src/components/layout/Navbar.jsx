import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react"; // Using lucide-react icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold dark:text-white">
            Job Portal
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {user ? (
              <>
                <Link
                  to="/jobs"
                  className="hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/applications"
                  className="hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  My Applications
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 px-4 py-2 rounded transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
