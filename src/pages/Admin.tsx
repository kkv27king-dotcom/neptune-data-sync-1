import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const AUTH_URL = "https://functions.poehali.dev/b307c0f1-fb30-48ba-9e94-e82b5b8dac0b"
const CMS_GET_URL = "https://functions.poehali.dev/0c232c8c-e2c7-4ca9-89c9-a79f5ec42794"
const CMS_UPDATE_URL = "https://functions.poehali.dev/d81c4f5f-3817-44ff-9800-d1af4f11fb9d"

const PAGE_LABELS: Record<string, string> = {
  index: "Главная",
  services: "Услуги",
  about: "О компании",
  contacts: "Контакты",
}

const SECTION_LABELS: Record<string, string> = {
  hero_title: "Заголовок",
  hero_subtitle: "Подзаголовок",
  hero_image: "Фото / баннер",
  phone: "Телефон",
  address: "Адрес",
  email: "Email",
}

type ContentItem = {
  section: string
  type: string
  value: string
}

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

  function handleImageChange(id: string, file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setEdits((prev) => ({
        ...prev,
        [id]: { ...prev[id], value: dataUrl },
      }))
    }
    reader.readAsDataURL(file)
  }

  const pageContent = Object.entries(edits).filter(([id]) => {
    const item = content[id]
    if (!item) return false
    // page field is stored in content (from cms-get we only get section/type/value)
    // use id prefix convention: {page}_{section}
    const parts = id.split("_")
    return parts[0] === activePage
  })

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
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-sky-400" />
          </div>
          <span className="font-semibold">Панель управления</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
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
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 p-4 space-y-1 flex-shrink-0">
          {Object.entries(PAGE_LABELS).map(([page, label]) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activePage === page
                  ? "bg-sky-500/20 text-sky-300"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
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
            <div className="space-y-5">
              {pageContent.length === 0 && (
                <p className="text-white/30 text-sm">Нет редактируемых элементов для этой страницы.</p>
              )}
              {pageContent.map(([id, item]) => (
                <div key={id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    {SECTION_LABELS[item.section] || item.section}
                  </label>

                  {item.type === "image" ? (
                    <div className="space-y-3">
                      {item.value && (
                        <img
                          src={item.value}
                          alt=""
                          className="w-full max-h-48 object-cover rounded-lg border border-white/10"
                        />
                      )}
                      <div
                        onClick={() => fileRefs.current[id]?.click()}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-dashed border-white/20 text-white/40 text-sm hover:border-sky-500/50 hover:text-sky-400 cursor-pointer transition-colors"
                      >
                        <Icon name="Upload" size={16} />
                        {item.value ? "Заменить фото" : "Загрузить фото"}
                      </div>
                      <input
                        ref={(el) => { fileRefs.current[id] = el }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageChange(id, file)
                        }}
                      />
                    </div>
                  ) : item.section.includes("subtitle") || item.section.includes("desc") ? (
                    <textarea
                      value={item.value}
                      onChange={(e) =>
                        setEdits((prev) => ({
                          ...prev,
                          [id]: { ...prev[id], value: e.target.value },
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) =>
                        setEdits((prev) => ({
                          ...prev,
                          [id]: { ...prev[id], value: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}