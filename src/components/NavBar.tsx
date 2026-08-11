import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/fields", label: "Fields" },
  { to: "/rotation", label: "Rotation" },
  { to: "/timeline", label: "Timeline" },
];

const linkClass = (isActive: boolean) =>
  `rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
    isActive
      ? "bg-emerald-600 text-white"
      : "text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
  }`;

export default function NavBar() {
  return (
    <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
        <span className="mr-4 text-lg font-semibold text-stone-900 dark:text-stone-100">
          🌾 FarmSiM Manager
        </span>
        <nav className="flex gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => linkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
