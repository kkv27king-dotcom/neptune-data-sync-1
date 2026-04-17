import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"
import { invalidateCmsCache } from "@/hooks/useCms"

const AUTH_URL = "https://functions.poehali.dev/b307c0f1-fb30-48ba-9e94-e82b5b8dac0b"
const CMS_GET_URL = "https://functions.poehali.dev/0c232c8c-e2c7-4ca9-89c9-a79f5ec42794"
const CMS_UPDATE_URL = "https://functions.poehali.dev/d81c4f5f-3817-44ff-9800-d1af4f11fb9d"

const PAGE_LABELS: Record<string, string> = {
  index: "Главная",
  services: "Услуги",
  about: "О компании",
  contacts: "Контакты",
  catalog: "Каталог",
}

const PAGE_GROUPS: Record<string, Array<{ label: string; ids: string[] }>> = {
  index: [
    { label: "Главный экран", ids: ["index_hero_title", "index_hero_subtitle", "index_hero_image", "index_hero_video"] },
    { label: "Статистика (цифры)", ids: ["index_stat1_value", "index_stat1_label", "index_stat2_value", "index_stat2_label", "index_stat3_value", "index_stat3_label"] },
    { label: "Преимущества", ids: ["index_adv1_title", "index_adv1_desc", "index_adv2_title", "index_adv2_desc", "index_adv3_title", "index_adv3_desc", "index_adv4_title", "index_adv4_desc"] },
    { label: "Блок «Что мы делаем»", ids: ["index_services_title", "index_serv1_title", "index_serv1_desc", "index_serv2_title", "index_serv2_desc", "index_serv3_title", "index_serv3_desc"] },
    { label: "CTA-баннер", ids: ["index_cta_title", "index_cta_desc"] },
  ],
  services: [
    { label: "Заголовок страницы", ids: ["services_title", "services_subtitle", "services_video"] },
    { label: "Услуга 1", ids: ["services_s1_title", "services_s1_desc", "services_s1_price"] },
    { label: "Услуга 2", ids: ["services_s2_title", "services_s2_desc", "services_s2_price"] },
    { label: "Услуга 3", ids: ["services_s3_title", "services_s3_desc", "services_s3_price"] },
    { label: "Услуга 4", ids: ["services_s4_title", "services_s4_desc", "services_s4_price"] },
    { label: "Услуга 5", ids: ["services_s5_title", "services_s5_desc", "services_s5_price"] },
    { label: "Услуга 6", ids: ["services_s6_title", "services_s6_desc", "services_s6_price"] },
    { label: "Шаги работы", ids: ["services_step1_title", "services_step1_desc", "services_step2_title", "services_step2_desc", "services_step3_title", "services_step3_desc", "services_step4_title", "services_step4_desc"] },
  ],
  about: [
    { label: "Заголовок страницы", ids: ["about_title", "about_desc", "about_image", "about_video"] },
    { label: "Статистика (цифры)", ids: ["about_stat1_value", "about_stat1_label", "about_stat2_value", "about_stat2_label", "about_stat3_value", "about_stat3_label", "about_stat4_value", "about_stat4_label"] },
    { label: "Сотрудник 1", ids: ["about_team1_name", "about_team1_role", "about_team1_exp", "about_team1_photo"] },
    { label: "Сотрудник 2", ids: ["about_team2_name", "about_team2_role", "about_team2_exp", "about_team2_photo"] },
    { label: "Сотрудник 3", ids: ["about_team3_name", "about_team3_role", "about_team3_exp", "about_team3_photo"] },
  ],
  contacts: [
    { label: "Контактные данные", ids: ["contacts_phone", "contacts_phone_sub", "contacts_email", "contacts_email_sub", "contacts_address", "contacts_address_sub", "contacts_worktime", "contacts_worktime_sub"] },
  ],
  catalog: [
    { label: "Заголовок страницы", ids: ["catalog_title", "catalog_subtitle"] },
    { label: "Товар 1", ids: ["catalog_p1_image", "catalog_p1_brand", "catalog_p1_model", "catalog_p1_power", "catalog_p1_area", "catalog_p1_price", "catalog_p1_badge"] },
    { label: "Товар 2", ids: ["catalog_p2_image", "catalog_p2_brand", "catalog_p2_model", "catalog_p2_power", "catalog_p2_area", "catalog_p2_price", "catalog_p2_badge"] },
    { label: "Товар 3", ids: ["catalog_p3_image", "catalog_p3_brand", "catalog_p3_model", "catalog_p3_power", "catalog_p3_area", "catalog_p3_price", "catalog_p3_badge"] },
    { label: "Товар 4", ids: ["catalog_p4_image", "catalog_p4_brand", "catalog_p4_model", "catalog_p4_power", "catalog_p4_area", "catalog_p4_price", "catalog_p4_badge"] },
    { label: "Товар 5", ids: ["catalog_p5_image", "catalog_p5_brand", "catalog_p5_model", "catalog_p5_power", "catalog_p5_area", "catalog_p5_price", "catalog_p5_badge"] },
    { label: "Товар 6", ids: ["catalog_p6_image", "catalog_p6_brand", "catalog_p6_model", "catalog_p6_power", "catalog_p6_area", "catalog_p6_price", "catalog_p6_badge"] },
  ],
}

const FIELD_LABELS: Record<string, string> = {
  hero_title: "Заголовок", hero_subtitle: "Подзаголовок", hero_image: "Фото баннера", hero_desc: "Описание",
  phone: "Телефон", phone_sub: "Подпись под телефоном", address: "Адрес", address_sub: "Подпись под адресом",
  email: "Email", email_sub: "Подпись под email", worktime: "Режим работы", worktime_sub: "Подпись",
  stat1_value: "Цифра 1", stat1_label: "Подпись 1", stat2_value: "Цифра 2", stat2_label: "Подпись 2",
  stat3_value: "Цифра 3", stat3_label: "Подпись 3", stat4_value: "Цифра 4", stat4_label: "Подпись 4",
  adv1_title: "Преим. 1 — заголовок", adv1_desc: "Преим. 1 — текст",
  adv2_title: "Преим. 2 — заголовок", adv2_desc: "Преим. 2 — текст",
  adv3_title: "Преим. 3 — заголовок", adv3_desc: "Преим. 3 — текст",
  adv4_title: "Преим. 4 — заголовок", adv4_desc: "Преим. 4 — текст",
  cta_title: "CTA — заголовок", cta_desc: "CTA — текст",
  services_title: "Заголовок блока",
  serv1_title: "Сервис 1 — название", serv1_desc: "Сервис 1 — описание",
  serv2_title: "Сервис 2 — название", serv2_desc: "Сервис 2 — описание",
  serv3_title: "Сервис 3 — название", serv3_desc: "Сервис 3 — описание",
  s1_title: "Название", s1_desc: "Описание", s1_price: "Цена",
  s2_title: "Название", s2_desc: "Описание", s2_price: "Цена",
  s3_title: "Название", s3_desc: "Описание", s3_price: "Цена",
  s4_title: "Название", s4_desc: "Описание", s4_price: "Цена",
  s5_title: "Название", s5_desc: "Описание", s5_price: "Цена",
  s6_title: "Название", s6_desc: "Описание", s6_price: "Цена",
  step1_title: "Шаг 1 — название", step1_desc: "Шаг 1 — текст",
  step2_title: "Шаг 2 — название", step2_desc: "Шаг 2 — текст",
  step3_title: "Шаг 3 — название", step3_desc: "Шаг 3 — текст",
  step4_title: "Шаг 4 — название", step4_desc: "Шаг 4 — текст",
  team1_name: "Имя", team1_role: "Должность", team1_exp: "Опыт", team1_photo: "Фото",
  team2_name: "Имя", team2_role: "Должность", team2_exp: "Опыт", team2_photo: "Фото",
  team3_name: "Имя", team3_role: "Должность", team3_exp: "Опыт", team3_photo: "Фото",
  p1_image: "Фото товара", p1_brand: "Бренд", p1_model: "Модель", p1_power: "Мощность", p1_area: "Площадь", p1_price: "Цена (₽)", p1_badge: "Метка",
  p2_image: "Фото товара", p2_brand: "Бренд", p2_model: "Модель", p2_power: "Мощность", p2_area: "Площадь", p2_price: "Цена (₽)", p2_badge: "Метка",
  p3_image: "Фото товара", p3_brand: "Бренд", p3_model: "Модель", p3_power: "Мощность", p3_area: "Площадь", p3_price: "Цена (₽)", p3_badge: "Метка",
  p4_image: "Фото товара", p4_brand: "Бренд", p4_model: "Модель", p4_power: "Мощность", p4_area: "Площадь", p4_price: "Цена (₽)", p4_badge: "Метка",
  p5_image: "Фото товара", p5_brand: "Бренд", p5_model: "Модель", p5_power: "Мощность", p5_area: "Площадь", p5_price: "Цена (₽)", p5_badge: "Метка",
  p6_image: "Фото товара", p6_brand: "Бренд", p6_model: "Модель", p6_power: "Мощность", p6_area: "Площадь", p6_price: "Цена (₽)", p6_badge: "Метка",
  hero_video: "Видео (фоновое)",
  about_video: "Видео о компании",
  services_video: "Видео об услугах",
}

function getFieldLabel(id: string): string {
  const parts = id.split("_")
  const section = parts.slice(1).join("_")
  return FIELD_LABELS[section] || section
}

type ContentItem = { section: string; type: string; value: string }
type ContentMap = Record<string, ContentItem>

export default function Admin() {
  const [token, setToken] = useState<string>(() => localStorage.getItem("admin_token") || "")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const [content, setContent] = useState<ContentMap>({})
  const [edits, setEdits] = useState<ContentMap>({})
  const [activePage, setActivePage] = useState("index")
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    if (token) loadContent()
  }, [token])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError("")
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token)
        setToken(data.token)
      } else {
        setLoginError("Неверный пароль")
      }
    } catch {
      setLoginError("Ошибка соединения")
    } finally {
      setLoginLoading(false)
    }
  }

  async function logout() {
    await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout", token }),
    })
    localStorage.removeItem("admin_token")
    setToken("")
    setContent({})
    setEdits({})
  }

  async function loadContent() {
    setLoading(true)
    try {
      const res = await fetch(CMS_GET_URL)
      const data = await res.json()
      if (data.content) {
        setContent(data.content)
        setEdits(JSON.parse(JSON.stringify(data.content)))
      }
    } finally {
      setLoading(false)
    }
  }

  async function save() {
    setSaving(true)
    setSaveMsg("")
    const updates: Record<string, { value: string; type: string }> = {}
    for (const [id, item] of Object.entries(edits)) {
      if (item.value !== content[id]?.value) {
        updates[id] = { value: item.value, type: item.type }
      }
    }
    if (Object.keys(updates).length === 0) {
      setSaveMsg("Нет изменений")
      setSaving(false)
      return
    }
    try {
      const res = await fetch(CMS_UPDATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ updates }),
      })
      if (res.ok) {
        setSaveMsg("Сохранено!")
        invalidateCmsCache()
        await loadContent()
      } else if (res.status === 401) {
        localStorage.removeItem("admin_token")
        setToken("")
      } else {
        setSaveMsg("Ошибка сохранения")
      }
    } catch {
      setSaveMsg("Ошибка соединения")
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(""), 3000)
    }
  }

  function handleMediaChange(id: string, file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setEdits((prev) => ({ ...prev, [id]: { ...prev[id], value: dataUrl } }))
    }
    reader.readAsDataURL(file)
  }

  function updateField(id: string, value: string) {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], value } }))
  }

  const groups = PAGE_GROUPS[activePage] || []

  if (!token) {
    return (
      <div className="min-h-screen bg-[#020c1b] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={28} className="text-sky-400" />
            </div>
            <h1 className="text-2xl font-semibold text-white">Панель управления</h1>
            <p className="text-white/40 text-sm mt-1">КлиматПро</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors"
                autoFocus
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
            >
              {loginLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#020c1b] z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-sky-400" />
          </div>
          <span className="font-semibold">Панель управления</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <Icon name="ExternalLink" size={14} />
            Сайт
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-65px)]">
        <div className="w-48 border-r border-white/10 p-4 space-y-1 flex-shrink-0 sticky top-[65px] self-start h-[calc(100vh-65px)] overflow-y-auto">
          {Object.entries(PAGE_LABELS).map(([page, label]) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activePage === page ? "bg-sky-500/20 text-sky-300" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{PAGE_LABELS[activePage]}</h2>
            <div className="flex items-center gap-3">
              {saveMsg && (
                <span className={`text-sm ${saveMsg === "Сохранено!" ? "text-green-400" : "text-yellow-400"}`}>
                  {saveMsg}
                </span>
              )}
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
              >
                <Icon name="Save" size={14} />
                {saving ? "Сохраняю..." : "Сохранить"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-white/40 text-sm">Загружаю...</div>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.label} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{group.label}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {group.ids.map((id) => {
                      const item = edits[id]
                      if (!item) return null
                      const label = getFieldLabel(id)
                      const isTextarea = id.includes("desc") || id.includes("subtitle") || id.includes("_sub")
                      const isImage = item.type === "image"
                      const isVideo = item.type === "video"

                      return (
                        <div key={id}>
                          <label className="block text-xs text-white/50 mb-1">{label}</label>

                          {isImage ? (
                            <div className="space-y-2">
                              {item.value && (
                                <img src={item.value} alt="" className="w-full max-h-36 object-cover rounded-lg border border-white/10" />
                              )}
                              <div
                                onClick={() => fileRefs.current[id]?.click()}
                                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border-2 border-dashed border-white/20 text-white/40 text-sm hover:border-sky-500/50 hover:text-sky-400 cursor-pointer transition-colors"
                              >
                                <Icon name="ImagePlus" size={14} />
                                {item.value ? "Заменить фото" : "Загрузить фото"}
                              </div>
                              <input
                                ref={(el) => { fileRefs.current[id] = el }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleMediaChange(id, file)
                                }}
                              />
                            </div>

                          ) : isVideo ? (
                            <div className="space-y-2">
                              {item.value && (
                                <video
                                  src={item.value}
                                  controls
                                  className="w-full max-h-40 rounded-lg border border-white/10 bg-black"
                                />
                              )}
                              <div
                                onClick={() => fileRefs.current[id]?.click()}
                                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border-2 border-dashed border-white/20 text-white/40 text-sm hover:border-purple-500/50 hover:text-purple-400 cursor-pointer transition-colors"
                              >
                                <Icon name="Video" size={14} />
                                {item.value ? "Заменить видео" : "Загрузить видео"}
                              </div>
                              {item.value && (
                                <button
                                  onClick={() => updateField(id, "")}
                                  className="flex items-center gap-1 text-xs text-red-400/70 hover:text-red-400 transition-colors"
                                >
                                  <Icon name="Trash2" size={12} />
                                  Удалить видео
                                </button>
                              )}
                              <input
                                ref={(el) => { fileRefs.current[id] = el }}
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleMediaChange(id, file)
                                }}
                              />
                              <p className="text-xs text-white/30">Форматы: MP4, WebM, MOV. Рекомендуется до 50 МБ.</p>
                            </div>

                          ) : isTextarea ? (
                            <textarea
                              value={item.value}
                              onChange={(e) => updateField(id, e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => updateField(id, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 transition-colors text-sm"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}