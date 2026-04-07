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

const services = [
  {
    icon: "Package",
    title: "Продажа оборудования",
    desc: "Официальные поставки кондиционеров Daikin, Mitsubishi Electric, Samsung, LG. Широкий выбор моделей для любых задач и бюджетов.",
    items: ["Настенные сплит-системы", "Кассетные и канальные", "Мультизональные системы", "Промышленное оборудование"],
    price: "от 25 000 ₽",
  },
  {
    icon: "Wrench",
    title: "Монтаж и установка",
    desc: "Профессиональный монтаж под ключ за 1 день. Соблюдаем все технические нормы и требования производителя.",
    items: ["Разметка и прокладка трасс", "Установка внешнего блока", "Подключение и пуско-наладка", "Уборка после монтажа"],
    price: "от 5 000 ₽",
  },
  {
    icon: "Settings",
    title: "Сервисное обслуживание",
    desc: "Регулярное техническое обслуживание продлевает срок службы оборудования и обеспечивает его эффективную работу.",
    items: ["Чистка фильтров и теплообменников", "Проверка давления фреона", "Диагностика электроники", "Профилактические работы"],
    price: "от 2 500 ₽",
  },
  {
    icon: "Zap",
    title: "Ремонт кондиционеров",
    desc: "Быстрый ремонт любой сложности. Выезд в день обращения. Работаем со всеми марками и моделями.",
    items: ["Заправка фреоном", "Замена компрессора", "Ремонт платы управления", "Устранение утечек"],
    price: "от 1 500 ₽",
  },
  {
    icon: "Building2",
    title: "Проектирование",
    desc: "Разработка проекта климатизации для офисов, торговых центров, производственных помещений.",
    items: ["Расчёт тепловой нагрузки", "Подбор оборудования", "Схемы монтажа", "Техническая документация"],
    price: "по запросу",
  },
  {
    icon: "BadgeCheck",
    title: "Гарантийное обслуживание",
    desc: "Полное гарантийное сопровождение на весь период гарантии. Оперативное решение любых вопросов.",
    items: ["Гарантия на монтаж 5 лет", "Гарантия на оборудование", "Бесплатный выезд по гарантии", "Замена неисправного блока"],
    price: "Бесплатно",
  },
]

const steps = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку или позвоните — ответим в течение 15 минут." },
  { num: "02", title: "Консультация", desc: "Специалист подберёт оборудование и рассчитает стоимость." },
  { num: "03", title: "Монтаж", desc: "Выезд в удобное время. Установка за 1 рабочий день." },
  { num: "04", title: "Гарантия", desc: "Подписываем договор и выдаём гарантийный талон." },
]

export default function Services() {
  const { get } = useCms("services")
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
              key={s.title}
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
              <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5 mb-5 flex-1">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <Icon name="Check" size={14} className="text-sky-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
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