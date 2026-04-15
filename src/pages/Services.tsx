import { motion } from "framer-motion"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"
import { useCms } from "@/hooks/useCms"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
}

const SERVICE_ICONS = ["Package", "Wrench", "Settings", "Zap", "Building2", "BadgeCheck"]

export default function Services() {
  const { get } = useCms("services")

  const services = [
    { icon: SERVICE_ICONS[0], title: get("services_s1_title", "Продажа оборудования"), desc: get("services_s1_desc", ""), price: get("services_s1_price", "от 25 000 ₽") },
    { icon: SERVICE_ICONS[1], title: get("services_s2_title", "Монтаж и установка"), desc: get("services_s2_desc", ""), price: get("services_s2_price", "от 5 000 ₽") },
    { icon: SERVICE_ICONS[2], title: get("services_s3_title", "Сервисное обслуживание"), desc: get("services_s3_desc", ""), price: get("services_s3_price", "от 2 500 ₽") },
    { icon: SERVICE_ICONS[3], title: get("services_s4_title", "Ремонт кондиционеров"), desc: get("services_s4_desc", ""), price: get("services_s4_price", "от 1 500 ₽") },
    { icon: SERVICE_ICONS[4], title: get("services_s5_title", "Проектирование"), desc: get("services_s5_desc", ""), price: get("services_s5_price", "по запросу") },
    { icon: SERVICE_ICONS[5], title: get("services_s6_title", "Гарантийное обслуживание"), desc: get("services_s6_desc", ""), price: get("services_s6_price", "Бесплатно") },
  ]

  const steps = [
    { num: "01", title: get("services_step1_title", "Заявка"), desc: get("services_step1_desc", "Оставьте заявку или позвоните — ответим в течение 15 минут.") },
    { num: "02", title: get("services_step2_title", "Консультация"), desc: get("services_step2_desc", "Специалист подберёт оборудование и рассчитает стоимость.") },
    { num: "03", title: get("services_step3_title", "Монтаж"), desc: get("services_step3_desc", "Выезд в удобное время. Установка за 1 рабочий день.") },
    { num: "04", title: get("services_step4_title", "Гарантия"), desc: get("services_step4_desc", "Подписываем договор и выдаём гарантийный талон.") },
  ]

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 mb-6"
        >
          <span className="text-sky-300 text-xs font-medium">Наши услуги</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-light leading-tight mb-4"
        >
          {get("services_title", "Всё что нужно")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-white/50 text-base max-w-lg"
        >
          {get("services_subtitle", "Полный цикл: от подбора оборудования до регулярного обслуживания. Один подрядчик — ноль забот.")}
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-sky-500/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4">
                <Icon name={s.icon} fallback="Star" size={22} className="text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-sky-300 font-semibold">{s.price}</span>
                <a
                  href="/contacts"
                  className="px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-medium hover:bg-sky-500 hover:text-white transition-colors"
                >
                  Заказать
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="pb-24 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-light mb-12 text-center"
        >
          Как мы <span className="text-sky-300 font-semibold">работаем</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-5xl font-bold text-sky-500/30 mb-3">{step.num}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
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
