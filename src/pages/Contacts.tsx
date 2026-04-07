import { useState } from "react"
import { motion } from "framer-motion"
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

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <Header />

      <section className="pt-32 pb-16 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 mb-6"
        >
          <span className="text-sky-300 text-xs font-medium">Контакты</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-light leading-tight mb-4"
        >
          Свяжитесь
          <br />
          <span className="font-semibold text-sky-300 italic">с нами</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-white/50 text-base mb-12"
        >
          Ответим в течение 15 минут. Выезд замерщика бесплатно.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">Оставить заявку</h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={32} className="text-sky-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Заявка отправлена!</h3>
                  <p className="text-white/50 text-sm">Мы свяжемся с вами в течение 15 минут.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Сообщение</label>
                    <textarea
                      placeholder="Опишите вашу задачу..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-400 transition-colors duration-200"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (800) 123-45-67", sub: "Звонок бесплатный" },
              { icon: "Mail", title: "Email", value: "info@klimatpro.ru", sub: "Отвечаем в течение часа" },
              { icon: "MapPin", title: "Адрес", value: "г. Москва, ул. Примерная, 42", sub: "Пн–Пт: 9:00–20:00" },
              { icon: "Clock", title: "Режим работы", value: "Пн–Вс: 8:00–22:00", sub: "Сервис 24/7" },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial="hidden"
                animate="visible"
                custom={i + 2}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sky-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} fallback="Star" size={18} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{c.title}</p>
                  <p className="text-white font-medium">{c.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 КлиматПро. Все права защищены.
      </footer>
    </div>
  )
}
