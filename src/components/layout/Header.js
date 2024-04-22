import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useEffect, useState } from "react";
import { Search } from "../Search";
import { DropdownLogin, DropdownLogout } from "../index";
import { useCart } from "../../context";

export function Header() {
  const { cartList } = useCart();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));
  //we can also create a context so that we dont
  // have to use this statement everywhere
  function darkModeHandler() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <Link to="/" className="flex items-center space-x-3 ">
            <img src={Logo} className="h-8" alt="CodeBook Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CodeBook
            </span>
          </Link>
          <div className="flex items-center relative">
            <span
              className={`cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi ${
                !darkMode ? "bi bi-sun" : "bi bi-moon"
              }`}
              onClick={darkModeHandler}
            ></span>
            <span
              onClick={() => setShowSearch((prev) => !prev)}
              className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"
            ></span>
            <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
              <span className="text-2xl bi bi-cart3 relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full">
                  {cartList.length}
                </span>
              </span>
            </Link>
            <span
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer text-2xl text-gray-700 dark:text-white bi bi-person-circle"
            ></span>
            {showDropdown &&
              (token ? (
                <DropdownLogin setShowDropdown={setShowDropdown} />
              ) : (
                <DropdownLogout setShowDropdown={setShowDropdown} />
              ))}
          </div>
        </div>
      </nav>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </header>
  );
}
