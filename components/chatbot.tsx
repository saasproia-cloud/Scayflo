"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  X,
  Send,
  Settings,
  Check,
  Bot,
  User,
  Sparkles,
} from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "Francais", flag: "FR" },
  { code: "es", name: "Espanol", flag: "ES" },
  { code: "de", name: "Deutsch", flag: "DE" },
  { code: "pt", name: "Portugues", flag: "PT" },
]

const themeColors = [
  { name: "Green", value: "primary", class: "bg-primary" },
  { name: "Blue", value: "chart-2", class: "bg-chart-2" },
  { name: "Orange", value: "chart-5", class: "bg-chart-5" },
  { name: "Purple", value: "chart-4", class: "bg-chart-4" },
]

const welcomeMessages: Record<string, string> = {
  en: "Hello! Welcome to Scayflo. I'm your AI assistant. How can I help you today?",
  fr: "Bonjour! Bienvenue sur Scayflo. Je suis votre assistant IA. Comment puis-je vous aider?",
  es: "Hola! Bienvenido a Scayflo. Soy tu asistente de IA. ¿En que puedo ayudarte?",
  de: "Hallo! Willkommen bei Scayflo. Ich bin Ihr KI-Assistent. Wie kann ich Ihnen helfen?",
  pt: "Ola! Bem-vindo ao Scayflo. Sou seu assistente de IA. Como posso ajuda-lo?",
}

const quickReplies: Record<string, string[]> = {
  en: ["How do I create an audit?", "Explain the dashboard", "Explain metrics", "What's included in Premium?", "How to export PDF?"],
  fr: ["Comment creer un audit?", "Expliquer le dashboard", "Expliquer les metriques", "Qu'est-ce qui est inclus dans Premium?", "Comment exporter en PDF?"],
  es: ["¿Como creo una auditoria?", "Explicar el dashboard", "Explicar metricas", "¿Que incluye Premium?", "¿Como exportar PDF?"],
  de: ["Wie erstelle ich ein Audit?", "Dashboard erklaren", "Metriken erklaren", "Was ist in Premium enthalten?", "Wie exportiere ich PDF?"],
  pt: ["Como criar uma auditoria?", "Explicar o dashboard", "Explicar metricas", "O que esta incluido no Premium?", "Como exportar PDF?"],
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const botResponses: Record<string, Record<string, string>> = {
  en: {
    audit: "To create an audit, go to your Dashboard and click 'New Audit'. You can then select a client, connect their data sources, and our AI will automatically generate insights and recommendations.",
    premium: "Premium includes: unlimited clients, all data sources, advanced AI recommendations, custom branding, smart alerts, secure client sharing, and 24/7 priority support. It's $X/month.",
    pdf: "To export a PDF, open any client dashboard and click the 'Export PDF' button in the top right. You can customize the branding, select which sections to include, and generate a professional report in seconds.",
    sources: "We support Google Analytics 4, Search Console, Google Ads, Google Sheets, and CSV imports. Facebook Ads and LinkedIn Ads integrations are coming soon!",
    dashboard: "Your dashboard shows KPIs (traffic, conversion rate, SEO position, social engagement), traffic & conversions charts, traffic sources, SEO rankings, and social media metrics. Select a client in the sidebar to view their data. Use 'New Audit' to edit KPIs.",
    dashboardAdvanced: "Premium insight: You can add date range filters and compare periods for ROI-style analysis. Traffic and conversions are linked to your data sources; Revenue and Costs metrics are available in Premium for full ROI calculation.",
    metrics: "The main metrics are: Monthly Traffic (visitors), Conversion Rate, Avg. SEO Position, and Social Engagement. Each has a value and change vs. last month. Traffic & Conversions chart shows visitors and conversions over time; Traffic Sources is a breakdown by channel (Organic, Direct, Referral, Social).",
    metricsAdvanced: "Premium: You get Leads, Revenue, Costs, and Custom KPIs with date range and comparison. ROI is calculated as (Revenue - Costs) / Costs. All metrics can be compared across two periods for trend analysis.",
    default: "I'd be happy to help! You can ask me about creating audits, our features, pricing plans, dashboards, metrics, or how to use specific tools. What would you like to know?",
  },
  fr: {
    audit: "Pour creer un audit, allez dans votre Dashboard et cliquez sur 'Nouvel audit'. Vous pouvez ensuite selectionner un client, connecter ses sources de donnees, et notre IA generera automatiquement des insights.",
    premium: "Premium inclut: clients illimites, toutes les sources de donnees, recommandations IA avancees, branding personnalise, alertes intelligentes, et support prioritaire 24/7. C'est $X/mois.",
    pdf: "Pour exporter un PDF, ouvrez n'importe quel dashboard client et cliquez sur 'Export PDF' en haut a droite. Vous pouvez personnaliser le branding et generer un rapport professionnel en quelques secondes.",
    sources: "Nous supportons Google Analytics 4, Search Console, Google Ads, Google Sheets et les imports CSV. Les integrations Facebook Ads et LinkedIn Ads arrivent bientot!",
    dashboard: "Le dashboard affiche les KPIs (trafic, taux de conversion, position SEO, engagement social), les graphiques trafic et conversions, les sources de trafic, les positions SEO et les reseaux sociaux. Selectionnez un client dans la barre laterale.",
    dashboardAdvanced: "Premium: filtres par periode et comparaison pour analyser le ROI. Les metriques Revenus et Couts sont disponibles pour un calcul ROI complet.",
    metrics: "Les metriques principales: Trafic mensuel, Taux de conversion, Position SEO moyenne, Engagement social. Le graphique Trafic et conversions affiche les visiteurs et conversions dans le temps; Sources de trafic repartit par canal.",
    metricsAdvanced: "Premium: metriques Leads, Revenus, Couts et KPIs personnalises avec plage de dates et comparaison. ROI = (Revenus - Couts) / Couts.",
    default: "Je serais ravi de vous aider! Posez-moi des questions sur les audits, le dashboard, les metriques, les tarifs ou l'utilisation des outils.",
  },
  es: {
    audit: "Para crear una auditoria, ve a tu Dashboard y haz clic en 'Nueva auditoria'. Luego puedes seleccionar un cliente, conectar sus fuentes de datos, y nuestra IA generara automaticamente insights.",
    premium: "Premium incluye: clientes ilimitados, todas las fuentes de datos, recomendaciones IA avanzadas, branding personalizado, alertas inteligentes, y soporte prioritario 24/7. Es $X/mes.",
    pdf: "Para exportar un PDF, abre cualquier dashboard de cliente y haz clic en 'Exportar PDF' arriba a la derecha. Puedes personalizar el branding y generar un informe profesional en segundos.",
    sources: "Soportamos Google Analytics 4, Search Console, Google Ads, Google Sheets e importaciones CSV. ¡Las integraciones de Facebook Ads y LinkedIn Ads llegan pronto!",
    dashboard: "El dashboard muestra KPIs, graficos de trafico y conversiones, fuentes de trafico, posiciones SEO y redes sociales. Selecciona un cliente en la barra lateral.",
    dashboardAdvanced: "Premium: filtros por periodo y comparacion para analisis ROI. Metricas de Ingresos y Costes disponibles.",
    metrics: "Metricas principales: Trafico mensual, Tasa de conversion, Posicion SEO, Engagement social. Grafico Trafico y conversiones; Fuentes por canal.",
    metricsAdvanced: "Premium: Leads, Ingresos, Costes y KPIs personalizados con rango de fechas y comparacion.",
    default: "¡Estare encantado de ayudarte! Puedes preguntarme sobre auditorias, dashboard, metricas, precios o herramientas.",
  },
  de: {
    audit: "Um ein Audit zu erstellen, gehen Sie zu Ihrem Dashboard und klicken Sie auf 'Neues Audit'. Sie können dann einen Kunden auswählen, seine Datenquellen verbinden, und unsere KI generiert automatisch Insights.",
    premium: "Premium enthält: unbegrenzte Kunden, alle Datenquellen, erweiterte KI-Empfehlungen, benutzerdefiniertes Branding, intelligente Warnungen und 24/7-Prioritätssupport. Es kostet $X/Monat.",
    pdf: "Um ein PDF zu exportieren, öffnen Sie ein beliebiges Kunden-Dashboard und klicken Sie oben rechts auf 'PDF exportieren'. Sie können das Branding anpassen und in Sekunden einen professionellen Bericht erstellen.",
    sources: "Wir unterstützen Google Analytics 4, Search Console, Google Ads, Google Sheets und CSV-Importe. Facebook Ads und LinkedIn Ads-Integrationen kommen bald!",
    dashboard: "Das Dashboard zeigt KPIs, Traffic- und Conversion-Diagramme, Traffic-Quellen, SEO-Rankings und Social-Media. Wählen Sie einen Kunden in der Seitenleiste.",
    dashboardAdvanced: "Premium: Zeitraumfilter und Vergleich für ROI-Analyse. Umsatz- und Kostenmetriken verfügbar.",
    metrics: "Hauptmetriken: Monatlicher Traffic, Conversion-Rate, durchschnittliche SEO-Position, Social Engagement. Diagramm Traffic und Conversions; Quellen nach Kanal.",
    metricsAdvanced: "Premium: Leads, Umsatz, Kosten und benutzerdefinierte KPIs mit Datumsbereich und Vergleich.",
    default: "Ich helfe Ihnen gerne! Fragen Sie nach Audits, Dashboard, Metriken, Preisen oder Tools.",
  },
  pt: {
    audit: "Para criar uma auditoria, va ao seu Dashboard e clique em 'Nova auditoria'. Voce pode selecionar um cliente, conectar suas fontes de dados, e nossa IA gerara automaticamente insights.",
    premium: "Premium inclui: clientes ilimitados, todas as fontes de dados, recomendações IA avançadas, branding personalizado, alertas inteligentes e suporte prioritario 24/7. E $X/mes.",
    pdf: "Para exportar um PDF, abra qualquer dashboard de cliente e clique em 'Exportar PDF' no canto superior direito. Voce pode personalizar o branding e gerar um relatorio profissional em segundos.",
    sources: "Suportamos Google Analytics 4, Search Console, Google Ads, Google Sheets e importacoes CSV. Integracoes com Facebook Ads e LinkedIn Ads em breve!",
    dashboard: "O dashboard mostra KPIs, graficos de trafego e conversoes, fontes de trafego, posicoes SEO e redes sociais. Selecione um cliente na barra lateral.",
    dashboardAdvanced: "Premium: filtros por periodo e comparacao para analise de ROI. Metricas de Receita e Custos disponiveis.",
    metrics: "Metricas principais: Trafego mensal, Taxa de conversao, Posicao SEO, Engajamento social. Grafico Trafego e conversoes; fontes por canal.",
    metricsAdvanced: "Premium: Leads, Receita, Custos e KPIs personalizados com periodo e comparacao.",
    default: "Ficarei feliz em ajudar! Pergunte sobre auditorias, dashboard, metricas, precos ou ferramentas.",
  },
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showLanguageSelect, setShowLanguageSelect] = useState(true)
  const [language, setLanguage] = useState("en")
  const [chatColor, setChatColor] = useState("primary")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userPlan, setUserPlan] = useState<string>("free")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setUserPlan(data.user?.company?.plan ?? "free"))
        .catch(() => setUserPlan("free"))
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const selectLanguage = (langCode: string) => {
    setLanguage(langCode)
    setShowLanguageSelect(false)
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: welcomeMessages[langCode],
      },
    ])
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const responses = botResponses[language] || botResponses.en
    const isPremium = userPlan === "premium"
    const wantsAdvanced = lowerMessage.includes("advanced") || lowerMessage.includes("detail") || lowerMessage.includes("avance") || lowerMessage.includes("detalhe") || lowerMessage.includes("roi")

    if (lowerMessage.includes("audit") || lowerMessage.includes("create") || lowerMessage.includes("crear") || lowerMessage.includes("creer")) {
      return responses.audit
    }
    if (lowerMessage.includes("premium") || lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("prix") || lowerMessage.includes("tarif")) {
      return responses.premium
    }
    if (lowerMessage.includes("pdf") || lowerMessage.includes("export")) {
      return responses.pdf
    }
    if (lowerMessage.includes("source") || lowerMessage.includes("connect") || lowerMessage.includes("data") || lowerMessage.includes("integration")) {
      return responses.sources
    }
    if (lowerMessage.includes("dashboard") || lowerMessage.includes("tableau") || lowerMessage.includes("panel")) {
      if (isPremium && wantsAdvanced && responses.dashboardAdvanced) return responses.dashboardAdvanced
      return responses.dashboard ?? responses.default
    }
    if (lowerMessage.includes("metric") || lowerMessage.includes("kpi") || lowerMessage.includes("indicator") || lowerMessage.includes("traffic") || lowerMessage.includes("conversion")) {
      if (isPremium && wantsAdvanced && responses.metricsAdvanced) return responses.metricsAdvanced
      return responses.metrics ?? responses.default
    }
    return responses.default
  }

  const sendMessage = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getBotResponse(messageText),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const colorClass = chatColor === "primary" ? "bg-primary" : 
                     chatColor === "chart-2" ? "bg-chart-2" : 
                     chatColor === "chart-5" ? "bg-chart-5" : "bg-chart-4"

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full ${colorClass} text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-110 hover:shadow-xl ${isOpen ? "hidden" : ""}`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 ${colorClass}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Scayflo AI</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-b border-border/50 bg-secondary/50 p-4 animate-in slide-in-from-top-2 duration-200">
              <h4 className="mb-3 text-sm font-medium text-foreground">Chat Settings</h4>
              
              <div className="mb-4">
                <label className="mb-2 block text-xs text-muted-foreground">Language</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        if (messages.length > 0) {
                          setMessages([{ id: "1", role: "assistant", content: welcomeMessages[lang.code] }])
                        }
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        language === lang.code
                          ? `${colorClass} text-primary-foreground`
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-muted-foreground">Theme Color</label>
                <div className="flex gap-2">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setChatColor(color.value)}
                      className={`relative h-8 w-8 rounded-full ${color.class} transition-transform hover:scale-110`}
                      aria-label={color.name}
                    >
                      {chatColor === color.value && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Language Selection */}
          {showLanguageSelect ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Sparkles className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">Welcome to Scayflo!</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Please select your preferred language
              </p>
              <div className="grid grid-cols-2 gap-2 w-full">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
                  >
                    <span className="text-xs font-bold text-muted-foreground">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        message.role === "user"
                          ? "bg-secondary"
                          : colorClass
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                        message.role === "user"
                          ? "bg-secondary text-foreground"
                          : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl bg-secondary/50 px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="border-t border-border/50 px-4 py-3">
                  <p className="mb-2 text-xs text-muted-foreground">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {(quickReplies[language] || quickReplies.en).map((reply) => (
                      <button
                        key={reply}
                        onClick={() => sendMessage(reply)}
                        className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border/50 p-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 border-border/50 bg-secondary/50 focus:border-primary"
                  />
                  <Button
                    onClick={() => sendMessage()}
                    size="icon"
                    className={`${colorClass} shadow-lg`}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}
