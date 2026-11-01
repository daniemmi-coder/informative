import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  ShieldAlert, 
  FileText, 
  Settings, 
  LogIn, 
  LogOut, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Download, 
  Search, 
  Filter, 
  CloudSun, 
  CheckCircle2, 
  UserCheck, 
  Smartphone, 
  Monitor, 
  ChevronRight, 
  Bell, 
  X,
  Lock,
  Leaf,
  Info,
  Calendar,
  Clock,
  AlertTriangle,
  CalendarPlus,
  CheckCircle,
  LayoutDashboard,
  Sliders,
  Image as ImageIcon,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Tractor,
  Wheat,
  SlidersHorizontal,
  Calculator,
  HeartHandshake,
  Wrench,
  Users,
  PhoneCall,
  Mail,
  Building2,
  Send,
  ExternalLink
} from 'lucide-react';

// --- CURATED HIGH-RES AGRICULTURAL BACKGROUND PRESETS ---
const AGRI_HERO_PRESETS = [
  {
    id: 'tractor',
    name: 'Trattore in campo di grano',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'vineyard',
    name: 'Vigneti Colline Reggiane',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'wheat',
    name: 'Spighe di Grano Dorate',
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'livestock',
    name: 'Allevamento e Stalla 4.0',
    url: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'orchard',
    name: 'Frutteto Pianura Padana',
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1600'
  }
];

// --- INITIAL DEFAULT MOCK DATA ---
const DEFAULT_APP_CONFIG = {
  appName: "Confagricoltura Reggio Emilia informa",
  appSubtitle: "Notizie, scadenze e servizi ufficiali per gli agricoltori reggiani",
  welcomeTitle: "L'informazione al servizio della terra reggiana",
  welcomeDesc: "Rimani sempre aggiornato su finanziamenti regionali, adempimenti PAC, bollettini fitosanitari ed eventi del settore agroalimentare.",
  heroImage: AGRI_HERO_PRESETS[0].url,
  urgentBanner: "SCADENZA PAC 2026: Mancano meno di 30 giorni al termine per la presentazione dei documenti di saldo!",
  emergencyPopupTitle: "Avviso Importante Ritiro Carburante UMA",
  emergencyPopupText: "Si ricordano ai soci le scadenze inderogabili per il conguaglio delle quote carburante agevolato entro fine mese.",
  showEmergencyPopup: false,
  modules: {
    dashboard: true,
    macroAree: true,
    deadlines: true,
    news: true,
    alerts: true,
    docs: true
  }
};

// --- INITIAL DATA FOR MACRO-AREAS (FISCALE, PATRONATO, TECNICO, SINDACALE) ---
const INITIAL_MACRO_AREAS = {
  fiscale: {
    id: 'fiscale',
    title: 'Fiscale & Tributario',
    badge: 'Contabilità & Imposte',
    icon: 'Calculator',
    color: 'emerald',
    description: 'Assistenza completa in materia fiscale, dichiarazione dei redditi agricoli, gestione IVA, fatturazione elettronica e consulenza societaria per aziende agricole reggiane.',
    contacts: {
      head: 'Dott. Massimo Rossi',
      phone: '0522 433111',
      email: 'fiscale@confagricoltura.re.it',
      hours: 'Lun - Ven: 08:30 - 13:00 / 14:30 - 17:30'
    },
    services: [
      'Dichiarazioni dei Redditi (Modello REDDITI PF, SP, SC e 730)',
      'Gestione IVA Agricola e Regime di Esonero ex Art. 34',
      'Fatturazione Elettronica ed Conservazione Sostitutiva',
      'Calcolo e gestione IMU / TASI su terreni e fabbricati rurali',
      'Pratiche di Successione, Donazione e Volture Catastali',
      'Consulenza Societaria e Passaggi Generazionali in Agricoltura'
    ],
    docs: [
      { name: "Guida IVA Agricola e Aliquote Compresate 2026.pdf", size: "2.1 MB" },
      { name: "Checklist Documenti Dichiarazione dei Redditi.pdf", size: "1.4 MB" },
      { name: "Vademecum Agevolazioni IMU Terreni Reggio Emilia.pdf", size: "1.9 MB" }
    ]
  },
  patronato: {
    id: 'patronato',
    title: 'Patronato ENAPA',
    badge: 'Previdenza & Assistenza',
    icon: 'HeartHandshake',
    color: 'sky',
    description: 'Tutela previdenziale e sociale gratuita per coltivatori diretti, IAP, dipendenti agricoli e famiglie. Pensioni, infortuni, maternità e invalidità.',
    contacts: {
      head: 'Dott.ssa Elena Bernardi',
      phone: '0522 433140',
      email: 'enapa@confagricoltura.re.it',
      hours: 'Lun - Ven: 08:30 - 12:30 (Pomeriggio su appuntamento)'
    },
    services: [
      'Domande di Pensione (Vecchiaia, Anticipata, Reversibilità, Inabilità)',
      'Gestione Infortuni sul Lavoro INAIL e Malattie Professionali',
      'Disoccupazione Agricola e Indennità per Lavoratori Stagionali',
      'Maternità, Congedi Parentali e Assegno Unico Universale',
      'Riconoscimento Invalidità Civile e Legge 104/92',
      'Controllo Posizione Contributiva INPS e Calcolo Estratto Conto'
    ],
    docs: [
      { name: "Richiesta Disoccupazione Agricola 2026.pdf", size: "1.2 MB" },
      { name: "Vademecum Infortuni in Stalla e nei Campi INAIL.pdf", size: "2.8 MB" },
      { name: "Modello Delega Assistenza Patronato ENAPA.pdf", size: "0.8 MB" }
    ]
  },
  tecnico: {
    id: 'tecnico',
    title: 'Area Tecnica & PAC',
    badge: 'PSR, PAC & Ambiente',
    icon: 'Wrench',
    color: 'amber',
    description: 'Supporto tecnico-agronomico per la presentazione della Domanda Unica PAC, bandi CSR Emilia-Romagna, carburante agevolato UMA e quaderno di campagna.',
    contacts: {
      head: 'Ing. Agr. Roberto Ferrari',
      phone: '0522 433175',
      email: 'tecnico@confagricoltura.re.it',
      hours: 'Lun - Ven: 08:30 - 13:00 / 14:00 - 17:00'
    },
    services: [
      'Compilazione e Presentazione Domanda Unica PAC ed Ecoschemi',
      'Domande di Contributo CSR / PSR Regione Emilia-Romagna',
      'Assegnazione Carburante Agricolo Agevolato (Libretto UMA)',
      'Gestione Digitale Quaderno di Campagna e Registro Trattamenti',
      'Certificazioni Biologico, SQNPI e Disciplinari Parmigiano Reggiano',
      'Rilascio e Rinnovo Abilitazione Trattamenti Fitosanitari (Patentino)'
    ],
    docs: [
      { name: "Manuale Ecoschemi PAC 2026 Emilia-Romagna.pdf", size: "3.5 MB" },
      { name: "Modulo Tabella Fabbisogno Carburante UMA.pdf", size: "1.6 MB" },
      { name: "Scheda Trattamenti Fitosanitari Vigneto e Pero.pdf", size: "2.2 MB" }
    ]
  },
  sindacale: {
    id: 'sindacale',
    title: 'Sindacale & Tutela Categoria',
    badge: 'Contratti & Rappresentanza',
    icon: 'Users',
    color: 'rose',
    description: 'Tutela degli interessi economici e giuridici della proprietà terriera e dell’impresa agricola reggiana. Contratti di lavoro, affitti agrari e calamità.',
    contacts: {
      head: 'Avv. Andrea Mantovani',
      phone: '0522 433190',
      email: 'sindacale@confagricoltura.re.it',
      hours: 'Lun - Ven: 09:00 - 13:00'
    },
    services: [
      'Applicazione Contratto Collettivo Provinciale di Lavoro Agricolo',
      'Assistenza nella stipula dei Contratti di Affitto Fondi Rustici (Deroga Art. 45)',
      'Vertenze di Lavoro, Conciliazioni ed Assistenza Legale Agraria',
      'Segnalazione Danni da Calamità Naturali, Gelate e Siccità',
      'Tutela della Proprietà Fondiaria ed Espropri per Pubblica Utilità',
      'Rappresentanza presso Enti, Consorzi di Bonifica e Tavoli Regionali'
    ],
    docs: [
      { name: "Contratto Collettivo Provinciale Operai Agricoli RE.pdf", size: "4.0 MB" },
      { name: "Bozza Contratto Affitto Fondo Rustico Art. 45.pdf", size: "1.5 MB" },
      { name: "Modulo Segnalazione Danni Calamità Naturali.pdf", size: "1.1 MB" }
    ]
  }
};

const INITIAL_NEWS = [
  {
    id: 1,
    title: "Bando Regionale Innovazione e Meccanizzazione Agricola 2026",
    category: "Bandi e Finanziamenti",
    date: "28 Ottobre 2026",
    summary: "Pubblicate le nuove linee guida per l'accesso ai contributi a fondo perduto per l'acquisto di macchinari 4.0 in Emilia-Romagna.",
    content: "La Regione Emilia-Romagna ha approvato lo stanziamento straordinario per l'ammodernamento del parco macchine agricole. Gli agricoltori della provincia di Reggio Emilia potranno presentare domanda fino al 15 Dicembre 2026. Priorità per sistemi di irrigazione di precisione e trattori a basse emissioni.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800",
    urgent: false
  },
  {
    id: 2,
    title: "Bollettino Fitosanitario: Monitoraggio Peronospora e Cimice Marmorata",
    category: "Meteo e Fitosanitario",
    date: "26 Ottobre 2026",
    summary: "Aggiornamento settimanale sulle tecniche di difesa integrata per i vigneti della Pianura Padana e zone collinari reggiane.",
    content: "A seguito delle recenti precipitazioni, il servizio fitosanitario raccomanda un attento monitoraggio nei vigneti e frutteti. Consultare la scheda tecnica allegata per i prodotti ammessi nei disciplinari di produzione integrata del Parmigiano Reggiano e dei vini DOC reggiani.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    urgent: true
  },
  {
    id: 3,
    title: "Mercato Parmigiano Reggiano: Stabilità nei prezzi alla produzione",
    category: "Politica Agraria",
    date: "22 Ottobre 2026",
    summary: "Analisi delle quotazioni di Ottobre alla borsa merci di Reggio Emilia. Buona la tenuta dell'export.",
    content: "Si registrano segnali positivi per la filiera lattiero-casearia di Reggio Emilia. Le quotazioni del Parmigiano Reggiano 12 mesi mantengono una solida stabilità. Confagricoltura sottolinea la necessità di tutelare i costi di produzione in stalla legati al prezzo dei foraggi.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&q=80&w=800",
    urgent: false
  },
  {
    id: 4,
    title: "Assemblea Generale Confagricoltura Reggio Emilia",
    category: "Eventi",
    date: "15 Ottobre 2026",
    summary: "Incontro annuale dei soci presso il Centro Fiere di Reggio Emilia per discutere le sfide della PAC e della sostenibilità.",
    content: "Un grande momento di confronto istituzionale con gli esperti del settore agrario italiano. Si affronteranno i temi della gestione del rischio climatico, delle risorse idriche e delle prospettive per le giovani imprese agricole reggiane.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800",
    urgent: false
  }
];

const INITIAL_DEADLINES = [
  {
    id: 101,
    title: "Presentazione Domanda Saldo PAC 2026",
    category: "PAC e Politica Agricola",
    dueDate: "2026-11-30",
    description: "Termine per il caricamento delle ricevute e documentazione finale per l'erogazione del saldo dei pagamenti diretti PAC.",
    authority: "AGEA / Regione Emilia-Romagna",
    mandatory: true
  },
  {
    id: 102,
    title: "Comunicazione Assegnazione Carburante UMA 2027",
    category: "Carburante Agricolo",
    dueDate: "2026-12-15",
    description: "Scadenza per la presentazione della richiesta preventiva di carburante agricolo agevolato per l'anno d'imposta successivo.",
    authority: "Ufficio UMA Reggio Emilia",
    mandatory: true
  },
  {
    id: 103,
    title: "Versamento Secondo Acconto IVA e Irpef Agricola",
    category: "Fiscale e Tributi",
    dueDate: "2026-11-30",
    description: "Pagamento F24 per l'acconto delle imposte sui redditi e quote IVA per le società ed imprese agricole individuali.",
    authority: "Agenzia delle Entrate",
    mandatory: true
  },
  {
    id: 104,
    title: "Presentazione Registro Trattamenti Fitosanitari 2° Semestre",
    category: "Ambientale e Nitrati",
    dueDate: "2026-12-31",
    description: "Aggiornamento e chiusura del Quaderno di Campagna cartaceo/digitale per i trattamenti fitosanitari e fertilizzazioni organiche.",
    authority: "Servizio Fitosanitario Regionale",
    mandatory: false
  },
  {
    id: 105,
    title: "Rinnovo Attestati Sicurezza e Riconversioni Trattoristi",
    category: "Sicurezza e Lavoro",
    dueDate: "2027-01-31",
    description: "Termine per l'iscrizione ai corsi di aggiornamento per l'abilitazione all'uso delle macchine agricole (Patentino Trattore).",
    authority: "Confagricoltura Formazione",
    mandatory: false
  }
];

const INITIAL_DOCS = [
  { id: 1, name: "Modulo Domanda PAC 2026.pdf", category: "Modulistica", size: "2.4 MB" },
  { id: 2, name: "Disciplinare Produzione Integrata 2026.pdf", category: "Normative", size: "4.1 MB" },
  { id: 3, name: "Guida alla Fatturazione Elettronica Agricola.pdf", category: "Fiscale", size: "1.8 MB" },
  { id: 4, name: "Richiesta Carburante Agricolo Agevolato (UMA).pdf", category: "Modulistica", size: "1.1 MB" }
];

export default function App() {
  // --- STATE PERSISTENCE ---
  const [currentUser, setCurrentUser] = useState(null); // null, 'farmer', 'admin'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'macroAree', 'fiscale', 'patronato', 'tecnico', 'sindacale', 'deadlines', 'news', 'alerts', 'docs', 'admin', 'download'
  
  const [appConfig, setAppConfig] = useState(() => {
    const saved = localStorage.getItem('confagri_re_config');
    return saved ? JSON.parse(saved) : DEFAULT_APP_CONFIG;
  });

  const [macroAreas, setMacroAreas] = useState(() => {
    const saved = localStorage.getItem('confagri_re_macroareas');
    return saved ? JSON.parse(saved) : INITIAL_MACRO_AREAS;
  });

  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('confagri_re_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [deadlinesList, setDeadlinesList] = useState(() => {
    const saved = localStorage.getItem('confagri_re_deadlines');
    return saved ? JSON.parse(saved) : INITIAL_DEADLINES;
  });

  // Appointment Modal State
  const [appointmentModalArea, setAppointmentModalArea] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    email: '',
    farmName: '',
    notes: '',
    preferredDate: ''
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutte');
  const [selectedDeadlineCat, setSelectedDeadlineCat] = useState('Tutte');

  // Modals & Popups
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [showEmergencyPopupModal, setShowEmergencyPopupModal] = useState(false);

  // Admin Editors Sub-tab
  const [adminSubTab, setAdminSubTab] = useState('branding'); // 'branding', 'hero', 'emergency', 'modules', 'deadlines', 'news'

  // Forms states for Admin Editors
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Politica Agraria',
    summary: '',
    content: '',
    image: '',
    urgent: false
  });

  const [editingDeadline, setEditingDeadline] = useState(null);
  const [deadlineForm, setDeadlineForm] = useState({
    title: '',
    category: 'PAC e Politica Agricola',
    dueDate: '',
    description: '',
    authority: '',
    mandatory: true
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('confagri_re_config', JSON.stringify(appConfig));
  }, [appConfig]);

  useEffect(() => {
    localStorage.setItem('confagri_re_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('confagri_re_deadlines', JSON.stringify(deadlinesList));
  }, [deadlinesList]);

  // Show emergency popup on start if configured
  useEffect(() => {
    localStorage.setItem('confagri_re_macroareas', JSON.stringify(macroAreas));
  }, [macroAreas]);

  // Admin Macro Area Form State
  const [selectedAdminAreaKey, setSelectedAdminAreaKey] = useState('fiscale');

  // Submit Appointment Request
  const handleSendAppointment = (e) => {
    e.preventDefault();
    alert(`Richiesta inviata con successo al responsabile del settore ${appointmentModalArea.title}! Verrai ricontattato a breve al numero ${appointmentForm.phone}.`);
    setAppointmentModalArea(null);
    setAppointmentForm({ name: '', phone: '', email: '', farmName: '', notes: '', preferredDate: '' });
  };

  // Icon Helper for Macro Areas
  const renderMacroIcon = (iconName, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Calculator': return <Calculator className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <Leaf className={className} />;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (activeTab === 'admin') setActiveTab('dashboard');
  };

  const handleResetFactory = () => {
    if (window.confirm("Sei sicuro di voler ripristinare le impostazioni e i dati di fabbrica dell'applicazione? tutte le modifiche custom andranno perse.")) {
      setAppConfig(DEFAULT_APP_CONFIG);
      setNewsList(INITIAL_NEWS);
      setDeadlinesList(INITIAL_DEADLINES);
      localStorage.clear();
      alert("Applicazione ripristinata con successo ai dati iniziali!");
    }
  };

  // Helper for Date Calculation
  const getDaysRemaining = (dueDateStr) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const due = new Date(dueDateStr);
    due.setHours(0,0,0,0);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyBadge = (days) => {
    if (days < 0) {
      return <span className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-300">Scaduta</span>;
    } else if (days <= 7) {
      return <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-200 animate-pulse">Urgente ({days} gg)</span>;
    } else if (days <= 30) {
      return <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">In Scadenza ({days} gg)</span>;
    } else {
      return <span className="bg-emerald-100 text-[#006837] px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">In Regola ({days} gg)</span>;
    }
  };

  // Deadline Handlers
  const handleSaveDeadline = (e) => {
    e.preventDefault();
    if (!deadlineForm.title || !deadlineForm.dueDate) return;

    if (editingDeadline) {
      setDeadlinesList(deadlinesList.map(item => item.id === editingDeadline.id ? { ...deadlineForm, id: item.id } : item));
      setEditingDeadline(null);
    } else {
      const newEntry = {
        ...deadlineForm,
        id: Date.now()
      };
      setDeadlinesList([...deadlinesList, newEntry]);
    }

    setDeadlineForm({
      title: '',
      category: 'PAC e Politica Agricola',
      dueDate: '',
      description: '',
      authority: '',
      mandatory: true
    });
  };

  const handleDeleteDeadline = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa scadenza dallo scadenzario?")) {
      setDeadlinesList(deadlinesList.filter(item => item.id !== id));
    }
  };

  // Article Handlers
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.summary) return;

    if (editingArticle) {
      setNewsList(newsList.map(item => item.id === editingArticle.id ? { ...articleForm, id: item.id, date: item.date } : item));
      setEditingArticle(null);
    } else {
      const newEntry = {
        ...articleForm,
        id: Date.now(),
        date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
        image: articleForm.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
      };
      setNewsList([newEntry, ...newsList]);
    }

    setArticleForm({
      title: '',
      category: 'Politica Agraria',
      summary: '',
      content: '',
      image: '',
      urgent: false
    });
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa notizia?")) {
      setNewsList(newsList.filter(item => item.id !== id));
    }
  };

  // Filters
  const filteredNews = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tutte' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDeadlines = deadlinesList
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedDeadlineCat === 'Tutte' || item.category === selectedDeadlineCat;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="min-h-screen bg-emerald-50/40 text-slate-900 font-sans flex flex-col selection:bg-emerald-200">
      
      {/* HEADER */}
      <header className="bg-[#006837] text-white shadow-md sticky top-0 z-40 border-b border-emerald-800">
        {/* ... existing code header inner ... */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center p-1 shadow-inner ring-2 ring-emerald-300/30">
              <Leaf className="w-7 h-7 text-[#006837]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight flex items-center gap-2">
                {appConfig.appName}
              </h1>
              <p className="text-xs text-emerald-200 font-medium hidden sm:block">{appConfig.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
            <button 
              onClick={() => setActiveTab('download')}
              className="flex items-center gap-1.5 bg-[#8DC63F] hover:bg-[#7bb332] text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs md:text-sm transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Installa App</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-emerald-900/90 px-3 py-1.5 rounded-lg border border-emerald-700/60 text-xs md:text-sm">
                <UserCheck className="w-4 h-4 text-emerald-300" />
                <span className="font-bold text-emerald-100 hidden sm:inline">
                  {currentUser === 'admin' ? 'Amministratore' : 'Agricoltore'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="ml-2 text-rose-200 hover:text-white font-semibold underline text-xs"
                >
                  Esci
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Accedi</span>
              </button>
            )}
          </div>
        </div>

        {/* --- DYNAMIC NAVIGATION TABS INCLUDING MACRO AREAS --- */}
        <nav className="bg-[#00522b] px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center overflow-x-auto space-x-1 sm:space-x-2 text-xs md:text-sm font-semibold py-1">
            
            {appConfig.modules.dashboard && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'dashboard' 
                    ? 'border-[#8DC63F] text-white font-extrabold bg-white/10' 
                    : 'border-transparent text-emerald-100 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                Dashboard
              </button>
            )}

            {/* MACRO-AREE HUB */}
            {appConfig.modules.macroAree && (
              <button
                onClick={() => setActiveTab('macroAree')}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'macroAree' || ['fiscale', 'patronato', 'tecnico', 'sindacale'].includes(activeTab)
                    ? 'border-[#8DC63F] text-white font-extrabold bg-white/10' 
                    : 'border-transparent text-emerald-100 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-300" />
                Servizi & Macro-Aree
              </button>
            )}

            {/* DIRECT QUICK TABS TO MACRO-AREAS */}
            <button
              onClick={() => setActiveTab('fiscale')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 text-xs rounded transition-all ${
                activeTab === 'fiscale' ? 'bg-[#006837] text-white font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" /> Fiscale
            </button>

            <button
              onClick={() => setActiveTab('patronato')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 text-xs rounded transition-all ${
                activeTab === 'patronato' ? 'bg-[#006837] text-white font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-sky-300" /> Patronato
            </button>

            <button
              onClick={() => setActiveTab('tecnico')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 text-xs rounded transition-all ${
                activeTab === 'tecnico' ? 'bg-[#006837] text-white font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-300" /> Tecnico & PAC
            </button>

            <button
              onClick={() => setActiveTab('sindacale')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 text-xs rounded transition-all ${
                activeTab === 'sindacale' ? 'bg-[#006837] text-white font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-rose-300" /> Sindacale
            </button>

            {appConfig.modules.deadlines && (
              <button
                onClick={() => setActiveTab('deadlines')}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'deadlines' 
                    ? 'border-[#8DC63F] text-white font-extrabold bg-white/10' 
                    : 'border-transparent text-emerald-100 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                Scadenzario
              </button>
            )}

            {appConfig.modules.news && (
              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'news' 
                    ? 'border-[#8DC63F] text-white font-extrabold bg-white/10' 
                    : 'border-transparent text-emerald-100 hover:text-white'
                }`}
              >
                <Newspaper className="w-4 h-4 text-sky-300" />
                Notizie
              </button>
            )}

            {currentUser === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'admin' 
                    ? 'border-[#8DC63F] text-amber-300 font-extrabold bg-amber-950/40' 
                    : 'border-transparent text-amber-200 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4 text-amber-400 animate-pulse" />
                Modifica App (Admin)
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* BANNER ALLERTA URGENTE */}
      {appConfig.urgentBanner && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md border-b border-amber-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs md:text-sm font-bold">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-950 animate-bounce flex-shrink-0" />
              <span>{appConfig.urgentBanner}</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* ... existing dashboard hero banner ... */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 text-white min-h-[260px] flex items-center border border-emerald-900">
              <img 
                src={appConfig.heroImage} 
                alt="Agricoltura Reggio Emilia"
                className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#006837]/90 via-[#006837]/70 to-transparent"></div>
              
              <div className="relative z-10 p-6 md:p-10 max-w-2xl space-y-3">
                <span className="bg-[#8DC63F] text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                  <Leaf className="w-3.5 h-3.5" /> Confagricoltura Reggio Emilia
                </span>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
                  {appConfig.welcomeTitle}
                </h2>
                <p className="text-emerald-100 text-sm md:text-base font-medium leading-relaxed drop-shadow">
                  {appConfig.welcomeDesc}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('macroAree')}
                    className="bg-[#8DC63F] hover:bg-[#7bb332] text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs md:text-sm transition-all shadow-md flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" /> Esplora Servizi ai Soci
                  </button>
                  <button 
                    onClick={() => setActiveTab('deadlines')}
                    className="bg-white text-[#006837] font-bold px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" /> Prossime Scadenze ({deadlinesList.length})
                  </button>
                </div>
              </div>
            </div>

            {/* 4 MACRO-AREAS CARDS QUICK PREVIEW ON DASHBOARD */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#006837]" />
                  Macro-Aree di Consulenza ed Assistenza
                </h3>
                <button 
                  onClick={() => setActiveTab('macroAree')} 
                  className="text-xs font-bold text-[#006837] hover:underline"
                >
                  Vedi Dettaglio Servizi →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(macroAreas).map((area) => (
                  <div 
                    key={area.id}
                    onClick={() => setActiveTab(area.id)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-emerald-50 text-[#006837] rounded-xl group-hover:bg-[#006837] group-hover:text-white transition-colors">
                          {renderMacroIcon(area.icon)}
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {area.badge}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#006837] transition-colors">
                        {area.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-3">
                        {area.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006837]">
                      <span>Sportello Reggio E.</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DASHBOARD PREVIEW SECTIONS ... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ... existing dashboard bottom grid ... */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#006837]" />
                    Prossime Scadenze in Arrivo
                  </h3>
                  <button onClick={() => setActiveTab('deadlines')} className="text-xs font-bold text-[#006837] hover:underline">
                    Vedi Tutte ({deadlinesList.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {deadlinesList.slice(0, 3).map(dl => {
                    const daysLeft = getDaysRemaining(dl.dueDate);
                    return (
                      <div key={dl.id} className="p-3.5 border border-slate-100 rounded-xl hover:border-emerald-300 transition-colors bg-slate-50/50 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getUrgencyBadge(daysLeft)}
                            <span className="text-xs font-semibold text-slate-500">{dl.category}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">{dl.title}</h4>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-slate-400 block font-medium">Scadenza</span>
                          <span className="text-sm font-bold text-slate-800">{new Date(dl.dueDate).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-[#006837]" />
                      Ultima Ora Agricola
                    </h3>
                    <button onClick={() => setActiveTab('news')} className="text-xs font-bold text-[#006837] hover:underline">
                      Notizie
                    </button>
                  </div>

                  {newsList[0] && (
                    <div className="space-y-3">
                      <img 
                        src={newsList[0].image} 
                        alt={newsList[0].title} 
                        className="w-full h-36 object-cover rounded-xl shadow-inner"
                      />
                      <span className="text-xs font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
                        {newsList[0].category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                        {newsList[0].title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {newsList[0].summary}
                      </p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedArticleModal(newsList[0])}
                  className="w-full mt-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#006837] font-bold text-xs rounded-xl transition-colors border border-emerald-200"
                >
                  Leggi Notizia Completa
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* --- TAB: OVERVIEW MACRO-AREE DI SERVIZIO --- */}
        {/* ============================================================ */}
        {activeTab === 'macroAree' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <h2 className="text-2xl font-black text-[#006837] mb-2 flex items-center gap-2">
                <Building2 className="w-7 h-7 text-[#006837]" />
                I Servizi Specializzati Confagricoltura Reggio Emilia
              </h2>
              <p className="text-slate-600 text-sm">
                Seleziona un'area di competenza per consultare i servizi dedicati, scaricare la modulistica, verificare gli orari dello sportello provinciale o richiedere una consulenza con i nostri tecnici.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(macroAreas).map((area) => (
                <div key={area.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 text-[#006837] rounded-xl">
                          {renderMacroIcon(area.icon, "w-7 h-7")}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#006837] uppercase tracking-wider">{area.badge}</span>
                          <h3 className="text-xl font-extrabold text-slate-900">{area.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-700 uppercase">Servizi Principali Offerti:</span>
                      <ul className="grid grid-cols-1 gap-1 text-xs text-slate-600">
                        {area.services.slice(0, 4).map((srv, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] flex-shrink-0 mt-0.5" />
                            <span>{srv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveTab(area.id)}
                      className="bg-[#006837] text-white hover:bg-[#00522b] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
                    >
                      <Info className="w-4 h-4" /> Pagina Dettagliata & Documenti
                    </button>
                    <button
                      onClick={() => setAppointmentModalArea(area)}
                      className="bg-emerald-50 text-[#006837] hover:bg-emerald-100 border border-emerald-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" /> Prenota Appuntamento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* --- TABS INDIVIDUALI PER OGNI MACRO-ARGOMENTO --- */}
        {/* ============================================================ */}
        {['fiscale', 'patronato', 'tecnico', 'sindacale'].includes(activeTab) && (() => {
          const area = macroAreas[activeTab];
          return (
            <div className="space-y-6">
              
              {/* TOP BANNER */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2 max-w-3xl">
                  <button 
                    onClick={() => setActiveTab('macroAree')}
                    className="text-xs font-bold text-[#006837] hover:underline flex items-center gap-1 mb-1"
                  >
                    ← Torna a Tutte le Macro-Aree
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-[#006837] rounded-xl">
                      {renderMacroIcon(area.icon, "w-8 h-8")}
                    </div>
                    <div>
                      <span className="bg-emerald-50 text-[#006837] text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {area.badge}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{area.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pt-1">
                    {area.description}
                  </p>
                </div>

                <button 
                  onClick={() => setAppointmentModalArea(area)}
                  className="bg-[#8DC63F] hover:bg-[#7bb332] text-slate-950 font-extrabold px-5 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md whitespace-nowrap"
                >
                  <PhoneCall className="w-5 h-5" /> Richiedi Appuntamento
                </button>
              </div>

              {/* CONTENT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT 2 COLS: SERVICES & DOCUMENTS */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Detailed Services List */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#006837]" />
                      Servizi Offerti agli Agricoltori Reggiani
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {area.services.map((srv, i) => (
                        <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#006837] flex-shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm font-semibold text-slate-800">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Division Documents */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#006837]" />
                      Modulistica & Vademecum Scaricabili
                    </h3>
                    <div className="space-y-3">
                      {area.docs.map((doc, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:border-emerald-500 transition-colors bg-white flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-50 text-[#006837] rounded-lg">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                              <span className="text-xs text-slate-400">PDF • {doc.size}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert(`Download simulato: ${doc.name}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-[#006837] hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
                          >
                            <Download className="w-4 h-4" /> Scarica
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COL: CONTACTS & OFFICE INFO */}
                <div className="space-y-6">
                  
                  {/* Office Contacts Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#006837]" />
                      Sportello di Reggio Emilia
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm">
                      <div className="flex items-start gap-3">
                        <UserCheck className="w-4 h-4 text-[#006837] flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-slate-400 block text-xs">Responsabile Settore</span>
                          <span className="font-bold text-slate-800">{area.contacts.head}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <PhoneCall className="w-4 h-4 text-[#006837] flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-slate-400 block text-xs">Telefono Diretto</span>
                          <a href={`tel:${area.contacts.phone}`} className="font-bold text-[#006837] hover:underline">
                            {area.contacts.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#006837] flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-slate-400 block text-xs">Email Ufficiale</span>
                          <a href={`mailto:${area.contacts.email}`} className="font-bold text-[#006837] hover:underline">
                            {area.contacts.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                        <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-slate-400 block text-xs">Orari Ricevimento</span>
                          <span className="font-semibold text-slate-700">{area.contacts.hours}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setAppointmentModalArea(area)}
                      className="w-full mt-2 py-2.5 bg-[#006837] hover:bg-[#00522b] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      Prenota Visita in Sede
                    </button>
                  </div>

                  {/* Office Address */}
                  <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-sm space-y-2">
                    <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider">Sede Centrale</span>
                    <h4 className="font-extrabold text-base">Confagricoltura Reggio Emilia</h4>
                    <p className="text-xs text-emerald-200">Via della Previdenza Sociale, 11 - 42124 Reggio Emilia (RE)</p>
                  </div>

                </div>

              </div>

            </div>
          );
        })()}

        {/* ... existing DEADLINES, NEWS, ALERTS, DOCS tabs ... */}
        {activeTab === 'deadlines' && (
          <div className="space-y-6">
            {/* ... existing deadlines content ... */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-7 h-7 text-[#006837]" />
                  <h2 className="text-2xl font-extrabold text-slate-900">Scadenzario Agricolo Provinciale</h2>
                </div>
                <p className="text-slate-600 text-sm">
                  Promemoria aggiornati su scadenze PAC, UMA carburanti, adempimenti fiscali, sicurezza e ambiente per l'Emilia-Romagna.
                </p>
              </div>

              {currentUser === 'admin' && (
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setAdminSubTab('deadlines');
                  }}
                  className="bg-[#006837] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#00522b] flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <PlusCircle className="w-4 h-4" /> Gestisci Scadenze (Admin)
                </button>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cerca adempimento o scadenza..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006837]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
                {['Tutte', 'PAC e Politica Agricola', 'Carburante Agricolo', 'Fiscale e Tributi', 'Ambientale e Nitrati', 'Sicurezza e Lavoro'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedDeadlineCat(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedDeadlineCat === cat 
                        ? 'bg-[#006837] text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredDeadlines.map(dl => {
                const daysLeft = getDaysRemaining(dl.dueDate);
                const formattedDate = new Date(dl.dueDate).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });

                return (
                  <div 
                    key={dl.id} 
                    className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-all p-5 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        {getUrgencyBadge(daysLeft)}
                        <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-md font-medium">
                          {dl.category}
                        </span>
                        {dl.mandatory && (
                          <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Obbligatorio
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {dl.title}
                      </h3>

                      <p className="text-slate-600 text-sm">
                        {dl.description}
                      </p>

                      <div className="text-xs text-slate-400 flex items-center gap-4 pt-1">
                        <span>Ente di riferimento: <strong>{dl.authority || 'Confagricoltura'}</strong></span>
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right">
                        <div className="text-xs text-slate-400 font-medium">Data Scadenza</div>
                        <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#006837]" />
                          {formattedDate}
                        </div>
                      </div>

                      <button 
                        onClick={() => alert(`Promemoria aggiunto per: "${dl.title}" in data ${formattedDate}`)}
                        className="flex items-center gap-1.5 bg-emerald-50 text-[#006837] hover:bg-emerald-100 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors border border-emerald-200"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>Imposta Avviso</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ... NEWS, ALERTS, DOCS ... */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* ... existing news grid ... */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cerca notizie, argomenti, decreti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006837]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
                {['Tutte', 'Bandi e Finanziamenti', 'Meteo e Fitosanitario', 'Politica Agraria', 'Eventi'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-[#006837] text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map(news => (
                <article 
                  key={news.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-[#006837] text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        {news.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <span className="text-xs text-slate-400 font-medium block mb-1">{news.date}</span>
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-2 mb-2 hover:text-[#006837] cursor-pointer" onClick={() => setSelectedArticleModal(news)}>
                        {news.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {news.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 border-t border-slate-50 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedArticleModal(news)}
                      className="text-[#006837] hover:text-[#004f29] font-bold text-sm flex items-center gap-1"
                    >
                      Leggi articolo <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* --- PANNELLO ADMIN (ESTESO CON EDIT MACRO-AREE) --- */}
        {/* ============================================================ */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {currentUser !== 'admin' ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-8 rounded-2xl text-center space-y-3">
                <Lock className="w-12 h-12 mx-auto text-rose-500" />
                <h3 className="text-xl font-extrabold">Accesso Riservato all'Amministratore</h3>
                <p className="text-sm max-w-md mx-auto text-slate-600">
                  Devi accedere con l'account Amministratore per poter modificare i contenuti e le macro-aree.
                </p>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="mt-2 bg-[#006837] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#00522b]"
                >
                  Accedi come Admin
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                <div className="bg-amber-500 text-slate-950 p-6 rounded-2xl shadow-md border border-amber-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sliders className="w-7 h-7 text-slate-950" />
                      <h2 className="text-2xl font-black">Pannello Gestione & Modifica App</h2>
                    </div>
                    <p className="text-xs md:text-sm text-slate-900 font-semibold">
                      Personalizza i testi, la grafica e i dettagli per le 4 Macro-Aree (Fiscale, Patronato, Tecnico, Sindacale).
                    </p>
                  </div>

                  <button 
                    onClick={handleResetFactory}
                    className="bg-slate-950 text-white hover:bg-slate-900 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" /> Reset Dati
                  </button>
                </div>

                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex overflow-x-auto gap-2">
                  <button
                    onClick={() => setAdminSubTab('macroedit')}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${
                      adminSubTab === 'macroedit' ? 'bg-[#006837] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> Gestione 4 Macro-Aree
                  </button>
                  <button
                    onClick={() => setAdminSubTab('branding')}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${
                      adminSubTab === 'branding' ? 'bg-[#006837] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" /> Nome & Testi App
                  </button>
                  <button
                    onClick={() => setAdminSubTab('hero')}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${
                      adminSubTab === 'hero' ? 'bg-[#006837] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" /> Copertina Agricola
                  </button>
                  <button
                    onClick={() => setAdminSubTab('deadlines')}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${
                      adminSubTab === 'deadlines' ? 'bg-[#006837] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Calendar className="w-4 h-4" /> Scadenze
                  </button>
                </div>

                {/* ADMIN SUB-TAB: MACRO-AREAS EDITOR */}
                {adminSubTab === 'macroedit' && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                    <div className="flex items-center justify-between border-b pb-3">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#006837]" /> Editor Contenuti e Contatti Macro-Aree
                      </h3>
                      <div className="flex items-center gap-2">
                        {['fiscale', 'patronato', 'tecnico', 'sindacale'].map(key => (
                          <button
                            key={key}
                            onClick={() => setSelectedAdminAreaKey(key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                              selectedAdminAreaKey === key ? 'bg-[#006837] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Editor Form for Selected Area */}
                    {(() => {
                      const cur = macroAreas[selectedAdminAreaKey];
                      return (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Titolo Macro-Area</label>
                              <input 
                                type="text"
                                value={cur.title}
                                onChange={(e) => {
                                  setMacroAreas({
                                    ...macroAreas,
                                    [selectedAdminAreaKey]: { ...cur, title: e.target.value }
                                  });
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Sottotitolo</label>
                              <input 
                                type="text"
                                value={cur.badge}
                                onChange={(e) => {
                                  setMacroAreas({
                                    ...macroAreas,
                                    [selectedAdminAreaKey]: { ...cur, badge: e.target.value }
                                  });
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descrizione Area</label>
                            <textarea 
                              rows={3}
                              value={cur.description}
                              onChange={(e) => {
                                setMacroAreas({
                                  ...macroAreas,
                                  [selectedAdminAreaKey]: { ...cur, description: e.target.value }
                                });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                          </div>

                          {/* Contacts Editor */}
                          <div className="p-4 bg-slate-50 rounded-xl border space-y-3">
                            <h4 className="font-bold text-slate-800 text-xs uppercase">Contatti Sportello Reggio Emilia</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-500 font-semibold mb-1">Responsabile</label>
                                <input 
                                  type="text"
                                  value={cur.contacts.head}
                                  onChange={(e) => {
                                    setMacroAreas({
                                      ...macroAreas,
                                      [selectedAdminAreaKey]: { 
                                        ...cur, 
                                        contacts: { ...cur.contacts, head: e.target.value } 
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 border rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-500 font-semibold mb-1">Telefono</label>
                                <input 
                                  type="text"
                                  value={cur.contacts.phone}
                                  onChange={(e) => {
                                    setMacroAreas({
                                      ...macroAreas,
                                      [selectedAdminAreaKey]: { 
                                        ...cur, 
                                        contacts: { ...cur.contacts, phone: e.target.value } 
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 border rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-500 font-semibold mb-1">Email</label>
                                <input 
                                  type="text"
                                  value={cur.contacts.email}
                                  onChange={(e) => {
                                    setMacroAreas({
                                      ...macroAreas,
                                      [selectedAdminAreaKey]: { 
                                        ...cur, 
                                        contacts: { ...cur.contacts, email: e.target.value } 
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 border rounded-lg text-xs"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-emerald-50 text-[#006837] rounded-xl text-xs font-bold">
                            Modifiche salvate automaticamente nel database locale del browser.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* OTHER ADMIN SUB-TABS (branding, hero, deadlines) ... */}
                {adminSubTab === 'branding' && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#006837]" /> Modifica Titoli e Identità Visiva
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Applicazione</label>
                        <input 
                          type="text" 
                          value={appConfig.appName}
                          onChange={(e) => setAppConfig({...appConfig, appName: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sottotitolo Header</label>
                        <input 
                          type="text" 
                          value={appConfig.appSubtitle}
                          onChange={(e) => setAppConfig({...appConfig, appSubtitle: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* ... DOWNLOAD TAB ... */}
        {activeTab === 'download' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-emerald-100 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#006837]">
                <Smartphone className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Scarica & Installa l'Applicazione</h2>
              <p className="text-slate-600 text-sm">
                Questa applicazione è progettata per funzionare sia su <strong>Computer (Windows / Mac)</strong> che su <strong>Smartphone (Android e iPhone / iOS)</strong> come Web App Progressiva (PWA).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-[#006837]" />
                  <h3 className="font-bold text-slate-800">Su Smartphone (Android / iPhone)</h3>
                </div>
                <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                  <li>Apri il menu del browser (i 3 puntini su Chrome o il tasto "Condividi" su Safari).</li>
                  <li>Seleziona <strong>"Aggiungi a schermata Home"</strong> o <strong>"Installa app"</strong>.</li>
                </ol>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-3">
                <div className="flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-[#006837]" />
                  <h3 className="font-bold text-slate-800">Su Computer (Windows / Mac)</h3>
                </div>
                <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                  <li>Usa un browser moderno come Chrome, Edge o Brave.</li>
                  <li>Clicca sull'icona <strong>Installa</strong> nella barra degli indirizzi in alto a destra.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- APPOINTMENT REQUEST MODAL --- */}
      {appointmentModalArea && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button 
              onClick={() => setAppointmentModalArea(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 bg-emerald-100 text-[#006837] rounded-xl">
                {renderMacroIcon(appointmentModalArea.icon)}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">Prenota Appuntamento</h3>
                <span className="text-xs text-[#006837] font-bold">{appointmentModalArea.title}</span>
              </div>
            </div>

            <form onSubmit={handleSendAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Nome e Cognome / Referente</label>
                <input 
                  type="text"
                  required
                  placeholder="Es. Mario Rossi"
                  value={appointmentForm.name}
                  onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Nome Azienda Agricola / CUAA</label>
                <input 
                  type="text"
                  placeholder="Es. Soc. Agr. Le Colline"
                  value={appointmentForm.farmName}
                  onChange={(e) => setAppointmentForm({...appointmentForm, farmName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Telefono *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="333 1234567"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Data Preferita</label>
                  <input 
                    type="date"
                    value={appointmentForm.preferredDate}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Note / Oggetto della Richiesta</label>
                <textarea 
                  rows={2}
                  placeholder="Descrivi brevemente l'assistenza richiesta..."
                  value={appointmentForm.notes}
                  onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setAppointmentModalArea(null)}
                  className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Annulla
                </button>
                <button 
                  type="submit"
                  className="w-1/2 py-2 bg-[#006837] hover:bg-[#00522b] text-white font-bold rounded-xl shadow"
                >
                  Invia Richiesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE & EMERGENCY MODALS & LOGIN MODAL */}
      {/* ... existing modal codes ... */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-8">
            <div className="relative h-64">
              <img 
                src={selectedArticleModal.image} 
                alt={selectedArticleModal.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedArticleModal(null)}
                className="absolute top-3 right-3 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 left-3 bg-[#006837] text-white text-xs font-semibold px-3 py-1 rounded-md">
                {selectedArticleModal.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-400 font-medium">
                Pubblicato il {selectedArticleModal.date}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {selectedArticleModal.title}
              </h2>

              <p className="text-sm font-semibold text-slate-700 italic border-l-4 border-[#8DC63F] pl-3 py-1 bg-slate-50">
                {selectedArticleModal.summary}
              </p>

              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line pt-2">
                {selectedArticleModal.content}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedArticleModal(null)}
                  className="px-5 py-2 bg-slate-200 text-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-300"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-[#006837]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Accedi a Confagricoltura Informa</h3>
              <p className="text-xs text-slate-500 mt-1">Seleziona il profilo di accesso</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleLogin('farmer')}
                className="w-full p-4 border border-slate-200 rounded-xl hover:border-[#006837] hover:bg-emerald-50/50 transition-all text-left flex items-center gap-4 group"
              >
                <div className="p-3 bg-emerald-100 text-[#006837] rounded-lg group-hover:bg-[#006837] group-hover:text-white transition-colors">
                  <Wheat className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Accesso Agricoltore / Socio</h4>
                  <p className="text-xs text-slate-500">Visualizza notizie, scadenze, servizi e modulistica.</p>
                </div>
              </button>

              <button
                onClick={() => handleLogin('admin')}
                className="w-full p-4 border border-amber-300 rounded-xl hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left flex items-center gap-4 group bg-amber-50/30"
              >
                <div className="p-3 bg-amber-100 text-amber-800 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    Amministratore di Sistema <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-extrabold">ADMIN</span>
                  </h4>
                  <p className="text-xs text-slate-500">Modifica macro-aree, contatti, scadenze, ed avvisi.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#003d20] text-emerald-200 py-6 border-t border-emerald-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1">
              <Leaf className="w-5 h-5 text-[#006837]" />
            </div>
            <div>
              <p className="font-extrabold text-white">{appConfig.appName}</p>
              <p className="text-emerald-300/80">Via della Previdenza Sociale, 11 - Reggio Emilia (RE)</p>
            </div>
          </div>
          <div className="text-emerald-400 font-medium">
            © {new Date().getFullYear()} Confagricoltura Reggio Emilia - Tutti i diritti riservati.
          </div>
        </div>
      </footer>

    </div>
  );
}