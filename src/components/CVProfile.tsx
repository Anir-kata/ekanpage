import {
  FaCalendarCheck,
  FaEnvelope,
  FaFilePdf,
  FaGithub,
  FaLanguage,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
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
  { name: 'React', level: 92, icon: SiReact },
  { name: 'TypeScript', level: 88, icon: SiTypescript },
  { name: 'Angular', level: 82, icon: SiAngular },
  { name: 'HTML5 / CSS', level: 95, icon: SiVite },
  { name: 'Tailwind', level: 90, icon: SiTailwindcss },
]

const backendSkills = [
  { name: 'Java', level: 88, icon: SiSpringboot },
  { name: 'Python', level: 92, icon: SiPython },
  { name: 'Node.js', level: 84, icon: SiNodedotjs },
  { name: 'Spring Boot', level: 86, icon: SiSpringboot },
  { name: 'Django', level: 78, icon: SiDjango },
  { name: 'FastAPI', level: 87, icon: SiFastapi },
  { name: 'Express.js', level: 82, icon: SiExpress },
  { name: 'SQL (PostgreSQL, MySQL)', level: 89, icon: SiPostgresql },
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
    subtitle: 'Stage fin d etudes + CDD',
    period: '05/2024 - 03/2025',
    context1Title: 'Contexte 1 : PFE',
    context1: [
      'Conception et developpement d une application Python/Streamlit permettant l upload de CV heterogenes (PDF, scans) et la generation automatique d un dossier de competences conforme au standard de l entreprise.',
      'Pipeline automatise : OCR + extraction et structuration d entites via LLM (GPT-4o).',
      'Post-traitement par regex et generation dynamique d un document MS Word avec placeholders (manipulation de la structure XML / librairie python-docx).',
      'Deploiement de l application sur Microsoft Azure.',
      'Projet mene avec la methodologie Agile (iterations courtes, echanges reguliers avec les equipes Business, retrospective et amelioration continue).',
      'Resultat : Reduction de 90% du temps de traitement interne.',
      'Environnement technique : Python, OCR (DocTR), Streamlit, modele IA GPT-4o, Microsoft Azure',
    ],
    context2Title: 'Contexte 2 : CDD',
    context2: [
      'Application web d automatisation des relances de mails automatiques.',
      'Conception et developpement d une application web interne.',
      'Developpement du frontend en React + Tailwind CSS.',
      'Developpement du backend en Node.js avec Express.js.',
      'Integration de l authentification via compte Microsoft et deploiement sur Microsoft Azure.',
      'Environnement technique : Node.js, React, Tailwind CSS, REST API, Microsoft Azure',
    ],
  },
  {
    role: 'Save Energies (IDEX) - Boulogne-Billancourt',
    subtitle: 'Stage 6 mois',
    period: '04/2021 - 09/2021',
    context1Title: 'Missions',
    context1: [
      'Automatisation de processus metiers : collecte de donnees energetiques, traitement/nettoyage des donnees, gestion des erreurs d execution, generation de reportings automatises.',
      'Automatisation de la collecte via API REST et web scraping.',
      'Developpement d un outil de visualisation de donnees d achat/vente de gaz.',
      'Developpement de modeles de prevision de consommation energetique et d outils d aide a la decision.',
      'Resultats : Gain de temps et d efficacite sur les reportings quotidiens.',
      'Environnement technique : R (Selenium), VBA, PowerShell',
    ],
  },
  {
    role: 'HP France SAS - Grenoble',
    subtitle: 'Business Intelligence - Stage 3 mois',
    period: '05/2019 - 08/2019',
    context1Title: 'Missions',
    context1: [
      'Developpement de dashboards decisionnels.',
      'Automatisation de scripts de mise a jour de donnees.',
      'Conception de dashboards interactifs sous QlikView et Power BI pour le reporting business.',
      'Nettoyage, structuration et modelisation de donnees (relations, tables de mapping).',
      'Automatisation de la collecte et de l actualisation des donnees via scripts Batch.',
      'Travail en collaboration avec les equipes metiers (logistique, forecast).',
      'Environnement technique : QlikView, Power BI, SQL, Script Batch',
    ],
  },
]

const projects = [
  {
    title: 'Generateur automatique de dossiers de competences',
    stack: 'Python, OCR (DocTR), GPT-4o, Streamlit, Azure',
    result: 'Automatisation complete du traitement de CV et generation de documents structures.',
    link: profile.githubUrl,
  },
  {
    title: 'Application d automatisation des relances email',
    stack: 'React, Node.js, Tailwind, REST API, Azure',
    result: 'Application interne permettant l envoi et le suivi automatise de relances.',
  },
  {
    title: 'Outil de prevision energetique',
    stack: 'R, Selenium, API REST',
    result: 'Automatisation de la collecte et creation de modeles de prevision pour la consommation energetique.',
  },
  {
    title: 'Dashboards Business Intelligence',
    stack: 'QlikView, Power BI, SQL',
    result: 'Visualisation des donnees metier et amelioration du pilotage decisionnel.',
  },
]

function SkillBar({ name, level, icon: Icon }: { name: string; level: number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span className="flex items-center gap-2">
          <Icon className="text-cyan-200" />
          {name}
        </span>
        <span className="text-cyan-200">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-900/70">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-300 shadow-[0_0_12px_rgba(56,189,248,0.45)]"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

export function CVProfile() {
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

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#portfolio"
            className="rounded-xl border border-cyan-300/60 bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]"
          >
            Voir CV
          </a>
          <a
            href={profile.cvPdfPath}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-300/60 bg-indigo-400/15 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:shadow-[0_0_22px_rgba(129,140,248,0.35)]"
          >
            <FaFilePdf />
            Telecharger PDF
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-400/50 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-100"
          >
            <FaEnvelope />
            Me contacter
          </a>
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Carte d identite pro</h3>
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
            {frontendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} />
            ))}
          </div>
          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Backend</p>
            {backendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Outils et stack technique</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {toolingSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                >
                  <Icon />
                  {skill.name}
                </span>
              )
            })}
          </div>
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Experiences</h3>
        <div className="relative mt-5 grid gap-5 before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-10px)] before:w-px before:bg-cyan-300/30 sm:before:left-3">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative pl-9">
              <span className="absolute left-0 top-2 h-5 w-5 rounded-full border border-cyan-300/60 bg-cyan-300/20 shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
              <div className="panel-soft rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{experience.period}</p>
                <h4 className="mt-1 text-lg font-semibold text-slate-100">{experience.role}</h4>
                <p className="mt-1 text-sm font-semibold text-cyan-100">{experience.subtitle}</p>

                <div className="mt-4 grid gap-2">
                  <p className="text-sm font-semibold text-indigo-200">{experience.context1Title}</p>
                  {experience.context1.map((line) => (
                    <p key={line} className="text-sm text-slate-300">
                      - {line}
                    </p>
                  ))}
                </div>

                {experience.context2Title && experience.context2 && (
                  <div className="mt-4 grid gap-2">
                    <p className="text-sm font-semibold text-indigo-200">{experience.context2Title}</p>
                    {experience.context2.map((line) => (
                      <p key={line} className="text-sm text-slate-300">
                        - {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Formation et certifications</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="panel-soft rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Diplome ingenieur - 2025</p>
            <p className="mt-2 font-semibold text-slate-100">
              ENSIMAG - Ecole nationale superieure d informatique et de mathematiques appliquees de Grenoble
            </p>
            <p className="mt-2 text-sm text-slate-300">Specialisation : Ingenierie des Systemes d Information</p>
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
        <h3 className="hud-title text-lg font-bold text-cyan-200">Projets phares</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="panel-soft rounded-xl p-4">
              <h4 className="text-base font-semibold text-slate-100">{project.title}</h4>
              <p className="mt-2 text-sm text-cyan-100">Stack : {project.stack}</p>
              <p className="mt-2 text-sm text-slate-300">Resultat : {project.result}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
                >
                  <FaGithub />
                  Voir sur GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="panel rounded-2xl p-6">
        <h3 className="hud-title text-lg font-bold text-cyan-200">Pedagogie</h3>
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
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-600/40 px-3 py-2 text-slate-300 hover:text-cyan-100">
            <FaEnvelope className="text-cyan-200" />
            {profile.email}
          </a>
          <a href={`tel:${profile.phoneLink}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-600/40 px-3 py-2 text-slate-300 hover:text-cyan-100">
            <FaPhoneAlt className="text-cyan-200" />
            {profile.phoneDisplay}
          </a>
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600/40 px-3 py-2 text-slate-300 hover:text-cyan-100"
          >
            <FaLinkedin className="text-cyan-200" />
            LinkedIn
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600/40 px-3 py-2 text-slate-300 hover:text-cyan-100"
          >
            <FaGithub className="text-cyan-200" />
            GitHub
          </a>
        </div>
      </article>
    </section>
  )
}
