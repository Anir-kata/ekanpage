import { useState, type ComponentType } from 'react'
import {
  FaCalendarCheck,
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
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Angular', icon: SiAngular },
  { name: 'HTML5 / CSS', icon: SiVite },
  { name: 'Tailwind', icon: SiTailwindcss },
]

const backendSkills = [
  { name: 'Java', icon: SiSpringboot },
  { name: 'Python', icon: SiPython },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Spring Boot', icon: SiSpringboot },
  { name: 'Django', icon: SiDjango },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Express.js', icon: SiExpress },
  { name: 'SQL (PostgreSQL, MySQL)', icon: SiPostgresql },
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
    subtitle: "Stage fin d'etudes + CDD",
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
      "Conception et developpement d'une application Python/Streamlit permettant l'upload de CV heterogenes (PDF, scans) et la generation automatique d'un dossier de competences conforme au standard de l'entreprise.",
      "Pipeline automatise : OCR + extraction et structuration d'entites via LLM (GPT-4o).",
      'Post-traitement par regex et generation dynamique d un document MS Word avec placeholders (manipulation de la structure XML / librairie python-docx).',
      "Deploiement de l'application sur Microsoft Azure.",
      'Projet mene avec la methodologie Agile (iterations courtes, echanges reguliers avec les equipes Business, retrospective et amelioration continue).',
      'Resultat : Reduction de 90% du temps de traitement interne.',
      'Environnement technique : Python, OCR (DocTR), Streamlit, modele IA GPT-4o, Microsoft Azure',
    ],
    context2Title: 'Contexte 2 : CDD',
    context2: [
      "Application web d'automatisation des relances de mails automatiques.",
      "Conception et developpement d'une application web interne.",
      'Developpement du frontend en React + Tailwind CSS.',
      'Developpement du backend en Node.js avec Express.js.',
      "Integration de l'authentification via compte Microsoft et deploiement sur Microsoft Azure.",
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
      "Automatisation de processus metiers : collecte de donnees energetiques, traitement/nettoyage des donnees, gestion des erreurs d'execution, generation de reportings automatises.",
      'Automatisation de la collecte via API REST et web scraping.',
      "Developpement d'un outil de visualisation de donnees d'achat/vente de gaz.",
      "Developpement de modeles de prevision de consommation energetique et d'outils d'aide a la decision.",
      'Resultats : Gain de temps et d efficacite sur les reportings quotidiens.',
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
      'Developpement de dashboards decisionnels.',
      'Automatisation de scripts de mise a jour de donnees.',
      'Conception de dashboards interactifs sous QlikView et Power BI pour le reporting business.',
      'Nettoyage, structuration et modelisation de donnees (relations, tables de mapping).',
      "Automatisation de la collecte et de l'actualisation des donnees via scripts Batch.",
      'Travail en collaboration avec les equipes metiers (logistique, forecast).',
      'Environnement technique : QlikView, Power BI, SQL, Script Batch',
    ],
  },
]

const softSkills = [
  { name: 'Agilite', icon: FaRobot },
  { name: 'TDD', icon: FaFlask },
  { name: 'Clean Code', icon: FaCode },
  { name: 'Esprit analytique', icon: FaTools },
  { name: "Rigueur d'ingenierie", icon: FaTools },
  { name: 'Autonomie', icon: FaTools },
  { name: "Capacite d'adaptation", icon: FaTools },
  { name: 'Travail en equipe', icon: FaTools },
  { name: 'Ecoute active', icon: FaTools },
  { name: 'Leadership technique', icon: FaTools },
  { name: 'Vulgarisation', icon: FaTools },
  { name: 'Gestion des priorites', icon: FaTools },
  { name: 'Communication technique', icon: FaTools },
  { name: 'Resolution de problemes', icon: FaTools },
]

const projects = [
  {
    title: 'ekanpage',
    stack: 'TypeScript, React, Tailwind',
    result: 'Portfolio personnel interactif avec parcours CV et espace pedagogie.',
    link: 'https://github.com/Anir-kata/ekanpage',
  },
  {
    title: 'projet_saas',
    stack: 'Java 21, Spring Boot',
    result: 'Application SaaS backend orientee architecture moderne Java/Spring.',
    link: 'https://github.com/Anir-kata/projet_saas',
  },
  {
    title: 'Process_CVs_SpringBoot',
    stack: 'Java, Spring Boot',
    result: 'Gestion de CV avec API backend et logique metier de traitement.',
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
    result: 'Pipeline de traitement de donnees energetiques pour analyse operationnelle.',
    link: 'https://github.com/Anir-kata/analyse_donnees_energetique',
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

  return (
    <section id="portfolio" className="mt-6 grid gap-6">
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
            Telecharger PDF
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/55 hover:text-cyan-100"
          >
            <FaEnvelope />
            Contact
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]"
            onClick={onOpenPedagogy}
          >
            Acceder au tableau de bord d'enseignement
          </button>
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaMapMarkerAlt />
              Localisation
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.location}</p>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaCalendarCheck />
              Disponibilite
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.availability}</p>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaLanguage />
              Langues
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.languages}</p>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FaTools />
              Statut
            </p>
            <p className="mt-2 font-semibold text-slate-100">{profile.status}</p>
          </div>
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Competences</h3>
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
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Outils et stack technique</p>
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

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Experiences</h3>
        <div className="relative mt-5 grid gap-5 before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-10px)] before:w-px before:bg-cyan-300/30 sm:before:left-3">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative pl-9">
              <span className="absolute left-0 top-2 h-5 w-5 rounded-full bg-cyan-300/20 shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
              <button
                className="panel-soft w-full rounded-xl p-4 text-left transition hover:scale-[1.02]"
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
                <p className="mt-3 text-right text-sm text-slate-300">Cliquer pour voir les details</p>
              </button>
            </div>
          ))}
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Formation et certifications</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Diplome ingenieur - 2025</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-[96px_1fr]">
              <div className="rounded-xl bg-slate-900/30 p-2">
                <img src="/logo_ensimag.png" alt="Logo ENSIMAG" className="h-20 w-20 object-contain" />
              </div>
              <div className="rounded-xl bg-slate-900/30 p-3">
                <p className="font-semibold text-slate-100">
                  ENSIMAG - Ecole nationale superieure d informatique et de mathematiques appliquees de Grenoble
                </p>
                <p className="mt-2 text-sm text-slate-300">Specialisation : Ingenierie des Systemes d'Information</p>
              </div>
            </div>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Autres formations</p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              Classes preparatoires aux grandes ecoles MPSI / MP (Grand Admis au concours CCP)
            </p>
            <p className="mt-2 text-sm font-semibold text-cyan-100">
              Baccalaureat Scientifique - Specialite Mathematiques (Mention Tres bien)
            </p>
          </div>
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Projets personnels</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="panel-soft rounded-xl p-4">
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
            </div>
          ))}
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Pedagogie d'enseignement</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Niveau des eleves coaches</p>
            <p className="mt-2 text-sm text-slate-300">Eleves de college, lycee et etudiants en mathematiques</p>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Methode</p>
            <p className="mt-2 text-sm text-slate-300">Explication progressive des notions mathematiques et mise en pratique par exercices cibles</p>
          </div>
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Resultats</p>
            <p className="mt-2 text-sm text-slate-300">Meilleure autonomie, progression reguliere et confiance renforcee en resolution de problemes</p>
          </div>
        </div>
      </article>

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
