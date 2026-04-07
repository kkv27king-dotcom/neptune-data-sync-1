import { motion } from "framer-motion"
import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
}

const advantages = [
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "На все виды монтажных работ" },
  { icon: "Clock", title: "Выезд в день заявки", desc: "Работаем без выходных" },
  { icon: "BadgeCheck", title: "Официальный дилер", desc: "Daikin, Mitsubishi, Samsung" },
  { icon: "Wrench", title: "Монтаж за 1 день", desc: "Опытная команда мастеров" },
]

const topServices = [
  {
    icon: "Package",
    title: "Продажа",
    desc: "Широкий ассортимент кондиционеров по ценам от производителя.",
    href: "/catalog",
  },
  {
    icon: "Wrench",
    title: "Монтаж",
    desc: "Профессиональная установка под ключ. Порядок — наш приоритет.",
    href: "/services",
  },
  {
    icon: "Settings",
    title: "Обслуживание",
    desc: "Чистка, заправка, диагностика. Продлим жизнь вашего оборудования.",
    href: "/services",
  },
]

const Index = () => {
  return (
    <div className="bg-[#020c1b]">
      {/* Hero */}
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>

      {/* Advantages */}
      <section className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sky-500/40 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
                <Icon name={a.icon} fallback="Star" size={20} className="text-sky-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{a.title}</h3>
              <p className="text-white/40 text-xs">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-light text-white mb-3"
        >
          Что мы <span className="font-semibold text-sky-300 italic">делаем</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="text-white/40 text-sm mb-10"
        >
          Полный цикл работ с климатическим оборудованием
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-6">
          {topServices.map((s, i) => (
            <motion.a
              key={s.title}
              href={s.href}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4 group-hover:bg-sky-500/30 transition-colors">
                <Icon name={s.icon} fallback="Star" size={22} className="text-sky-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center gap-1 text-sky-400 text-xs font-medium">
                Подробнее
                <Icon name="ArrowRight" size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 md:px-16 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600/30 to-sky-900/30 border border-sky-500/20 p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-sky-500/5 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
            Получите <span className="font-semibold text-sky-300">бесплатный расчёт</span>
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            Оставьте заявку — специалист подберёт оборудование и рассчитает стоимость монтажа.
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-400 transition-colors duration-200 text-sm"
          >
            <Icon name="MessageCircle" size={16} />
            Оставить заявку
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 КлиматПро. Все права защищены.
      </footer>
    </div>
  )
}

export default Index
