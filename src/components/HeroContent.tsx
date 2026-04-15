import { motion } from "framer-motion"
import { useCms } from "@/hooks/useCms"

type Stat = { value: string; label: string }

type Props = {
  stats?: Stat[]
}

export default function HeroContent({ stats }: Props) {
  const { get } = useCms("index")
  const title = get("index_hero_title", "Климат под контролем")
  const subtitle = get("index_hero_subtitle", "Продажа, монтаж и сервисное обслуживание кондиционеров. Гарантия на все работы. Выезд в день обращения.")

  const displayStats = stats || [
    { value: "500+", label: "Установок в год" },
    { value: "5 лет", label: "Гарантия на монтаж" },
    { value: "24/7", label: "Сервис и поддержка" },
  ]

  return (
    <main className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-16 pt-24 pb-16 max-w-5xl mx-auto w-full">
      <div className="text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-sm mb-5 border border-sky-400/30"
        >
          <span className="text-sky-300 text-xs font-medium">✦ Официальный дилер Daikin, Mitsubishi, Samsung</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl tracking-tight font-light text-white mb-5 leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm font-light text-white/70 mb-8 leading-relaxed max-w-md"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="/catalog"
            className="px-8 py-3 rounded-full bg-sky-500 text-white font-medium text-sm transition-all duration-200 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/30 cursor-pointer"
          >
            Смотреть каталог
          </a>
          <a
            href="/contacts"
            className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
          >
            Оставить заявку
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-6 mt-10"
        >
          {displayStats.map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="text-2xl font-bold text-sky-300">{stat.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
