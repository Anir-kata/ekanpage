import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
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
  SiIntellijidea,
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
import { TbBrandVscode } from 'react-icons/tb'
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
  { name: 'IntelliJ', icon: SiIntellijidea },
  { name: 'VS Code', icon: TbBrandVscode },
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
    title: 'Portfolio personnel - ekanpage',
    stack: 'TypeScript, React, Nest.js',
    result: 'Portfolio personnel interactif avec parcours CV et espace pédagogie.',
    link: 'https://github.com/Anir-kata/ekanpage',
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
    title: 'Analyse_donnees_energetique',
    stack: 'Python',
    result: 'Pipeline de traitement de données énergétiques pour analyse opérationnelle.',
    link: 'https://github.com/Anir-kata/analyse_donnees_energetique',
  },
]

const universityProjects = [
  {
    title: 'Compilateur Déca',
    subtitle: 'Projet académique - Génie Logiciel (ENSIMAG)',
    description:
      "Développement en équipe d'un compilateur pour le langage Déca (langage pédagogique proche de Java), avec implémentation des différentes phases de compilation et application de pratiques modernes de développement logiciel.",
    tasks: [
      'Conception et implémentation des phases du compilateur.',
      "Développement de l'analyse lexicale et syntaxique avec ANTLR.",
      "Implémentation de l'analyse sémantique (types, symboles).",
      "Développement de la génération de code cible pour l'exécution.",
      'Mise en place de tests automatisés et approche TDD.',
      'Utilisation de la couverture de code pour améliorer la qualité.',
      'Travail collaboratif avec Git, pair programming et intégration continue.',
    ],
    environment: [
      'Langage: Java',
      'Outils: ANTLR, Maven, Git',
      'Qualité: Cobertura, tests automatisés',
      'IDE: Eclipse',
      'Méthodes: TDD, intégration continue, programmation par paires',
    ],
  },
  {
    title: 'Smart Jogging',
    subtitle: 'Projet FABLAB - Application mobile Android',
    description:
      "Application Android d'analyse de performance en course à pied, basée sur des données biomécaniques (accéléromètre, gyroscope, capteurs de pression) avec suivi en temps réel et post-entraînement.",
    tasks: [
      "Conception et développement d'une application Android de suivi d'entraînements.",
      "Implémentation des écrans: authentification, accueil, entraînement, historique, profil.",
      'Intégration Google Maps pour la géolocalisation et le parcours.',
      "Développement d'une base locale pour profils et historique.",
      "Conception d'algorithmes: fréquence de foulée, estimation de vitesse, analyse d'appuis.",
      'Étude et implémentation de la communication Bluetooth Low Energy (BLE/GATT).',
      "Mise en place d'une machine d'état pour la lecture séquentielle des capteurs.",
      'Système de feedback temps réel (alertes visuelles et sonores).',
      "Participation aux réunions techniques avec des experts systèmes embarqués.",
    ],
    environment: [
      'Langage: Java',
      'Mobile: Android SDK',
      'IoT: Bluetooth Low Energy (BLE), GATT',
      'Capteurs: accéléromètre, gyroscope, capteurs de pression',
      'Cartographie: Google Maps API',
      'Stockage: SQLite (Android)',
      "Traitement: algorithmes d'analyse de signal",
    ],
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
    answer: 'Java, Python, TypeScript, Node.js et R, avec React/Angular côté frontend.',
  },
  {
    question: 'Disponible pour échanger ?',
    answer: 'Oui, je suis ouvert à discuter. N’hésitez pas à me contacter pour en savoir plus !',
  },
]

const experiencesEn = [
  {
    role: 'SIJO - Levallois-Perret',
    subtitle: 'End-of-study internship + fixed-term contract',
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
    context1Title: 'Context 1: Final-year project',
    context1: [
      'Designed and built a Python/Streamlit application to upload heterogeneous CVs (PDFs, scans) and automatically generate a skills file matching company standards.',
      'Automated pipeline: OCR plus entity extraction and structuring through an LLM (GPT-4o).',
      'Post-processing with regex and dynamic generation of MS Word documents with placeholders (XML structure manipulation / python-docx).',
      'Application deployment on Microsoft Azure.',
      'Project delivered with Agile methodology (short iterations, regular collaboration with business teams, retrospectives, and continuous improvement).',
      'Result: 90% reduction of internal processing time.',
      'Technical environment: Python, OCR (DocTR), Streamlit, GPT-4o, Microsoft Azure',
    ],
    context2Title: 'Context 2: Fixed-term contract',
    context2: [
      'Web application to automate follow-up email campaigns.',
      'Design and development of an internal web application.',
      'Frontend development with React and Tailwind CSS.',
      'Backend development with Node.js and Express.js.',
      'Microsoft account authentication integration and deployment on Microsoft Azure.',
      'Technical environment: Node.js, React, Tailwind CSS, REST API, Microsoft Azure',
    ],
  },
  {
    role: 'Save Energies (IDEX) - Boulogne-Billancourt',
    subtitle: '6-month internship',
    period: '04/2021 - 09/2021',
    stack: [
      { name: 'R', icon: FaTools },
      { name: 'Selenium', icon: FaTools },
      { name: 'VBA', icon: FaTools },
      { name: 'PowerShell', icon: FaTools },
      { name: 'REST API', icon: FaTools },
    ],
    context1Title: 'Main responsibilities',
    context1: [
      'Business process automation: energy data collection, data cleaning and processing, runtime error management, and automated reporting generation.',
      'Automated data collection through REST APIs and web scraping.',
      'Built a data visualization tool for gas purchase and sales data.',
      'Developed energy consumption forecasting models and decision-support tools.',
      'Results: measurable time and efficiency gains for daily reporting.',
      'Technical environment: R (Selenium), VBA, PowerShell',
    ],
  },
  {
    role: 'HP France SAS - Grenoble',
    subtitle: 'Business Intelligence - 3-month internship',
    period: '05/2019 - 08/2019',
    stack: [
      { name: 'QlikView', icon: FaTools },
      { name: 'Power BI', icon: FaTools },
      { name: 'SQL', icon: SiPostgresql },
      { name: 'Batch scripts', icon: FaTools },
    ],
    context1Title: 'Main responsibilities',
    context1: [
      'Built decision-making dashboards.',
      'Automated data update scripts.',
      'Designed interactive dashboards in QlikView and Power BI for business reporting.',
      'Data cleaning, structuring, and modeling (relationships, mapping tables).',
      'Automated data collection and refresh with batch scripts.',
      'Collaborated with business teams (logistics, forecasting).',
      'Technical environment: QlikView, Power BI, SQL, Batch scripting',
    ],
  },
]

const profileStoryEn = [
  {
    title: 'My profile',
    content:
      'I graduated from ENSIMAG. I am building my early fullstack experience with a strong focus on performance, scalability, and clean integration.',
  },
  {
    title: 'How I work',
    content:
      'I move step by step, ask for feedback early, and prioritize clear code over unnecessary complexity.',
  },
  {
    title: 'What I am looking for',
    content:
      'I want to keep progressing through concrete projects in a demanding team environment, and quickly level up in both frontend and backend development.',
  },
]

const expertiseAreasEn = [
  {
    key: 'backend',
    label: 'Backend',
    title: 'Strong backend foundations',
    points: [
      'Designed REST APIs on real-world projects (internships and personal projects).',
      'Used Java, Python, TypeScript, Node.js, and R depending on context.',
      'Structured backend code to keep it readable and maintainable.',
      'Handled input validation, error management, and API responses.',
      'First cloud integrations (Azure) and simple deployments.',
      'Automated data and reporting workflows for business needs.',
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    title: 'Modern product-oriented frontend',
    points: [
      'Developed with React and TypeScript using reusable components.',
      'Built readable, responsive, and user-friendly interfaces.',
      'Used Tailwind to accelerate UI development.',
      'Added lightweight animations and interactions to improve UX.',
      'Integrated APIs with loading and error states.',
      'Focused on visual clarity and overall consistency.',
    ],
  },
  {
    key: 'algo',
    label: 'Algorithms and Applied Mathematics',
    title: 'Applied analytical rigor',
    points: [
      'Solved problems using a clear and structured approach.',
      'Applied mathematical analysis to data, forecasting, and decision support.',
      'Processed and cleaned heterogeneous datasets on business cases.',
      'Considered complexity and processing cost when relevant.',
      'Used a rigorous method inherited from my scientific background (MPSI/MP + ENSIMAG).',
      'Able to explain technical reasoning in simple terms.',
    ],
  },
] as const

const softSkillsEn = [
  { name: 'Agility', icon: FaRobot },
  { name: 'TDD', icon: FaFlask },
  { name: 'Clean Code', icon: FaCode },
  { name: 'Analytical mindset', icon: FaTools },
  { name: 'Engineering rigor', icon: FaTools },
  { name: 'Autonomy', icon: FaTools },
  { name: 'Adaptability', icon: FaTools },
  { name: 'Teamwork', icon: FaTools },
  { name: 'Active listening', icon: FaTools },
  { name: 'Knowledge sharing', icon: FaTools },
  { name: 'Prioritization', icon: FaTools },
  { name: 'Technical communication', icon: FaTools },
  { name: 'Problem solving', icon: FaTools },
]

const projectsEn = [
  {
    title: 'Personal portfolio - ekanpage',
    stack: 'TypeScript, React, Nest.js',
    result: 'Interactive personal portfolio with CV journey and teaching workspace.',
    link: 'https://github.com/Anir-kata/ekanpage',
  },
  {
    title: 'Process_CVs_SpringBoot',
    stack: 'Java, Spring Boot',
    result: 'CV management with backend API and business processing logic.',
    link: 'https://github.com/Anir-kata/Process_CVs_SpringBoot',
  },
  {
    title: 'jobs_dashboard_FastAPI',
    stack: 'Python FastAPI, React',
    result: 'Job dashboard with FastAPI backend and React frontend.',
    link: 'https://github.com/Anir-kata/jobs_dashboard_FastAPI',
  },
  {
    title: 'analyse_donnees_energetique',
    stack: 'Python',
    result: 'Energy data processing pipeline for operational analysis.',
    link: 'https://github.com/Anir-kata/analyse_donnees_energetique',
  },
]

const universityProjectsEn = [
  {
    title: 'Deca compiler',
    subtitle: 'Academic project - Software Engineering (ENSIMAG)',
    description:
      'Team development of a compiler for the Deca language (an educational Java-like language), including all compilation phases and modern software engineering practices.',
    tasks: [
      'Designed and implemented compiler phases.',
      'Developed lexical and syntax analysis with ANTLR.',
      'Implemented semantic analysis (types and symbols).',
      'Developed target code generation for execution.',
      'Set up automated tests with a TDD approach.',
      'Used code coverage to improve quality.',
      'Collaborated with Git, pair programming, and continuous integration.',
    ],
    environment: [
      'Language: Java',
      'Tools: ANTLR, Maven, Git',
      'Quality: Cobertura, automated tests',
      'IDE: Eclipse',
      'Methods: TDD, continuous integration, pair programming',
    ],
  },
  {
    title: 'Smart Jogging',
    subtitle: 'FABLAB project - Android mobile application',
    description:
      'Android application for running performance analysis based on biomechanical data (accelerometer, gyroscope, pressure sensors) with real-time and post-workout tracking.',
    tasks: [
      'Designed and developed an Android training tracking application.',
      'Implemented screens: authentication, home, training, history, and profile.',
      'Integrated Google Maps for geolocation and route display.',
      'Developed local storage for profiles and history.',
      'Designed algorithms for cadence, speed estimation, and foot-strike analysis.',
      'Studied and implemented Bluetooth Low Energy communication (BLE/GATT).',
      'Built a state machine for sequential sensor data reading.',
      'Implemented real-time feedback (visual and audio alerts).',
      'Participated in technical meetings with embedded systems experts.',
    ],
    environment: [
      'Language: Java',
      'Mobile: Android SDK',
      'IoT: Bluetooth Low Energy (BLE), GATT',
      'Sensors: accelerometer, gyroscope, pressure sensors',
      'Mapping: Google Maps API',
      'Storage: SQLite (Android)',
      'Processing: signal analysis algorithms',
    ],
  },
]

const faqItemsEn = [
  {
    question: 'What role am I looking for?',
    answer: 'A fullstack developer role with concrete projects and real growth opportunities.',
  },
  {
    question: 'Why this portfolio?',
    answer: 'To present my background, showcase my projects, and provide a clear view of my skills.',
  },
  {
    question: 'How do I work?',
    answer: 'I work pragmatically: understand the need, ship a first useful version quickly, then improve through feedback.',
  },
  {
    question: 'Which technologies am I strongest with?',
    answer: 'Java, Python, TypeScript, Node.js, and R, with React and Angular on the frontend side.',
  },
  {
    question: 'Available to connect?',
    answer: 'Yes, I am open to discuss. Feel free to reach out for more details.',
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

function SkillOrb({
  name,
  icon: Icon,
  delay,
  variant = 'technical',
}: {
  name: string
  icon: ComponentType<{ className?: string }>
  delay: number
  variant?: 'technical' | 'soft'
}) {
  const skillClasses =
    variant === 'technical'
      ? 'skill-orb skill-orb--technical inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-cyan-100'
      : 'skill-orb skill-orb--soft inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-cyan-100'

  return (
    <div className={skillClasses} style={{ '--skill-delay': `${delay}ms` } as CSSProperties}>
      <span className="skill-orb__icon" aria-hidden="true">
        <Icon className="text-cyan-200" />
      </span>
      <span className="skill-orb__label">{name}</span>
    </div>
  )
}

type CVProfileProps = {
  onOpenPedagogy: () => void
  language: 'fr' | 'en'
}

export function CVProfile({ onOpenPedagogy, language }: CVProfileProps) {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null)
  const [openedFaq, setOpenedFaq] = useState<number | null>(0)
  const copy =
    language === 'fr'
      ? {
          portfolio: 'Portfolio',
          profileTitle: profile.title,
          pitchLines: profile.pitchLines,
          downloadPdf: 'Télécharger PDF',
          contact: 'Contact',
          openDashboard: "Accéder au tableau de bord d'enseignement",
          available: 'Disponible pour CDI',
          about: 'À propos',
          locationLabel: 'Localisation',
          locationValue: profile.location,
          availabilityLabel: 'Disponibilité',
          availabilityValue: profile.availability,
          languagesLabel: 'Langues',
          languagesValue: profile.languages,
          statusLabel: 'Statut',
          statusValue: profile.status,
          expertise: 'Expertise',
          skills: 'Compétences',
          masteredLanguages: 'Langages maîtrisés',
          frontendLabel: 'Frontend',
          backendLabel: 'Backend',
          toolsLabel: 'Outils',
          softSkillsLabel: 'Soft skills',
          experiences: 'Expériences',
          education: 'Formation et certifications',
          engineeringDegree: 'Diplôme ingénieur - 2025',
          engineeringSchool: "ENSIMAG - École nationale supérieure d'informatique et de mathématiques appliquées de Grenoble",
          specialization: "Spécialisation : Ingénierie des Systèmes d'Information",
          otherEducation: 'Autres formations',
          cpge: 'Classes préparatoires aux grandes écoles MPSI / MP (Grand Admis au concours CCP)',
          baccalaureate: 'Baccalauréat Scientifique - Spécialité Mathématiques (Mention Très bien)',
          personalProjects: 'Projets personnels',
          universityProjects: 'Projets universitaires',
          teaching: 'Pédagogie: passion et soft skill',
          teachingPassionTitle: 'Passion',
          teachingPassionText: 'J’aime transmettre, expliquer simplement et aider quelqu’un à progresser sur un sujet difficile.',
          teachingSoftTitle: 'Soft skills associées',
          teachingSoftText: 'Écoute, patience, reformulation et adaptation du discours selon la personne en face.',
          teachingImpactTitle: 'Impact',
          teachingImpactText: 'Au quotidien, ça m’aide à écrire un code plus clair et à mieux collaborer avec une équipe produit/tech.',
          faq: 'Questions fréquentes',
          contactTitle: 'Contact',
          viewOnGithub: 'Voir sur GitHub',
          clickForDetails: 'Cliquer pour voir les détails',
          close: 'Fermer',
          tasks: 'Tâches',
          technicalEnvironment: 'Environnement technique',
        }
      : {
          portfolio: 'Portfolio',
          profileTitle: 'ENSIMAG Graduate, Fullstack Developer',
          pitchLines: [
            'ENSIMAG graduate engineer, with a scientific background followed by MPSI/MP preparatory classes.',
            'Hands-on experience in API design, web application development, business process automation, and cloud deployment.',
            'Strong command of Java and Python, with a quality-driven mindset (Agile practices, TDD, CI/CD, automated testing).',
          ],
          downloadPdf: 'Download PDF',
          contact: 'Contact',
          openDashboard: 'Open teaching dashboard',
          available: 'Open to full-time opportunities',
          about: 'About',
          locationLabel: 'Location',
          locationValue: 'Paris (75014) / Lyon (69007)',
          availabilityLabel: 'Availability',
          availabilityValue: 'Immediate',
          languagesLabel: 'Languages',
          languagesValue: 'French, English',
          statusLabel: 'Status',
          statusValue: 'Available for full-time role',
          expertise: 'Expertise',
          skills: 'Skills',
          masteredLanguages: 'Core languages',
          frontendLabel: 'Frontend',
          backendLabel: 'Backend',
          toolsLabel: 'Tools',
          softSkillsLabel: 'Soft skills',
          experiences: 'Experience',
          education: 'Education and certifications',
          engineeringDegree: 'Engineering degree - 2025',
          engineeringSchool: 'ENSIMAG - National School of Computer Science and Applied Mathematics of Grenoble',
          specialization: 'Specialization: Information Systems Engineering',
          otherEducation: 'Other education',
          cpge: 'MPSI/MP preparatory classes for engineering schools (high ranking in CCP exam)',
          baccalaureate: 'Scientific baccalaureate - Mathematics major (highest honors)',
          personalProjects: 'Personal projects',
          universityProjects: 'Academic projects',
          teaching: 'Teaching: passion and soft skills',
          teachingPassionTitle: 'Passion',
          teachingPassionText: 'I enjoy teaching, explaining clearly, and helping someone progress on a difficult topic.',
          teachingSoftTitle: 'Associated soft skills',
          teachingSoftText: 'Listening, patience, reframing, and adapting communication to each person.',
          teachingImpactTitle: 'Impact',
          teachingImpactText: 'In daily work, this helps me write clearer code and collaborate better with product and tech teams.',
          faq: 'FAQ',
          contactTitle: 'Contact',
          viewOnGithub: 'View on GitHub',
          clickForDetails: 'Click to view details',
          close: 'Close',
          tasks: 'Tasks',
          technicalEnvironment: 'Technical environment',
        }

  const profileStoryItems = language === 'fr' ? profileStory : profileStoryEn
  const expertiseAreaItems = language === 'fr' ? expertiseAreas : expertiseAreasEn
  const experiencesItems = language === 'fr' ? experiences : experiencesEn
  const softSkillsItems = language === 'fr' ? softSkills : softSkillsEn
  const projectsItems = language === 'fr' ? projects : projectsEn
  const universityProjectsItems = language === 'fr' ? universityProjects : universityProjectsEn
  const faqItemsData = language === 'fr' ? faqItems : faqItemsEn

  return (
    <section id="portfolio" className="mt-6 grid gap-6">
      <Reveal>
        <article className="panel scan-line rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">{copy.portfolio}</p>
        <h2 className="hud-title mt-3 text-2xl font-black text-slate-100 sm:text-3xl">
          {profile.fullName} - {copy.profileTitle}
        </h2>
        {copy.pitchLines.map((line) => (
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
            {copy.downloadPdf}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/55 hover:text-cyan-100"
          >
            <FaEnvelope />
            {copy.contact}
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-cyan-300/25 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)] active:translate-y-0 active:scale-[0.98]"
            onClick={onOpenPedagogy}
          >
            {copy.openDashboard}
          </button>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-semibold text-emerald-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          {copy.available}
        </div>
        </article>
      </Reveal>

      <Reveal delay={80}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.about}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {profileStoryItems.map((item) => (
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
              {copy.locationLabel}
            </p>
            <p className="mt-2 font-semibold text-slate-100">{copy.locationValue}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaCalendarCheck />
              {copy.availabilityLabel}
            </p>
            <p className="mt-2 font-semibold text-slate-100">{copy.availabilityValue}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaLanguage />
              {copy.languagesLabel}
            </p>
            <p className="mt-2 font-semibold text-slate-100">{copy.languagesValue}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaTools />
              {copy.statusLabel}
            </p>
            <p className="mt-2 font-semibold text-slate-100">{copy.statusValue}</p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={100}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.expertise}</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {expertiseAreaItems.map((area) => (
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
        <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.skills}</h3>
        <div className="panel-soft mt-4 rounded-xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.masteredLanguages}</p>
          <div className="skill-flow mt-3 flex flex-wrap gap-2">
            {languageSkills.map((skill, index) => (
              <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.frontendLabel}</p>
            <div className="skill-flow flex flex-wrap gap-2">
              {frontendSkills.map((skill, index) => (
                <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.backendLabel}</p>
            <div className="skill-flow flex flex-wrap gap-2">
              {backendSkills.map((skill, index) => (
                <SkillOrb key={skill.name} name={skill.name} icon={skill.icon} delay={index * 120} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.toolsLabel}</p>
            <div className="skill-flow mt-3 flex flex-wrap gap-2">
              {toolingSkills.map((skill, index) => {
                const Icon = skill.icon
                return <SkillOrb key={skill.name} name={skill.name} icon={Icon} delay={index * 100} />
              })}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.softSkillsLabel}</p>
            <div className="skill-flow mt-3 flex flex-wrap gap-2">
              {softSkillsItems.map((skill, index) => {
                const Icon = skill.icon
                return <SkillOrb key={skill.name} name={skill.name} icon={Icon} delay={index * 130} variant="soft" />
              })}
            </div>
          </div>
        </div>
        </article>
      </Reveal>

      <Reveal delay={160}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.experiences}</h3>
        <div className="relative mt-5 grid gap-5 before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-10px)] before:w-px before:bg-cyan-300/30 sm:before:left-3">
          {experiencesItems.map((experience) => (
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
                  <p className="mt-3 text-right text-sm text-slate-300">{copy.clickForDetails}</p>
                </button>
              </TiltCard>
            </div>
          ))}
        </div>
        </article>
      </Reveal>

      <Reveal delay={220}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.education}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.engineeringDegree}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-[96px_1fr]">
              <div className="rounded-xl bg-slate-900/30 p-2">
                <img src="/logo_ensimag.png" alt="Logo ENSIMAG" className="h-20 w-20 object-contain" />
              </div>
              <div className="rounded-xl bg-slate-900/30 p-3">
                <p className="font-semibold text-slate-100">
                  {copy.engineeringSchool}
                </p>
                <p className="mt-2 text-sm text-slate-300">{copy.specialization}</p>
              </div>
            </div>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.otherEducation}</p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              {copy.cpge}
            </p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              {copy.baccalaureate}
            </p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={260}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.personalProjects}</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {projectsItems.map((project) => (
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
                    {copy.viewOnGithub}
                  </a>
                </div>
              )}
            </TiltCard>
          ))}
        </div>
        </article>
      </Reveal>

      <Reveal delay={280}>
        <article className="panel rounded-2xl p-6">
          <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.universityProjects}</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {universityProjectsItems.map((project) => (
              <TiltCard key={project.title} className="panel-soft rounded-xl p-4">
                <h4 className="text-base font-semibold text-slate-100">{project.title}</h4>
                <p className="mt-1 text-sm font-semibold text-cyan-100">{project.subtitle}</p>
                <p className="mt-3 text-sm text-slate-300">{project.description}</p>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.tasks}</p>
                  <div className="mt-2 grid gap-1.5">
                    {project.tasks.map((task) => (
                      <p key={task} className="text-sm text-slate-300">
                        • {task}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.technicalEnvironment}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.environment.map((item) => (
                      <span key={item} className="inline-flex items-center rounded-full bg-slate-900/45 px-2.5 py-1 text-xs text-cyan-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={300}>
        <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.teaching}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.teachingPassionTitle}</p>
            <p className="mt-2 text-sm text-slate-300">{copy.teachingPassionText}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.teachingSoftTitle}</p>
            <p className="mt-2 text-sm text-slate-300">{copy.teachingSoftText}</p>
          </TiltCard>
          <TiltCard className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{copy.teachingImpactTitle}</p>
            <p className="mt-2 text-sm text-slate-300">{copy.teachingImpactText}</p>
          </TiltCard>
        </div>
        </article>
      </Reveal>

      <Reveal delay={340}>
        <article id="contact" className="panel rounded-2xl p-6 text-center">
        <h3 className="hud-title text-xl font-bold text-cyan-200">{copy.contactTitle}</h3>
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
          <h3 className="hud-title text-lg font-bold text-cyan-200">{copy.faq}</h3>
          <div className="mt-4 grid gap-3">
            {faqItemsData.map((item, index) => {
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
                {copy.close}
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
