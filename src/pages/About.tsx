import { motion } from "framer-motion"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

const values = [
  { icon: "ShieldCheck", title: "Качество", text: "Используем только сертифицированное оборудование от ведущих мировых брендов." },
  { icon: "Clock", title: "Оперативность", text: "Выезд мастера в день обращения. Монтаж под ключ за 1 день." },
  { icon: "Wrench", title: "Профессионализм", text: "Более 10 лет опыта. Каждый специалист имеет сертификаты производителей." },
  { icon: "HeartHandshake", title: "Честность", text: "Фиксированные цены без скрытых доплат. Договор на каждый вид работ." },
]

const team = [
  { name: "Александр Петров", role: "Генеральный директор", exp: "15 лет опыта" },
  { name: "Дмитрий Коваль", role: "Главный инженер", exp: "Сертификат Daikin" },
  { name: "Сергей Михайлов", role: "Монтажник-техник", exp: "500+ установок" },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 mb-6"
        >
          <span className="text-sky-300 text-xs font-medium">О компании</span>
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-4xl md:text-6xl font-light leading-tight mb-6"
        >
          Мы делаем
          <br />
          <span className="font-semibold text-sky-300 italic">климат комфортным</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="text-white/60 max-w-xl text-base leading-relaxed"
        >
          КлиматПро — это команда профессионалов с 10-летним опытом в сфере климатического оборудования.
          Мы помогаем создать идеальный микроклимат в квартирах, домах и офисах.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10+", label: "Лет на рынке" },
            { value: "2 000+", label: "Довольных клиентов" },
            { value: "500+", label: "Установок ежегодно" },
            { value: "5 лет", label: "Гарантия на монтаж" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-sky-300 mb-1">{s.value}</div>
              <div className="text-xs text-white/50">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-light mb-12"
        >
          Наши <span className="text-sky-300 font-semibold">ценности</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4">
                <Icon name={v.icon} fallback="Star" size={20} className="text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-16 pb-24 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-light mb-12"
        >
          Наша <span className="text-sky-300 font-semibold">команда</span>
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-sky-500/40 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center mb-4">
                <Icon name="User" size={28} className="text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-sky-300 text-sm mb-1">{member.role}</p>
              <p className="text-white/40 text-xs">{member.exp}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 КлиматПро. Все права защищены.
      </footer>
    </div>
  )
}