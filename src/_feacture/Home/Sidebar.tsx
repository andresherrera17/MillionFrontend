import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const isActive = (path: string) =>
    location.pathname === path ? "bg-gray-700 text-white" : "text-gray-700";
  const isActiveText = (path: string) =>
    location.pathname === path ? "text-white" : "text-text-light";
  return (
    <>
      <div className="relative lg:flex">
        <aside className="w-64 bg-card-light dark:bg-card-dark shadow-md hidden lg:flex flex-col fixed top-0 left-0 h-full z-20">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-display text-2xl font-bold text-center text-primary">
              Elite Homes
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive(
                "/"
              )}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined mr-3 text-primary">
                home
              </span>
              <span
                className={`font-medium   dark:text-text-dark ${isActiveText(
                  "/"
                )}`}
              >
                Home
              </span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive(
                "/admin"
              )}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined mr-3 text-primary">
                admin_panel_settings
              </span>
              <span
                className={`font-medium   dark:text-text-dark ${isActiveText(
                  "/admin"
                )}`}
              >
                Administration
              </span>
            </Link>
          </nav>
        </aside>
        <div className="flex-1 lg:ml-64">
          <header className="p-4 flex justify-between items-center bg-background-light dark:bg-background-dark sticky top-0 z-10 shadow-md lg:hidden">
            <h1 className="font-display text-2xl font-bold text-primary">
              Elite Homes
            </h1>
            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              id="menu-button"
              onClick={() => setIsOpen(true)}
            >
              <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                menu
              </span>
            </button>
          </header>
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-white/70 bg-opacity-90  z-40 lg:hidden"
            id="menu-overlay"
            onClick={() => setIsOpen(false)}
          ></div>
          <nav
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background-light dark:bg-background-dark shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            id="nav-menu"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-display text-xl font-bold text-text-light dark:text-text-dark">
                Menu
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                id="close-menu-button"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                  close
                </span>
              </button>
            </div>
            <ul className="p-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className={`flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive(
                    "/"
                  )}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="material-symbols-outlined mr-3 text-primary">
                    home
                  </span>
                  <span
                    className={`font-medium   dark:text-text-dark ${isActiveText(
                      "/"
                    )}`}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive(
                    "/admin"
                  )}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="material-symbols-outlined mr-3 text-primary">
                    admin_panel_settings
                  </span>
                  <span
                    className={`font-medium   dark:text-text-dark ${isActiveText(
                      "/admin"
                    )}`}
                  >
                    Administration
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
