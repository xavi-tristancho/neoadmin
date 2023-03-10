import login from "snippets/login";
import categories from "snippets/categories";
import customPage from "snippets/customPage";

export default {
  meta: {
    title: "neoAdmin - Construye paneles de administración en horas",
    description:
      "Una librería premium que ayuda a los desarrolladores a construir herramientas internas. Como una plantilla pero mejor",
  },
  landing: {
    title:
      "La librería para construir paneles de administración y CMS en ReactJS.",
    description: [
      "Construye paneles de admin y CMS completamente personalizables de manera declarativa y basados en MaterialUI.",
    ],
  },
  sections: {
    code: {
      title: "Fácil de programar.",
      content: [
        {
          title: "Páginas de autenticación",
          description:
            "Créalos en segundos con nuestros componentes predefinidos.",
          code: login,
          imageSrc: "login.jpg",
          icon: "lock-circle",
        },
        {
          title: "Tablas",
          description:
            "Tan sólo necesitas configurar qué datos deben mostrarse y qué funcionalidades deberían tener.",
          code: categories,
          imageSrc: "table.jpg",
          icon: "table",
        },
        {
          title: "Formularios",
          description:
            "No necesitas configuración extra para mostrar formularios básicos ya que se usa la misma configuración tanto para las tablas como para los formularios.",
          code: categories,
          imageSrc: "form.jpg",
          icon: "form",
        },
        {
          title: "Páginas personalizadas",
          description:
            "Puedes seguir añadiendo cualquier página con los componentes personalizados que quieras renderizar en ella.",
          code: customPage,
          imageSrc: "custom-page.jpg",
          icon: "layout",
        },
      ],
    },
    features: {
      title: "Priorizamos la experiencia de desarrollo",
      description:
        "Usamos las librerías más populares del ecosistema ReactJS y nos encargamos de unirlas con neoAdmin para que puedas concentrarte en los resultados en vez de hacer desarrollos repetitivos.",
      content: [
        {
          title: "Basada en ReactJS",
          description:
            "Si sabes ReactJS, no tendrás problemas extendiendo las funcionalidades que se proporcionan por defecto.",
          icon: "react",
        },
        {
          title: "Una UI muy potente",
          description:
            "Nos apoyamos en MaterialUI para construir componentes avanzados y personalizar el aspecto de tu aplicación.",
          icon: "brush",
        },
        {
          title: "Completamente responsive",
          description:
            "Nos ocupamos de que tu aplicación se vea perfectamente en cualquier dispositivo.",
          icon: "iframe",
        },
        {
          title: "Enrutamiento personalizado",
          description:
            "Usamos React Router para crear un enrutamiento personalizado basado en configuraciones JSON.",
          icon: "react-router",
        },
        {
          title: "Simple",
          description:
            "La mayoría de las veces únicamente necesitas añadir una configuración JSON para que las tablas y formularios funcionen.",
          icon: "file-code",
        },
        {
          title: "Componentes avanzados incorporados",
          description:
            "Tenemos componentes para subir imágenes, gestionar formularios, paginación y filtrado de tablas.",
          icon: "layers",
        },
        {
          title: "100% personalizable",
          description:
            "Si en algún momento nuestros componentes por defecto no son suficientes para ti, también te ofrecemos maneras que te permiten renderizar lo que quieras, donde quieras.",
          icon: "settings",
        },
        {
          title: "Backend agnóstico",
          description:
            "Utiliza un backend basado en REST, GraphQL u otro. neoAdmin no necesita saber los detalles sobre tu backend.",
          icon: "backend-agnostic",
        },
        {
          title: "Declarativo",
          description:
            "Nuestra filosofía es proveerte de unas estructuras JSON configurables que te permitan construir tu aplicación con el menor código posible",
          icon: "elements",
        },
      ],
    },
    livePreview: {
      title: "Prueba la demostración gratuita",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie consequat venenatis et morbi quam amet nunc viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie consequat venenatis et morbi quam amet nunc viverra. ",
      imageSrc: "login.jpg",
    },
    questionnaire: {
      title: "Ayúdanos a mejorar neoAdmin.",
      description:
        "Queremos saber tu opinión sobre neoAdmin y cómo podemos mejorarla. Sólo necesitamos unos minutos de tu tiempo para responder las siguientes preguntas.",
      content: [
        {
          id: "ROLE",
          title: "¿Cuál es tu rol?",
          type: "radio",
          required: true,
          //showOther: true,
          solutions: [
            { id: "developer", text: "Desarrollador" },
            { id: "designer", text: "Diseñador" },
            { id: "manager", text: "Manager" },
            { id: "owner", text: "Dueño" },
            { id: "other", text: "Otro" },
          ],
        },
        {
          id: "WHOAREYOU",
          title: "¿Quién eres o a quién representas?",
          type: "radio",
          required: true,
          solutions: [
            {
              id: "software-development-company",
              text: "Consultora de software",
            },
            { id: "freelance", text: "Freelance o auto-empleado" },
            { id: "agency", text: "Agencia" },
            {
              id: "company-own-product",
              text: "Una empresa que desarrolla su propio producto o sistema interno",
            },
          ],
        },
        {
          id: "HOWMANYEMP",
          title: "¿Cuál es el tamaño de tu equipo?",
          type: "radio",
          required: true,
          solutions: [
            { id: "single", text: "Una persona" },
            { id: "2-4", text: "Equipo pequeño (2-4)" },
            { id: "5-20", text: "Equipo mediano (5-20)" },
            { id: "more-than-21", text: "Equipo grande (21+)" },
          ],
        },
        {
          id: "PROBLEMS",
          title: "¿Qué problemas esperas que neoAdmin te ayude a resolver?",
          type: "textarea",
        },
        {
          id: "PAYMENT",
          title: "¿Cómo te gustaría pagar por el producto?",
          type: "radio",
          required: true,
          solutions: [
            {
              id: "one-time-unlimited-projects",
              text: "Un pago único por proyectos ilimitados",
            },
            {
              id: "one-time-each-project",
              text: "Un pago único por cada proyecto",
            },
            {
              id: "recurring-monthly-payment",
              text: "Pago recurrente mensual",
            },
            {
              id: "recurring-yearly-payment",
              text: "Pago recurrente anual",
            },
          ],
        },
        {
          id: "email",
          title:
            "Opcionalmente, ¿te gustaría dejarnos tu email para que te podamos avisar sobre nuestras mejoras?",
          type: "email",
        },
      ],
    },
    faqs: {
      title: "FAQs.",
      content: [
        {
          title: "¿Qué es neoAdmin?",
          description:
            "neoAdmin es una librería hecha en ReactJS para construir paneles de administración y CMS de manera declarativa usando configuraciones JSON. Además, el desarrollador puede añadir código personalizado en cualquier parte donde sea necesario.",
        },
        {
          title: "¿Cómo consigo acceso a neoAdmin?",
          description:
            "Ahora mismo no está a la venta pero estamos trabajando para lanzar la primera versión. Puedes unirte a la lista de espera para que te avisemos cuando esté disponible.",
        },
        {
          title: "¿Por qué podría necesitar neoAdmin?",
          description:
            "neoAdmin es apropiado para proyectos que necesitan administrar la base de datos del backend desde una perspectiva de rol de administrador y ayuda al desarrollador a construir las operaciones básicas CRUD de una manera muy rápida y simple.",
        },
        {
          title: "¿Cómo instalo neoAdmin en mi proyecto?",
          description:
            "Una vez tengas acceso al repositorio, podrás crear un proyecto, por ejemplo con Create React App, y luego instalar la librería neoAdmin como dependencia del proyecto usando npm o yarn.",
        },
        {
          title: "¿Cómo despliego mi proyecto hecho con neoAdmin?",
          description:
            "neoAdmin es una librería que únicamente exporta componentes React, por lo que tendrás que crear el proyecto que contenga la librería. neoAdmin no necesita ningún proceso especial de despliegue.",
        },
        {
          title: "¿Habrá actualizaciones para neoAdmin?",
          description:
            "Sí, tenemos un plan de actualizaciones mensuales donde incluimos nuevas características y correcciones de errores.",
        },
        {
          title:
            "¿Qué pasa si a neoAdmin le falta una funcionalidad que para mí es muy importante?",
          description:
            "Puedes decirnos de qué funcionalidad se trata a través de nuestro formulario de contacto y consideraremos implementarla.",
        },
        {
          title: "¿Puedo probar neoAdmin?",
          description:
            "Ahora mismo no, pero pronto lanzaremos una versión de prueba de neoAdmin alojada en nuestros servidores.",
        },
        {
          title: "¿Cuáles son las librerías sobre las que depende neoAdmin?",
          description:
            "Las librerías más importantes que estamos usando son MaterialUI, React Router y TinyMCE. También usamos librerías que hemos hecho nosotros para administrar formularios y subir imágenes.",
        },
        {
          title: "Tengo un problema concreto, ¿propocionáis soporte?",
          description:
            "Por supuesto. Puedes contactarnos a través de nuestro formulario de contacto o enviando un email a info@neoco.dev",
        },
        // {
        //   title: "Can I get a refund?",
        //   description:
        //     "We offer a 14 day money-back guarantee. If you're not satisfied with neoAdmin after using it for two weeks We'll refund you your money!",
        // },
      ],
    },
    customWork: {
      title: "Trabajos personalizados.",
      description: `        
        <p>¿Quieres desarrollar un proyecto con nuestra librería pero no tienes recursos para hacerlo?</p>
        <p>Si no tienes tiempo o no puedes encontrar desarrolladores, nosotros podemos ayudarte.
        Tan solo necesitas ponerte en contacto con nosotros y explicarnos brevemente tu idea para que nosotros podamos:</p>
        </p>        
        <ul>
        <li>Concertar una reunión contigo</li>
        <li>Darte una estimación de tiempo y precio si el trabajo está bien definido</li>
        <li>Rechazar el trabajo por falta de tiempo o relevancia</li>        
        </ul>
        `,
    },
  },
  contact: {
    join: {
      title: "¡Se el primero en probarla!",
      description:
        "Déjamos tu email para que te podamos avisar tan pronto como el producto esté disponible. ¡Además tendrás un descuento especial!",
      textPlaceholder: "tu email",
      showTextarea: false,
    },
    "custom-work": {
      title: "Trabajo personalizado",
      description:
        "¿Quieres desarrollar un proyecto con nuestra librería pero no dispones de los recursos para hacerlo?",
      textPlaceholder: "tu email",
      textareaPlaceholder: "explícanos tu proyecto o idea",
    },
    questions: {
      title: "¿Preguntas?",
      description:
        "¿Tienes alguna pregunta o comentario para nosotros? ¡Déjanoslo saber para que podamos mejorar!",
      textPlaceholder: "tu email",
      textareaPlaceholder: "tus preguntas o comentarios",
    },
  },
  general: {
    productName: "neoAdmin",
    cta: "Únete ahora a la lista de espera",
    livePreview: "Ver Demo",
    comingSoon: "próximamente",
    back: "atrás",
    next: "siguiente",
    contactUs: "contáctanos",
    contact: "¿Preguntas?",
    email: "Tu email",
    message: "mensaje",
    other: "otros",
    developed: "Desarrollado por",
    send: "enviar",
    sentSuccessfully: "¡Recibido! 📬",
    warning: "Por favor contesta para poder continuar",
    questions: "¿Preguntas?",
    code: "Código",
    preview: "Vista previa",
    simplePreview: "Una vista previa",
  },
  email: {
    "custom-work": "Trabajo a medida",
    questions: "Consultas",
    subject: "Mensaje enviado por",
    user: "Usuario",
    mail: "Correo",
    phone: "Número de teléfono",
    message: "Mensaje",
    contactingUserInfo: "Información del usuario que contacta",
    relatedServices: "Servicios relacionados",
    responseMessages: {
      pending: "Enviando... 📭",
      error: "Algo salió mal, vuelve a intentarlo más tarde",
      join: {
        success:
          "¡Gracias por suscribirte!, pronto recibirás noticias nuestras. 📬",
      },
      help: {
        success: "¡Gracias por darnos tu opinión! 📬",
      },
      "custom-work": {
        success:
          "¡Recibido!, enseguida que podamos nos pondremos en contacto contigo. 📬",
      },
      questions: {
        success:
          "¡Recibido!, enseguida que podamos nos pondremos en contacto contigo. 📬",
      },
    },
  },
  gdpr: {
    main: "He leído y acepto los",
    tos: "Términos Legales",
    and: "y la",
    privacy: "Política Privacidad",
  },
  footer: {
    contact: "Contacto",
    us: { title: "Empresa" },
    letsTalk: { title: "hablemos", requiredServices: "servicios requeridos" },
    "explain your project": "explícanos tu proyecto brevemente",
  },
};
