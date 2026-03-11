import { useEffect, useRef, useState, type ComponentType, type MouseEvent, type ReactNode } from 'react'
import {
  FaCalendarCheck,
  FaChevronDown,
  FaCode,
  FaFlask,
  FaEnvelope,
  FaFilePdf,
  FaGithub,
  FaLanguage,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRobot,
  FaTools,
} from 'react-icons/fa'
import {
  SiAngular,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiJenkins,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { profile } from '../data/profile'

const frontendSkills = [
  { name: 'React', icon: SiReact },
  { name: 'Angular', icon: SiAngular },
  { name: 'Vite', icon: SiVite },
  { name: 'Tailwind', icon: SiTailwindcss },
]

const backendSkills = [
  { name: 'Spring Boot', icon: SiSpringboot },
  { name: 'Django', icon: SiDjango },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Express.js', icon: SiExpress },
]

const languageSkills = [
  { name: 'Java', icon: SiSpringboot },
  { name: 'Python', icon: SiPython },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'R', icon: FaTools },
]

const toolingSkills = [
  { name: 'Git', icon: SiGit },
  { name: 'Docker', icon: SiDocker },
  { name: 'Jenkins', icon: SiJenkins },
  { name: 'Azure / AWS', icon: FaTools },
  { name: 'CI/CD', icon: FaTools },
  { name: 'IntelliJ', icon: FaTools },
  { name: 'VS Code', icon: FaTools },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
]

const experiences = [
  {
    role: 'SIJO - Levallois-Perret',
    subtitle: "Stage fin d'études + CDD",
    period: '05/2024 - 03/2025',
    stack: [
      { name: 'Python', icon: SiPython },
      { name: 'Streamlit', icon: FaTools },
      { name: 'OCR DocTR', icon: FaTools },
      { name: 'GPT-4o', icon: FaRobot },
      { name: 'React', icon: SiReact },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Azure', icon: FaTools },
    ],
    context1Title: 'Contexte 1 : PFE',
    context1: [
      "Conception et développement d'une application Python/Streamlit permettant l'upload de CV hétérogènes (PDF, scans) et la génération automatique d'un dossier de compétences conforme au standard de l'entreprise.",
      "Pipeline automatisé : OCR + extraction et structuration d'entités via LLM (GPT-4o).",
      "Post-traitement par regex et génération dynamique d'un document MS Word avec placeholders (manipulation de la structure XML / librairie python-docx).",
      "Déploiement de l'application sur Microsoft Azure.",
      'Projet mené avec la méthodologie Agile (itérations courtes, échanges réguliers avec les équipes Business, rétrospective et amélioration continue).',
      'Résultat : Réduction de 90% du temps de traitement interne.',
      'Environnement technique : Python, OCR (DocTR), Streamlit, modèle IA GPT-4o, Microsoft Azure',
    ],
    context2Title: 'Contexte 2 : CDD',
    context2: [
      "Application web d'automatisation des relances de mails automatiques.",
      "Conception et développement d'une application web interne.",
      'Développement du frontend en React + Tailwind CSS.',
      'Développement du backend en Node.js avec Express.js.',
      "Intégration de l'authentification via compte Microsoft et déploiement sur Microsoft Azure.",
      'Environnement technique : Node.js, React, Tailwind CSS, REST API, Microsoft Azure',
    ],
  },
  {
    role: 'Save Energies (IDEX) - Boulogne-Billancourt',
    subtitle: 'Stage 6 mois',
    period: '04/2021 - 09/2021',
    stack: [
      { name: 'R', icon: FaTools },
      { name: 'Selenium', icon: FaTools },
      { name: 'VBA', icon: FaTools },
      { name: 'PowerShell', icon: FaTools },
      { name: 'API REST', icon: FaTools },
    ],
    context1Title: 'Missions',
    context1: [
      "Automatisation de processus métiers : collecte de données énergétiques, traitement/nettoyage des données, gestion des erreurs d'exécution, génération de reportings automatisés.",
      'Automatisation de la collecte via API REST et web scraping.',
      "Développement d'un outil de visualisation de données d'achat/vente de gaz.",
      "Développement de modèles de prévision de consommation énergétique et d'outils d'aide à la décision.",
      "Résultats : gain de temps et d'efficacité sur les reportings quotidiens.",
      'Environnement technique : R (Selenium), VBA, PowerShell',
    ],
  },
  {
    role: 'HP France SAS - Grenoble',
    subtitle: 'Business Intelligence - Stage 3 mois',
    period: '05/2019 - 08/2019',
    stack: [
      { name: 'QlikView', icon: FaTools },
      { name: 'Power BI', icon: FaTools },
      { name: 'SQL', icon: SiPostgresql },
      { name: 'Scripts Batch', icon: FaTools },
    ],
    context1Title: 'Missions',
    context1: [
      'Développement de dashboards décisionnels.',
      'Automatisation de scripts de mise à jour de données.',
      'Conception de dashboards interactifs sous QlikView et Power BI pour le reporting business.',
      'Nettoyage, structuration et modélisation de données (relations, tables de mapping).',
      "Automatisation de la collecte et de l'actualisation des données via scripts Batch.",
      'Travail en collaboration avec les équipes métiers (logistique, forecast).',
      'Environnement technique : QlikView, Power BI, SQL, Script Batch',
    ],
  },
]

const softSkills = [
  { name: 'Agilité', icon: FaRobot },
  { name: 'TDD', icon: FaFlask },
  { name: 'Clean Code', icon: FaCode },
  { name: 'Esprit analytique', icon: FaTools },
  { name: "Rigueur d'ingénierie", icon: FaTools },
  { name: 'Autonomie', icon: FaTools },
  { name: "Capacité d'adaptation", icon: FaTools },
  { name: 'Travail en équipe', icon: FaTools },
  { name: 'Écoute active', icon: FaTools },
  { name: 'Vulgarisation', icon: FaTools },
  { name: 'Gestion des priorités', icon: FaTools },
  { name: 'Communication technique', icon: FaTools },
  { name: 'Résolution de problèmes', icon: FaTools },
]

const projects = [
  {
    title: 'ekanpage',
    stack: 'TypeScript, React, Tailwind',
    result: 'Portfolio personnel interactif avec parcours CV et espace pédagogie.',
    link: 'https://github.com/Anir-kata/ekanpage',
  },
  {
    title: 'projet_saas',
    stack: 'Java 21, Spring Boot',
    result: 'Application SaaS backend orientée architecture moderne Java/Spring.',
    link: 'https://github.com/Anir-kata/projet_saas',
  },
  {
    title: 'Process_CVs_SpringBoot',
    stack: 'Java, Spring Boot',
    result: 'Gestion de CV avec API backend et logique métier de traitement.',
    link: 'https://github.com/Anir-kata/Process_CVs_SpringBoot',
  },
  {
    title: 'jobs_dashboard_FastAPI',
    stack: 'Python FastAPI, React',
    result: 'Dashboard emploi avec backend FastAPI et frontend React.',
    link: 'https://github.com/Anir-kata/jobs_dashboard_FastAPI',
  },
  {
    title: 'analyse_donnees_energetique',
    stack: 'Python, pipeline data',
    result: 'Pipeline de traitement de données énergétiques pour analyse opérationnelle.',
    link: 'https://github.com/Anir-kata/analyse_donnees_energetique',
  },
]

const profileStory = [
  {
    title: 'Mon profil',
    content:
      "Je suis diplômé de l'ENSIMAG. Je construis mes premières expériences fullstack avec une approche orientée performance, scalabilité et intégration propre.",
  },
  {
    title: 'Ma façon de travailler',
    content:
      "J'avance étape par étape, je demande du feedback tôt et je préfère un code clair avant un code trop complexe.",
  },
  {
    title: 'Ce que je recherche',
    content:
      "Continuer à progresser sur des projets concrets, encadré par une équipe exigeante, pour monter en niveau rapidement en frontend et backend.",
  },
]

const expertiseAreas = [
  {
    key: 'backend',
    label: 'Backend',
    title: 'Bases solides en backend',
    points: [
      'Conception d’APIs REST sur des cas réels (stages et projets personnels).',
      'Mise en pratique de Java, Python, TypeScript, Node.js et R selon le contexte.',
      'Structuration du code backend pour rester lisible et maintenable.',
      'Gestion des validations d’entrée, des erreurs et des réponses API.',
      'Premières intégrations cloud (Azure) et déploiements simples.',
      'Automatisation de traitements data/reporting sur des besoins métier.',
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    title: 'Frontend moderne orienté produit',
    points: [
      'Développement en React + TypeScript avec composants réutilisables.',
      'Création d’interfaces lisibles, responsives et agréables à utiliser.',
      'Utilisation de Tailwind pour accélérer le développement UI.',
      'Animations et interactions légères pour améliorer l’expérience utilisateur.',
      'Connexion aux APIs avec gestion du chargement et des erreurs.',
      'Attention portée à la clarté visuelle et à la cohérence globale.',
    ],
  },
  {
    key: 'algo',
    label: 'Algorithmie et Analyse Mathématique',
    title: 'Rigueur analytique appliquée',
    points: [
      'Résolution de problèmes en gardant une logique claire et structurée.',
      'Analyse mathématique utile pour la data, la prévision et l’aide à la décision.',
      'Traitement et nettoyage de données hétérogènes sur des cas métiers.',
      'Réflexion sur la complexité et le coût des traitements quand c’est nécessaire.',
      'Approche rigoureuse héritée de ma formation scientifique (MPSI/MP + ENSIMAG).',
      'Capacité à vulgariser un raisonnement technique pour le rendre compréhensible.',
    ],
  },
] as const

const faqItems = [
  {
    question: 'Quel poste je recherche ?',
    answer: 'Un poste de développeur fullstack avec des projets concrets et une vraie montée en compétence.',
  },
  {
    question: 'Pourquoi ce portfolio ?',
    answer: 'Présenter mon parcours, montrer mes projets et donner une image fidèle de mes compétences !',
  },
  {
    question: 'Comment je travaille ?',
    answer: 'Je travaille de façon pragmatique: comprendre le besoin, avancer vite sur une première version, puis améliorer avec les retours.',
  },
  {
    question: 'Quelles technologies je maîtrise le mieux ?',
    answer: 'Java, Python, TypeScript, Node.js et R, avec React/Tailwind/Angular côté interface.',
  },
  {
    question: 'Disponible pour échanger ?',
    answer: 'Oui, je suis ouvert à discuter. N’hésitez pas à me contacter pour en savoir plus !',
  },
]

type ExperienceItem = {
  role: string
  subtitle: string
  period: string
  stack: Array<{ name: string; icon: ComponentType<{ className?: string }> }>
  context1Title: string
  context1: string[]
  context2Title?: string
  context2?: string[]
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const dx = (x / rect.width) * 2 - 1
    const dy = (y / rect.height) * 2 - 1

    ref.current.style.setProperty('--mx', `${x}px`)
    ref.current.style.setProperty('--my', `${y}px`)
    ref.current.style.setProperty('--rx', `${-dy * 6}deg`)
    ref.current.style.setProperty('--ry', `${dx * 7}deg`)
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} className={`interactive-card ${className}`.trim()} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}

function SkillOrb({ name, icon: Icon, delay }: { name: string; icon: ComponentType<{ className?: string }>; delay: number }) {
  return (
    <div className="skill-orb inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100" style={{ animationDelay: `${delay}ms` }}>
      <Icon className="text-cyan-200" />
      {name}
    </div>
  )
}

type CVProfileProps = {
  onOpenPedagogy: () => void
}

export function CVProfile({ onOpenPedagogy }: CVProfileProps) {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null)
  const [openedFaq, setOpenedFaq] = useState<number | null>(0)

  return (
    <section id="portfolio" className="mt-6 grid gap-6">
      <Reveal>
        <article className="panel scan-line rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Portfolio</p>
        <h2 className="hud-title mt-3 text-2xl font-black text-slate-100 sm:text-3xl">
          {profile.fullName} - {profile.title}
        </h2>
        {profile.pitchLines.map((line) => (
          <p key={line} className="mt-3 text-slate-300">
            {line}
          </p>
        ))}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <a
            href={profile.cvPdfPath}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-400/15 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:shadow-[0_0_22px_rgba(129,140,248,0.35)]"
          >
            <FaFilePdf />
            Télécharger PDF
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/55 hover:text-cyan-100"
          >
            <FaEnvelope />
            Contact
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-cyan-300/25 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)] active:translate-y-0 active:scale-[0.98]"
            onClick={onOpenPedagogy}
          >
            Accéder au tableau de bord d'enseignement
          </button>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-semibold text-emerald-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          Disponible pour CDI
        </div>
        </article>
      </Reveal>

      <Reveal delay={80}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">À propos</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {profileStory.map((item) => (
              <TiltCard key={item.title} className="panel-soft rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.content}</p>
              </TiltCard>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={90}>
        <article className="panel rounded-2xl p-6">
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaMapMarkerAlt />
              Localisation
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.location}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaCalendarCheck />
              Disponibilité
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.availability}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaLanguage />
              Langues
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.languages}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaTools />
              Statut
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.status}</p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={100}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">Expertise</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {expertiseAreas.map((area) => (
              <TiltCard key={area.key} className="panel-soft rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{area.label}</p>
                <p className="mt-2 text-sm font-semibold text-cyan-100">{area.title}</p>
                <div className="mt-3 grid gap-2">
                  {area.points.map((point) => (
                    <p key={point} className="text-sm text-slate-300">
                      • {point}
                    </p>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={120}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Compétences</h3>
        <div className="panel-soft mt-4 rounded-xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Langages maîtrisés</p>
          <div className="skill-flow mt-3 flex flex-wrap gap-2">
            {languageSkills.map((skill, index) => (
              <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Frontend</p>
            <div className="skill-flow flex flex-wrap gap-2">
              {frontendSkills.map((skill, index) => (
                <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Backend</p>
            <div className="skill-flow flex flex-wrap gap-2">
              {backendSkills.map((skill, index) => (
                <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Outils</p>
            <div className="skill-flow mt-3 flex flex-wrap gap-2">
              {toolingSkills.map((skill, index) => {
                const Icon = skill.icon
                return <SkillOrb key={skill.name} name={skill.name} icon={Icon} delay={index * 100} />
              })}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Soft skills</p>
            <div className="skill-flow mt-3 flex flex-wrap gap-2">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon
                return <SkillOrb key={skill.name} name={skill.name} icon={Icon} delay={index * 130} />
              })}
            </div>
          </div>
        </div>
        </article>
      </Reveal>

      <Reveal delay={160}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Expériences</h3>
        <div className="relative mt-5 grid gap-5 before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-10px)] before:w-px before:bg-cyan-300/30 sm:before:left-3">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative pl-9">
              <span className="absolute left-0 top-2 h-5 w-5 rounded-full bg-cyan-300/20 shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
              <TiltCard className="panel-soft rounded-xl">
                <button
                  className="w-full rounded-xl p-4 text-left transition hover:scale-[1.02]"
                  onClick={() => setSelectedExperience(experience)}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{experience.period}</p>
                  <h4 className="mt-1 text-lg font-semibold text-slate-100">{experience.role}</h4>
                  <p className="mt-1 text-sm font-semibold text-cyan-100">{experience.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.stack.map((item) => {
                      const Icon = item.icon
                      return (
                        <span key={item.name} className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-2.5 py-1 text-xs text-cyan-100">
                          <Icon className="text-cyan-200" />
                          {item.name}
                        </span>
                      )
                    })}
                  </div>
                  <p className="mt-3 text-right text-sm text-slate-300">Cliquer pour voir les détails</p>
                </button>
              </TiltCard>
            </div>
          ))}
        </div>
        </article>
      </Reveal>

      <Reveal delay={220}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Formation et certifications</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Diplôme ingénieur - 2025</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-[96px_1fr]">
              <div className="rounded-xl bg-slate-900/30 p-2">
                <img src="/logo_ensimag.png" alt="Logo ENSIMAG" className="h-20 w-20 object-contain" />
              </div>
              <div className="rounded-xl bg-slate-900/30 p-3">
                <p className="font-semibold text-slate-100">
                  ENSIMAG - École nationale supérieure d'informatique et de mathématiques appliquées de Grenoble
                </p>
                <p className="mt-2 text-sm text-slate-300">Spécialisation : Ingénierie des Systèmes d'Information</p>
              </div>
            </div>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Autres formations</p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              Classes préparatoires aux grandes écoles MPSI / MP (Grand Admis au concours CCP)
            </p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              Baccalauréat Scientifique - Spécialité Mathématiques (Mention Très bien)
            </p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={260}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Projets personnels</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <TiltCard key={project.title} className="panel-soft rounded-xl p-4">
              <h4 className="text-base font-semibold text-slate-100">{project.title}</h4>
              <p className="mt-2 text-sm text-cyan-100">Stack : {project.stack}</p>
              <p className="mt-2 text-sm text-slate-300">{project.result}</p>
              {project.link && (
                <div className="mt-3 flex justify-end">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
                  >
                    <FaGithub />
                    Voir sur GitHub
                  </a>
                </div>
              )}
            </TiltCard>
          ))}
        </div>
        </article>
      </Reveal>

      <Reveal delay={300}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Pédagogie: passion et soft skill</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Passion</p>
            <p className="mt-2 text-sm text-slate-300">J’aime transmettre, expliquer simplement et aider quelqu’un à progresser sur un sujet difficile.</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Soft skills associées</p>
            <p className="mt-2 text-sm text-slate-300">Écoute, patience, reformulation et adaptation du discours selon la personne en face.</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Impact</p>
            <p className="mt-2 text-sm text-slate-300">Au quotidien, ça m’aide à écrire un code plus clair et à mieux collaborer avec une équipe produit/tech.</p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={340}>
        <article id="contact" className="panel rounded-2xl p-6 text-center">
        <h3 className="hud-title text-xl font-bold text-cyan-200">Contact</h3>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-800/45 px-3 py-2 text-slate-300 hover:text-cyan-100">
            <FaEnvelope className="text-cyan-200" />
            {profile.email}
          </a>
          <a href={`tel:${profile.phoneLink}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-800/45 px-3 py-2 text-slate-300 hover:text-cyan-100">
            <FaPhoneAlt className="text-cyan-200" />
            {profile.phoneDisplay}
          </a>
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800/45 px-3 py-2 text-slate-300 hover:text-cyan-100"
          >
            <FaLinkedin className="text-cyan-200" />
            LinkedIn
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800/45 px-3 py-2 text-slate-300 hover:text-cyan-100"
          >
            <FaGithub className="text-cyan-200" />
            GitHub
          </a>
        </div>
        </article>
      </Reveal>

      <Reveal delay={360}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">Questions fréquentes</h3>
          <div className="mt-4 grid gap-3">
            {faqItems.map((item, index) => {
              const opened = openedFaq === index
              return (
                <div key={item.question} className="panel-soft rounded-xl">
                  <button
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    onClick={() => setOpenedFaq((prev) => (prev === index ? null : index))}
                  >
                    <span className="text-sm font-semibold text-slate-100">{item.question}</span>
                    <FaChevronDown
                      className={`text-cyan-200 transition ${opened ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {opened && <p className="px-4 pb-4 text-sm text-slate-300">{item.answer}</p>}
                </div>
              )
            })}
          </div>
        </article>
      </Reveal>

      {selectedExperience && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4">
          <div className="panel max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{selectedExperience.period}</p>
                <h4 className="mt-1 text-xl font-semibold text-slate-100">{selectedExperience.role}</h4>
                <p className="mt-1 text-sm font-semibold text-cyan-100">{selectedExperience.subtitle}</p>
              </div>
              <button
                className="rounded-lg bg-slate-900/60 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800/70 hover:text-cyan-100"
                onClick={() => setSelectedExperience(null)}
              >
                Fermer
              </button>
            </div>

            <div className="mt-5 grid gap-2">
              <p className="text-sm font-semibold text-indigo-200">{selectedExperience.context1Title}</p>
              {selectedExperience.context1.map((line) => (
                <p key={line} className="text-sm text-slate-300">
                  - {line}
                </p>
              ))}
            </div>

            {selectedExperience.context2Title && selectedExperience.context2 && (
              <div className="mt-5 grid gap-2">
                <p className="text-sm font-semibold text-indigo-200">{selectedExperience.context2Title}</p>
                {selectedExperience.context2.map((line) => (
                  <p key={line} className="text-sm text-slate-300">
                    - {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
