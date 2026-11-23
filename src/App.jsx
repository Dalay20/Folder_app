import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './App.css'

const certificationCategories = [
  { title: 'Tecnología y computación', certificates: 3 },
  { title: 'Desarrollo web', certificates: 3 },
  { title: 'Inteligencia artificial', certificates: 3 },
  { title: 'Programación y eventos', certificates: 2 },
]

const projectCategories = [
  'Todos',
  'Desarrollo web',
  'Datos y clima',
  'Visión por computadora',
  'Python y compiladores',
  'Java',
  'C++ y DSA',
  'Unity y C#',
  'Backend y BBDD',
  'IA y Machine Learning',
  'Full Stack',
]

const avatarDirectionFrames = [6, 9, 8, 7, 4, 1, 2, 3]

function getAvatarFrame(bounds, clientX, clientY) {
  const centerX = bounds.left + bounds.width / 2
  const centerY = bounds.top + bounds.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  const centerRadius = Math.min(bounds.width, bounds.height) * 0.18

  if (Math.hypot(deltaX, deltaY) < centerRadius) {
    return 5
  }

  const angle = Math.atan2(deltaY, deltaX)
  const sector = (Math.round(angle / (Math.PI / 4)) + 8) % 8
  return avatarDirectionFrames[sector]
}

const projects = [
  {
    title: 'Analizador sintáctico y semántico para Go',
    icon: '🔎',
    category: 'Python y compiladores',
    isDraft: false,
    description:
      'Herramienta educativa que analiza código fuente Go sin ejecutarlo. Incluye análisis léxico, sintáctico y semántico, verificación de tipos y una interfaz gráfica para revisar resultados y errores.',
    technologies: ['Python', 'PLY', 'Tkinter', 'Go'],
    highlights: [
      'Analiza variables, arrays, slices, mapas y structs',
      'Verifica tipos en asignaciones y expresiones',
      'Reconoce funciones, métodos e instrucciones de control',
      'Valida retornos y reporta errores sintácticos y semánticos',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/JaredIGT/LexicAnalizerGO',
      },
    ],
  },
  {
    title: 'Sport Posture Analyzer',
    icon: '🏋️',
    category: 'Visión por computadora',
    isDraft: false,
    description:
      'Aplicación que analiza videos de ejercicios para detectar la pose, evaluar ángulos articulares y señalar errores de técnica. Presenta recomendaciones, métricas de postura y un video procesado con la pose superpuesta.',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'Streamlit'],
    highlights: [
      'Analiza sentadillas, flexiones y planchas',
      'Evalúa ángulos de rodilla, codo, hombro y cadera',
      'Muestra errores, recomendaciones y puntuación de postura',
      'Permite descargar el video procesado',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/se0klie/sportPostureAnalyzer',
      },
    ],
  },
  {
    title: 'PhoneApp — Gestor de contactos',
    icon: '📱',
    category: 'Java',
    isDraft: false,
    description:
      'Aplicación Java para administrar contactos de personas y empresas. Permite agregar, editar y eliminar contactos, guardar la lista mediante serialización y buscar atributos por tipo, como teléfonos, correos y ubicaciones.',
    technologies: ['Java', 'Programación orientada a objetos', 'Serialización'],
    highlights: [
      'Contactos de personas y empresas',
      'Gestión de contactos y persistencia de la lista',
      'Búsqueda de atributos por tipo mediante comparadores',
      'Atributos personales y laborales',
      'Pendiente: validar el número de teléfono ingresado',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/vicbguti29/PhoneApp',
      },
    ],
  },
  {
    title: 'CinemaSeat',
    icon: '🎬',
    category: 'Java',
    isDraft: false,
    description:
      'Aplicación colaborativa de consola que simula un sistema de reservas de cine. Permite seleccionar asientos, consultar disponibilidad y realizar pagos virtuales, gestionando los distintos estados de cada asiento.',
    technologies: ['Java'],
    highlights: [
      'Proyecto colaborativo',
      'Mi rol: lógica de selección y validación de asientos',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/CinemaSeat',
      },
    ],
  },
  {
    title: 'Sistema de gestión de concesionario',
    icon: '🚘',
    category: 'Java',
    isDraft: false,
    description:
      'Aplicación de consola para gestionar vendedores, compradores y vehículos. Los vendedores pueden registrar vehículos y aceptar ofertas; los compradores pueden registrarse y ofertar por vehículos disponibles.',
    technologies: ['Java 17', 'Maven', 'Programación orientada a objetos'],
    highlights: [
      'Registro de vendedores y compradores',
      'Gestión de vehículos y tipos de vehículo',
      'Registro y aceptación de ofertas',
      'Persistencia de información en archivos',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/Concesionario',
      },
    ],
  },
  {
    title: 'ClimaRun — Dashboard climático para runners',
    icon: '🏃',
    category: 'Datos y clima',
    isDraft: false,
    description:
      'Dashboard interactivo para ayudar a planificar entrenamientos de running con datos meteorológicos en tiempo real. Consulta clima actual y por hora, recibe alertas por radiación UV, sensación térmica y lluvia, y encuentra la mejor franja del día para correr.',
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Recharts',
      'Open-Meteo API',
      'JavaScript',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/ClimaRun',
      },
    ],
  },
  {
    title: 'EcoWarning!',
    icon: '🌱',
    category: 'Desarrollo web',
    isDraft: false,
    description:
      'Plataforma ciudadana para reportar incidentes ambientales en Ecuador. Permite registrar denuncias geolocalizadas con evidencia fotográfica y nivel de gravedad, visualizarlas en un mapa interactivo y tablas filtrables, y consultar estadísticas gráficas.',
    technologies: [
      'Vue 3',
      'Vite',
      'Vue Router',
      'PHP 7+',
      'SQLite',
      'Leaflet',
      'OpenStreetMap',
      'Chart.js',
    ],
    highlights: [
      'Reportes con ubicación, gravedad y fotografía',
      'Mapa y tabla de denuncias con filtros',
      'Comentarios en reportes',
      'Estadísticas por tipo y gravedad',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/EcoWarning',
      },
    ],
  },
  {
    title: '2ESTRAYA — Tres en raya con IA',
    icon: '⭕',
    category: 'Java',
    isDraft: false,
    description:
      'Juego colaborativo de tres en raya desarrollado en Java con interfaz JavaFX. Incluye modos jugador contra jugador, jugador contra computadora y computadora contra computadora, con una clase dedicada a la lógica de la IA.',
    technologies: ['Java', 'JavaFX', 'FXML', 'Inteligencia artificial'],
    highlights: [
      'Modo jugador contra jugador',
      'Modo jugador contra IA',
      'Modo IA contra IA',
      'Proyecto colaborativo',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/2ESTRAYA',
      },
    ],
  },
  {
    title: 'Detector de acentos en español con Deep Learning',
    icon: '🎙️',
    category: 'IA y Machine Learning',
    isDraft: false,
    description:
      'Clasificador de audio basado en transfer learning con VGG16 para identificar acentos andino, mexicano y español. Procesa audio como espectrogramas de Mel de 224 × 224 y ofrece una interfaz Gradio para grabar voz o cargar archivos WAV y MP3.',
    technologies: [
      'Python',
      'VGG16',
      'Deep Learning',
      'Gradio',
      'Espectrogramas de Mel',
    ],
    highlights: [
      'Accuracy general: 66.21%',
      'F1 México: 0.79',
      'F1 Andino: 0.58',
      'F1 España: 0.63',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/Dalay20/ia_audio',
      },
    ],
  },
  {
    title: 'iSponsor',
    icon: '🤝',
    category: 'Backend y BBDD',
    isDraft: false,
    description:
      'Backend para una plataforma de apadrinamiento que conecta donadores con casas hogar. Incluye autenticación por roles, políticas RLS, gestión de apadrinamientos, pagos tokenizados, informes con aprobación, auditoría y notificaciones.',
    technologies: [
      'Supabase',
      'PostgreSQL 15+',
      'Supabase Auth',
      'Storage',
      'Row Level Security',
      'PostgREST',
      '21 funciones RPC',
    ],
    highlights: [
      '10 tablas protegidas con RLS',
      '26 políticas de seguridad',
      '3 triggers y 3 utilidades',
      '21 funciones RPC',
      'Más de 25 índices',
    ],
    links: [
      {
        label: 'Repositorio',
        url: 'https://github.com/JaredIGT/iSponsor',
      },
      {
        label: 'Documentación del backend',
        url: 'https://github.com/JaredIGT/iSponsor/blob/main/backend_01/documentacion/isponsor_backend.md',
      },
    ],
  },
  {
    title: 'Juegos educativos Unity: ¡Ajá! Parque de la Ciencia x ESPOL',
    icon: '🎮',
    category: 'Unity y C#',
    isDraft: false,
    description:
      'Dos experiencias educativas desarrolladas durante mis prácticas preprofesionales en ESPOL para ¡Ajá! Parque de la Ciencia: Seis ESPOL, una adaptación de Toma 6 con NPCs estratégicos y máquina de estados, y Todas de un mismo color, un juego de lógica y reconocimiento de patrones.',
    technologies: [
      'Unity 6',
      'C#',
      'ScriptableObjects',
      'DOTween',
      'Unity Splines',
      'Unity Localization',
    ],
    links: [
      {
        label: 'Ver repositorio',
        url: 'https://github.com/MatheusJLV/Juegos2DparqueAJA',
      },
    ],
  },
]

function CertificationsPage() {
  return (
    <main className="certification-page">
      <header className="certification-page-heading">
        <p className="eyebrow">APRENDIZAJE CONTINUO</p>
        <h1 id="certifications-title">
          <span aria-hidden="true">✦</span> Mis certificados
        </h1>
        <p className="section-description">
          Cursos y logros que podré compartir aquí.
        </p>
      </header>

      {certificationCategories.map(({ title, certificates }) => (
        <section
          className="certification-category"
          key={title}
          aria-labelledby={`category-${title.replaceAll(' ', '-')}`}
        >
          <h2 id={`category-${title.replaceAll(' ', '-')}`}>{title}</h2>
          <div className="certification-grid">
            {Array.from({ length: certificates }, (_, index) => (
              <article
                className="certification-card"
                key={`${title}-${index}`}
              >
                <div className="certificate-preview" aria-hidden="true">
                  <span className="certificate-seal">✦</span>
                  <span className="certificate-caption">
                    CERTIFICADO DE FINALIZACIÓN
                  </span>
                  <span className="certificate-name">
                    Nombre del certificado
                  </span>
                  <span className="certificate-rule" />
                  <span className="certificate-provider">
                    Institución por agregar
                  </span>
                </div>
                <p className="draft-label">Borrador</p>
                <h3>Nombre del certificado</h3>
                <p className="certification-meta">
                  Institución y fecha por agregar
                </p>
                <button className="certificate-action" type="button" disabled>
                  PDF por agregar <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}
      <p className="certification-disclaimer">
        Los elementos son espacios provisionales; no representan certificados
        reales.
      </p>
    </main>
  )
}

function HomeCertificationCarousel() {
  const certificates = certificationCategories.flatMap(({ title, certificates }) =>
    Array.from({ length: certificates }, (_, index) => ({
      category: title,
      key: `${title}-${index}`,
    })),
  )

  return (
    <section className="home-certifications" aria-labelledby="home-certifications-title">
      <header className="section-heading">
        <p className="eyebrow">APRENDIZAJE CONTINUO</p>
        <h2 id="home-certifications-title">Mis certificados</h2>
        <p className="section-description">
          Algunos espacios para mostrar cursos y logros.
        </p>
      </header>

      <div
        className="home-certificate-carousel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Certificados provisionales"
      >
        <div className="home-certificate-track">
          {[0, 1].map((set) => (
            <div
              className="home-certificate-set"
              key={set}
              role="group"
              aria-label={set === 0 ? 'Certificados' : undefined}
              aria-hidden={set === 1 ? 'true' : undefined}
            >
              {certificates.map(({ category, key }) => (
                <article className="home-certificate-card" key={`${set}-${key}`}>
                  <div className="certificate-preview" aria-hidden="true">
                    <span className="certificate-seal">✦</span>
                    <span className="certificate-caption">CERTIFICADO</span>
                    <span className="certificate-name">Nombre del curso</span>
                    <span className="certificate-rule" />
                    <span className="certificate-provider">Institución</span>
                  </div>
                  <p className="draft-label">Borrador</p>
                  <h3>{category}</h3>
                  <p className="certification-meta">Curso por agregar</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="projects-note">
        Son espacios provisionales, no certificaciones reales.{' '}
        <Link className="certification-page-link" to="/certificados">
          Ver todos los certificados
        </Link>
      </p>
    </section>
  )
}

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const visibleProjects = projects.filter(
    (project) =>
      selectedCategory === 'Todos' || project.category === selectedCategory,
  )

  return (
    <main className="projects-page">
      <header className="projects-page-heading">
        <h1 id="projects-page-title">
          <span aria-hidden="true">♙</span> Mis proyectos
        </h1>
        <div className="project-filters" aria-label="Filtrar proyectos">
          {projectCategories.map((category) => (
            <button
              className={`project-filter${selectedCategory === category ? ' selected' : ''}`}
              type="button"
              key={category}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="project-grid project-page-grid">
        {visibleProjects.map((project) => (
          <article className="project-card project-page-card" key={project.title}>
            <div className="project-title">
              <span className="project-icon" aria-hidden="true">
                {project.icon}
              </span>
              <h2>{project.title}</h2>
            </div>
            {project.isDraft && (
              <p className="draft-label">Borrador editable</p>
            )}
            <p className="project-description">{project.description}</p>
            {project.technologies && (
              <ul className="project-technologies" aria-label="Tecnologías">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            )}
            {project.highlights && (
              <ul className="project-highlights" aria-label="Características">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {project.isDraft && (
              <>
                <button className="project-details-button" type="button" disabled>
                  Detalles por agregar
                </button>
                <div className="project-action-row">
                  {project.links.map((link) => (
                    <button
                      className="project-action-button"
                      type="button"
                      key={link}
                      disabled
                    >
                      {link} por agregar
                    </button>
                  ))}
                </div>
              </>
            )}
            {!project.isDraft && (
              <div className="project-action-row">
                {project.links.map((link) => (
                  <a
                    className="project-action-button project-external-link"
                    href={link.url}
                    key={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="projects-note">
        Estos proyectos son ejemplos provisionales. Las demos, el código y los
        detalles se agregarán cuando compartas tus proyectos reales.
      </p>
    </main>
  )
}

const aboutTabs = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'logros', label: 'Logros' },
]

const expertiseAreas = [
  { title: 'Desarrollo web', icon: '▣' },
  { title: 'Computación', icon: '▤' },
  { title: 'Programación', icon: '⌁' },
  { title: 'Herramientas y habilidades', icon: '⚒' },
]

function AboutPage() {
  const { pathname } = useLocation()
  const activeTab = pathname.split('/').at(-1)
  const selectedTab = aboutTabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : 'resumen'

  return (
    <main className="about-page">
      <nav className="about-tabs" aria-label="Secciones sobre mí">
        {aboutTabs.map(({ id, label }) => (
          <Link
            className={`about-tab${selectedTab === id ? ' active' : ''}`}
            to={`/sobre-mi/${id}`}
            key={id}
            aria-current={selectedTab === id ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      {selectedTab === 'resumen' && (
        <section aria-labelledby="about-summary-title">
          <header className="about-section-heading">
            <h1 id="about-summary-title">
              <span aria-hidden="true">♙</span> Resumen profesional
            </h1>
          </header>

          <article className="bio-card">
            <div className="bio-avatar" aria-hidden="true">J</div>
            <div className="bio-content">
              <h2>Javier</h2>
              <p className="bio-role">Estudiante de Computación</p>
              <p>
                Soy Javier, estudiante de Computación. Este espacio está
                dedicado a presentar mi perfil, mi formación y los proyectos
                que desarrollaré durante mi aprendizaje.
              </p>
              <p>
                Mi recorrido, intereses y tecnologías favoritas se podrán
                completar aquí con información personal y experiencias reales.
              </p>
              <p className="bio-placeholder">
                Presentación profesional detallada por completar.
              </p>
              <div className="bio-actions">
                <span className="bio-action-placeholder">Correo por agregar</span>
                <span className="bio-action-placeholder">LinkedIn por agregar</span>
              </div>
            </div>
          </article>

          <section className="expertise-section" aria-labelledby="expertise-title">
            <h2 id="expertise-title">
              <span aria-hidden="true">⌁</span> Áreas de interés y habilidades
            </h2>
            <div className="expertise-grid">
              {expertiseAreas.map(({ title, icon }) => (
                <article className="expertise-card" key={title}>
                  <h3>
                    <span aria-hidden="true">{icon}</span> {title}
                  </h3>
                  <div className="expertise-tags">
                    <span>Información por agregar</span>
                    <span>Habilidades por confirmar</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="education-section" aria-labelledby="education-title">
            <h2 id="education-title">
              <span aria-hidden="true">♧</span> Educación
            </h2>
            <div className="education-list">
              <article className="education-card">
                <div className="education-icon" aria-hidden="true">J</div>
                <div className="education-details">
                  <h3>Programa o título por agregar</h3>
                  <p className="education-institution">
                    Institución educativa por agregar
                  </p>
                  <p className="education-meta">
                    Nivel académico y detalles por completar
                  </p>
                </div>
                <span className="education-period">Periodo por agregar</span>
              </article>
            </div>
            <p className="education-note">
              Agrega aquí tu institución, programa de estudios y fechas.
            </p>
          </section>
        </section>
      )}

      {selectedTab === 'experiencia' && (
        <section className="experience-section" aria-labelledby="experience-title">
          <header className="about-section-heading">
            <h1 id="experience-title">
              <span aria-hidden="true">▣</span> Pasantías profesionales
            </h1>
          </header>
          <p className="experience-intro">
            Experiencia práctica adquirida durante mis pasantías profesionales.
          </p>
          <div className="experience-list">
            <article className="experience-card">
              <header className="experience-card-heading">
                <div className="experience-icon" aria-hidden="true">✦</div>
                <div>
                  <h2>ESPOL · ¡Ajá! Parque de la Ciencia</h2>
                  <p>Desarrollo de videojuegos educativos</p>
                </div>
                <span className="experience-duration">
                  Fechas por agregar
                </span>
              </header>
              <div className="experience-entry">
                <h3>Pasantías preprofesionales</h3>
                <span>ESPOL</span>
              </div>
              <div className="experience-entry experience-entry-details">
                <h3>Experiencias desarrolladas</h3>
                <p>
                  Desarrollo de dos videojuegos educativos: Seis ESPOL, con
                  NPCs de decisiones heurísticas, validación de filas y turnos
                  mediante una máquina de estados; y Todas de un mismo color,
                  un juego de lógica y reconocimiento de patrones.
                </p>
              </div>
              <div className="experience-entry experience-entry-details">
                <h3>Herramientas y tecnologías</h3>
                <p>
                  Unity 6, C#, tareas asíncronas, ScriptableObjects, DOTween,
                  Unity Splines y Unity Localization (español e inglés).
                </p>
              </div>
              <p className="experience-draft">
                Periodo y fechas por agregar
              </p>
            </article>
          </div>
        </section>
      )}

      {selectedTab === 'logros' && (
        <section className="about-placeholder-page" aria-labelledby="achievements-title">
          <h1 id="achievements-title">Logros</h1>
          <p>
            Aquí se podrán destacar logros académicos, reconocimientos y
            certificaciones reales.
          </p>
          <span className="draft-label">Contenido por completar</span>
        </section>
      )}
    </main>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="contact-page">
      <header className="contact-page-heading">
        <h1 id="contact-title">
          <span aria-hidden="true">✉</span> Hablemos
        </h1>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-fields">
          <label className="contact-field" htmlFor="contact-name">
            Tu nombre
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Escribe tu nombre"
              autoComplete="name"
              required
            />
          </label>

          <label className="contact-field" htmlFor="contact-email">
            Tu correo
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <label className="contact-field contact-message" htmlFor="contact-message">
          Mensaje
          <textarea
            id="contact-message"
            name="message"
            placeholder="Cuéntame sobre tu idea..."
            rows="5"
            required
          />
        </label>

        <button className="contact-submit" type="submit">
          Enviar mensaje <span aria-hidden="true">➤</span>
        </button>
        <p className="contact-notice" role="status" aria-live="polite">
          {submitted
            ? 'El formulario es visual por ahora y todavía no está conectado a un servicio de envío.'
            : 'Formulario de contacto provisional; el envío aún no está configurado.'}
        </p>
      </form>
    </main>
  )
}

function DirectionalAvatar({ frame, floating = false }) {
  return (
    <div
      className={`avatar${floating ? ' floating-avatar' : ''}`}
      data-avatar-anchor="true"
      role="img"
      aria-label="Retrato ilustrado de Javier"
    >
      <img
        src={`/images/avatar-direcciones/fr${frame}.PNG`}
        alt=""
        draggable="false"
      />
    </div>
  )
}

function HomePage({ avatarFrame }) {
  const featuredProjects = [
    ...projects.filter((project) => !project.isDraft),
    ...projects.filter((project) => project.isDraft),
  ].slice(0, 3)

  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <DirectionalAvatar frame={avatarFrame} />
        <div className="hero-card">
          <p className="eyebrow">PORTAFOLIO</p>
          <h1 id="hero-title">Hola, soy Javier</h1>
          <p className="hero-description">
            Estudiante de <span>Computación</span>
          </p>
          <Link className="primary-link" to="/proyectos">
            Ver proyectos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        className="projects"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <p className="eyebrow">TRABAJO SELECCIONADO</p>
          <h2 id="projects-title">Proyectos destacados</h2>
          <p className="section-description">
            Algunos proyectos que muestran mi proceso de aprendizaje.
          </p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-title">
                <span className="project-icon" aria-hidden="true">
                  {project.icon}
                </span>
                <h3>{project.title}</h3>
              </div>
              {project.isDraft && (
                <p className="draft-label">Borrador editable</p>
              )}
              <p className="project-description">{project.description}</p>
              {project.isDraft ? (
                <p className="project-links">
                  Demo y código: enlaces por agregar
                </p>
              ) : (
                <a
                  className="project-links project-home-link"
                  href={project.links[0].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.links[0].label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
        <p className="projects-note">
          Los proyectos y sus descripciones son ejemplos provisionales.
        </p>
      </section>

      <HomeCertificationCarousel />

      <section className="about" id="about" aria-labelledby="about-title">
        <p className="eyebrow">ACERCA DE MÍ</p>
        <h2 id="about-title">Estudiante de Computación</h2>
      </section>
    </main>
  )
}

function AppLayout() {
  const [theme, setTheme] = useState('dark')
  const [avatarFrame, setAvatarFrame] = useState(5)
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const isProjectsPage = pathname === '/proyectos'
  const isCertificationsPage = pathname === '/certificados'
  const isAboutPage = pathname.startsWith('/sobre-mi')
  const isContactPage = pathname === '/contacto'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    function handlePointerMove(event) {
      const avatar = document.querySelector('[data-avatar-anchor="true"]')
      if (!avatar) return

      const nextFrame = getAvatarFrame(
        avatar.getBoundingClientRect(),
        event.clientX,
        event.clientY,
      )
      setAvatarFrame((currentFrame) =>
        currentFrame === nextFrame ? currentFrame : nextFrame,
      )
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pathname])

  return (
    <div className="portfolio" data-theme={theme}>
      <header className="site-header">
        <Link className="brand" to="/">
          Javier
        </Link>

        <nav className="navigation" aria-label="Navegación principal">
          <Link
            className={`navigation-link${!isProjectsPage && !isCertificationsPage && !isAboutPage && !isContactPage ? ' active' : ''}`}
            to="/"
            aria-current={!isProjectsPage && !isCertificationsPage && !isAboutPage && !isContactPage ? 'page' : undefined}
          >
            Inicio
          </Link>
          <Link
            className={`navigation-link${isProjectsPage ? ' active' : ''}`}
            to="/proyectos"
            aria-current={isProjectsPage ? 'page' : undefined}
          >
            Proyectos
          </Link>
          <Link
            className={`navigation-link${isCertificationsPage ? ' active' : ''}`}
            to="/certificados"
            aria-current={isCertificationsPage ? 'page' : undefined}
          >
            Certificados
          </Link>
          <Link
            className={`navigation-link${isAboutPage ? ' active' : ''}`}
            to="/sobre-mi/resumen"
            aria-current={isAboutPage ? 'page' : undefined}
          >
            Sobre mí
          </Link>
          <Link
            className={`navigation-link${isContactPage ? ' active' : ''}`}
            to="/contacto"
            aria-current={isContactPage ? 'page' : undefined}
          >
            Contacto
          </Link>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? '☼' : '☾'}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage avatarFrame={avatarFrame} />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/certificados" element={<CertificationsPage />} />
        <Route path="/sobre-mi" element={<Navigate to="/sobre-mi/resumen" replace />} />
        <Route path="/sobre-mi/:section" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<HomePage avatarFrame={avatarFrame} />} />
      </Routes>
      {!isHomePage && <DirectionalAvatar frame={avatarFrame} floating />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
