import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"
import { useCms } from "@/hooks/useCms"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const categories = ["Все", "Настенные", "Кассетные", "Канальные", "Мульти-сплит"]

const PRODUCT_CATEGORIES = ["Настенные", "Настенные", "Настенные", "Кассетные", "Канальные", "Мульти-сплит"]
const PRODUCT_FEATURES = [
  ["Инвертор", "Wi-Fi", "A++"],
  ["Инвертор", "Quiet Mode", "A+++"],
  ["Инвертор", "Wi-Fi", "A+"],
  ["4-х поточный", "Инвертор", "A++"],
  ["Скрытый монтаж", "Инвертор", "A+"],
  ["3 внутр. блока", "Инвертор", "A++"],
]

export default function Catalog() {
  const { get } = useCms("catalog")
  const [active, setActive] = useState("Все")

  const products = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    id: n,
    category: PRODUCT_CATEGORIES[i],
    brand: get(`catalog_p${n}_brand`, ""),
    model: get(`catalog_p${n}_model`, ""),
    power: get(`catalog_p${n}_power`, ""),
    area: get(`catalog_p${n}_area`, ""),
    price: get(`catalog_p${n}_price`, ""),
    badge: get(`catalog_p${n}_badge`, ""),
    image: get(`catalog_p${n}_image`, ""),
    features: PRODUCT_FEATURES[i],
  }))

  const filtered = active === "Все" ? products : products.filter((p) => p.category === active)

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <Header />

      <section className="pt-32 pb-12 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 mb-6"
        >
          <span className="text-sky-300 text-xs font-medium">Каталог оборудования</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-light leading-tight mb-4"
        >
          {get("catalog_title", "Наш каталог")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/50 text-base mb-10"
        >
          {get("catalog_subtitle", "Официальные поставки. Гарантия производителя. Монтаж в подарок при покупке.")}
        </motion.p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                active === cat
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 border border-white/10 text-white/60 hover:border-sky-500/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-sky-500/40 transition-colors duration-300 group"
            >
              <div className="relative mb-4">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.brand} ${p.model}`}
                    className="w-full h-40 object-cover rounded-xl border border-white/10"
                  />
                ) : (
                  <div className="w-full h-40 rounded-xl bg-sky-500/10 border border-white/10 flex items-center justify-center">
                    <Icon name="Wind" size={32} className="text-sky-400/40" />
                  </div>
                )}
                {p.badge && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-sky-500/80 backdrop-blur-sm text-white text-xs font-medium">
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <p className="text-sky-400 text-xs font-medium uppercase tracking-wider mb-1">{p.brand}</p>
                <h3 className="text-xl font-semibold">{p.model}</h3>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="text-sm text-white/50">
                  <span className="block text-white/80 font-medium">{p.power}</span>
                  <span className="text-xs">Мощность</span>
                </div>
                <div className="text-sm text-white/50">
                  <span className="block text-white/80 font-medium">{p.area}</span>
                  <span className="text-xs">Площадь</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.features.map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs">{f}</span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-sky-300">{p.price}</span>
                  <span className="text-white/40 text-sm"> ₽</span>
                </div>
                <a
                  href="/contacts"
                  className="px-4 py-2 rounded-full bg-sky-500 text-white text-xs font-medium hover:bg-sky-400 transition-colors"
                >
                  Заказать
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 КлиматПро. Все права защищены.
      </footer>
    </div>
  )
}