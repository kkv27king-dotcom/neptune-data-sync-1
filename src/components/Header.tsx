import { useState } from "react"
import Icon from "@/components/ui/icon"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Главная" },
    { href: "/about", label: "О компании" },
    { href: "/catalog", label: "Каталог" },
    { href: "/services", label: "Услуги" },
    { href: "/contacts", label: "Контакты" },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Icon name="Wind" size={22} className="text-sky-400" />
          <span className="text-white text-base font-semibold tracking-wide">КлиматПро</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="/contacts"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition-colors duration-200"
        >
          <Icon name="Phone" size={14} />
          Позвонить
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 mx-auto max-w-6xl bg-black/80 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-sm uppercase tracking-wider transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contacts"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 text-white text-sm font-medium text-center justify-center"
          >
            <Icon name="Phone" size={14} />
            Позвонить
          </a>
        </div>
      )}
    </header>
  )
}