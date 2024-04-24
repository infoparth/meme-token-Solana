import Ballu_Logo from "../../assets/Ballu Logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav className="bg-[#f6b74f] border-gray-200 dark:bg-gray-900 border-b border-black border-opacity-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://ballu.xyz/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Ballu_Logo} className="h-12" alt="Flowbite Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block bg-[#f6b74f] md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col bg-[#f6b74f] p-4 md:p-0 mt-4  border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#f6b74f] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900  rounded text-lg hover:bg-gray-100 hover:text-gray-700 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://www.ballu.xyz/#vision"
                  className="block py-2 px-3 text-gray-900  bg-[#f6b74f] rounded text-lg hover:bg-gray-100 hover:text-gray-700 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Vision
                </a>
              </li>
              <li>
                <a
                  href="https://www.ballu.xyz/#how-to"
                  className="block py-2 px-3 text-gray-900 bg-[#f6b74f] rounded text-lg hover:bg-gray-100 hover:text-gray-700 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  How & Why
                </a>
              </li>
              <li>
                <a
                  href="https://veiled-echinodon-cd1.notion.site/Whitepaper-ballu-881d9bb2e3b34b7c8b0b9e286459d234"
                  className="block py-2 px-3 text-gray-900 bg-[#f6b74f] rounded text-lg hover:bg-gray-100 hover:text-gray-700 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Whitepaper
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="border-black" />
    </div>
  );
}

export default Navbar;
