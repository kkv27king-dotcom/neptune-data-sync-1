import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const categories = ["Все", "Настенные", "Кассетные", "Канальные", "Мульти-сплит"]

const products = [
  {
    id: 1,
    category: "Настенные",
    brand: "Daikin",
    model: "FTXB25C",
    power: "2.5 кВт",
    area: "до 25 м²",
    price: "42 000",
    badge: "Хит",
    features: ["Инвертор", "Wi-Fi", "A++"],
  },
  {
    id: 2,
    category: "Настенные",
    brand: "Mitsubishi",
    model: "MSZ-LN25VG",
    power: "2.5 кВт",
    area: "до 25 м²",
    price: "56 000",
    badge: "Премиум",
    features: ["Инвертор", "Quiet Mode", "A+++"],
  },
  {
    id: 3,
    category: "Настенные",
    brand: "Samsung",
    model: "AR09TXHQASI",
    power: "2.6 кВт",
    area: "до 26 м²",
    price: "35 000",
    badge: "",
    features: ["Инвертор", "Wi-Fi", "A+"],
  },
  {
    id: 4,
    category: "Кассетные",
    brand: "Daikin",
    model: "FCAG60A",
    power: "6.0 кВт",
    area: "до 55 м²",
    price: "95 000",
    badge: "Для офиса",
    features: ["4-х поточный", "Инвертор", "A++"],
  },
  {
    id: 5,
    category: "Канальные",
    brand: "Mitsubishi",
    model: "SEZ-M50DA",
    power: "5.0 кВт",
    area: "до 50 м²",
    price: "85 000",
    badge: "",
    features: ["Скрытый монтаж", "Инвертор", "A+"],
  },
  {
    id: 6,
    category: "Мульти-сплит",
    brand: "Daikin",
    model: "3MXM68A",
    power: "6.8 кВт",
    area: "3 комнаты",
    price: "120 000",
    badge: "Новинка",
    features: ["3 внутр. блока", "Инвертор", "A++"],
  },
]

export default function Catalog() {
  const [active, setActive] = useState("Все")

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
          Наш <span className="font-semibold text-sky-300 italic">каталог</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/50 text-base mb-10"
        >
          Официальные поставки. Гарантия производителя. Монтаж в подарок при покупке.
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
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <Icon name="Wind" size={24} className="text-sky-400" />
                </div>
                {p.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-300 text-xs font-medium border border-sky-500/30">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
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

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.features.map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs">{f}</span>
                ))}
              </div>

              {/* Price + CTA */}
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
