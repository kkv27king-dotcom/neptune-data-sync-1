import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"
import { useCms } from "@/hooks/useCms"

const PRODUCT_CATEGORIES = [
  "Настенные", "Настенные", "Настенные", "Кассетные", "Канальные", "Мульти-сплит",
  "Настенные", "Настенные", "Кассетные", "Кассетные", "Канальные", "Канальные",
  "Мульти-сплит", "Мульти-сплит", "Настенные", "Настенные", "Кассетные", "Кассетные",
  "Канальные", "Канальные", "Мульти-сплит", "Настенные", "Настенные", "Кассетные",
  "Канальные", "Мульти-сплит", "Настенные", "Кассетные", "Канальные", "Мульти-сплит",
]

const PRODUCT_FEATURES = [
  ["Инвертор", "Wi-Fi", "A++"],
  ["Инвертор", "Quiet Mode", "A+++"],
  ["Инвертор", "Wi-Fi", "A+"],
  ["4-х поточный", "Инвертор", "A++"],
  ["Скрытый монтаж", "Инвертор", "A+"],
  ["3 внутр. блока", "Инвертор", "A++"],
  ["Инвертор", "Wi-Fi", "A++"],
  ["Инвертор", "Turbo", "A+"],
  ["4-х поточный", "Wi-Fi", "A++"],
  ["Инвертор", "Auto-clean", "A+++"],
  ["Скрытый монтаж", "Wi-Fi", "A++"],
  ["Канальный", "Инвертор", "A+"],
  ["4 внутр. блока", "Инвертор", "A++"],
  ["3 внутр. блока", "Wi-Fi", "A+"],
  ["Инвертор", "Plasma", "A++"],
  ["Инвертор", "Wi-Fi", "A+"],
  ["4-х поточный", "Инвертор", "A++"],
  ["Кассетный", "Auto-clean", "A+"],
  ["Канальный", "Wi-Fi", "A++"],
  ["Инвертор", "Quiet Mode", "A+"],
  ["5 внутр. блоков", "Wi-Fi", "A++"],
  ["Инвертор", "A+++", "Wi-Fi"],
  ["Инвертор", "Turbo", "A++"],
  ["4-х поточный", "Auto-clean", "A+"],
  ["Скрытый монтаж", "Инвертор", "A++"],
  ["3 внутр. блока", "Wi-Fi", "A+"],
  ["Инвертор", "Plasma", "A++"],
  ["Кассетный", "Wi-Fi", "A+"],
  ["Канальный", "Инвертор", "A++"],
  ["4 внутр. блока", "Инвертор", "A+"],
]

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { get } = useCms("catalog")

  const n = Number(id)
  if (!n || n < 1 || n > 30) {
    return (
      <div className="min-h-screen bg-[#020c1b] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">Товар не найден</p>
        <button onClick={() => navigate("/catalog")} className="text-sky-400 underline">
          Вернуться в каталог
        </button>
      </div>
    )
  }

  const brand = get(`catalog_p${n}_brand`, "")
  const model = get(`catalog_p${n}_model`, `Товар ${n}`)
  const power = get(`catalog_p${n}_power`, "")
  const area = get(`catalog_p${n}_area`, "")
  const price = get(`catalog_p${n}_price`, "")
  const badge = get(`catalog_p${n}_badge`, "")
  const image = get(`catalog_p${n}_image`, "")
  const desc = get(`catalog_p${n}_desc`, "")
  const category = PRODUCT_CATEGORIES[n - 1]
  const features = PRODUCT_FEATURES[n - 1]

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <Header />

      <div className="pt-28 pb-16 px-6 md:px-16 max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/catalog")}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад в каталог
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {image ? (
              <img
                src={image}
                alt={`${brand} ${model}`}
                className="w-full rounded-2xl border border-white/10 object-cover aspect-square"
              />
            ) : (
              <div className="w-full aspect-square rounded-2xl bg-sky-500/10 border border-white/10 flex items-center justify-center">
                <Icon name="Wind" size={64} className="text-sky-400/30" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {category}
              </span>
              {badge && (
                <span className="text-xs px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300">
                  {badge}
                </span>
              )}
            </div>

            {brand && (
              <p className="text-sky-400 text-sm font-medium uppercase tracking-wider mb-1">{brand}</p>
            )}
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">{model}</h1>

            {desc && (
              <p className="text-white/60 text-sm leading-relaxed mb-6">{desc}</p>
            )}

            {/* Specs */}
            {(power || area) && (
              <div className="flex gap-6 mb-6">
                {power && (
                  <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                    <span className="block text-xl font-bold text-white">{power}</span>
                    <span className="text-xs text-white/40">Мощность</span>
                  </div>
                )}
                {area && (
                  <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                    <span className="block text-xl font-bold text-white">{area}</span>
                    <span className="text-xs text-white/40">Площадь</span>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {features.map((f) => (
                <span key={f} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm">
                  {f}
                </span>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="mt-auto">
              {price && (
                <div className="mb-5">
                  <span className="text-4xl font-bold text-sky-300">{price}</span>
                  <span className="text-white/40 text-lg"> ₽</span>
                </div>
              )}
              <div className="flex gap-3 flex-wrap">
                <a
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-400 transition-colors"
                >
                  <Icon name="ShoppingCart" size={16} />
                  Заказать
                </a>
                <a
                  href="tel:+79249358388"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:border-sky-500/50 transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  Позвонить
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 КлиматПро. Все права защищены.
      </footer>
    </div>
  )
}
