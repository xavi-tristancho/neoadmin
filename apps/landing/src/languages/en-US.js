import login from "snippets/login";
import categories from "snippets/categories";
import customPage from "snippets/customPage";

export default {
  landing: {
    title: "A ReactJS library for building Admin Panels and CMS.",
    description: [
      "Declaratively build fully customizable admin panels and CMS based on MaterialUI.",
      "Build fully customizable admin panels and CMS with JSON configurations.",
    ],
  },
  sections: {
    code: {
      title: "Easy to Code.",
      content: [
        {
          title: "Authentication Pages",
          description:
            "Create them within seconds with our predefined components.",
          code: login,
          imageSrc: "login.jpg",
          icon: "lock-circle",
        },
        {
          title: "Tables",
          description:
            "You just need to configure which data they should display and which functionalities they should have.",
          code: categories,
          imageSrc: "table.jpg",
          icon: "table",
        },
        {
          title: "Forms",
          description:
            "You don't need extra configuration for basic forms as the same configuration is used for tables and forms.",
          code: categories,
          imageSrc: "form.jpg",
          icon: "form",
        },
        {
          title: "Custom Pages",
          description:
            "You can still add any page with whatever component you want to render in it.",
          code: customPage,
          imageSrc: "custom-page.jpg",
          icon: "layout",
        },
      ],
    },
    features: {
      title: "Developer experience first.",
      description:
        "We are leveraging the most popular libraries in the ReactJS ecosystem and placing the wires so you can focus on results instead of doing repetitive work.",
      content: [
        {
          title: "Based on ReactJS",
          description:
            "If you know ReactJS, you won’t have any problem extending the features provided out of the box.",
          icon: "react",
        },
        {
          title: "Powerful UI",
          description:
            "We leverage MaterialUI in order to build amazing advanced components and theming.",
          icon: "brush",
        },
        {
          title: "Fully responsive",
          description:
            "We take care that it looks perfect in any device where you could run it.",
          icon: "iframe",
        },
        {
          title: "Custom Routing",
          description:
            "We are using React Router under the hood to create a routing system based on configuration.",
          icon: "react-router",
        },
        {
          title: "Simple",
          description:
            "Most of the times you will just need to add JSON configuration in order to see your tables and forms working.",
          icon: "file-code",
        },
        {
          title: "Built in advanced components",
          description:
            "We take care of image uploading, form management, table pagination and filtering.",
          icon: "layers",
        },
        {
          title: "Fully customizable",
          description:
            "If our out of the box components are not enough for you, we also expose ways that let you render whatever you want, wherever you want.",
          icon: "settings",
        },
        {
          title: "Backend agnostic",
          description:
            "We don’t force you to comply to any REST or GraphQL schema. We just ask you which function will take care of doing CRUD operations.",
          icon: "backend-agnostic",
        },
        {
          title: "Declarative",
          description:
            "Our philosophy is to provide you with JSON structures that you can use to build your application with the minimum amount of code.",
          icon: "elements",
        },
      ],
    },
    livePreview: {
      title: "Try the free demo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie consequat venenatis et morbi quam amet nunc viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie consequat venenatis et morbi quam amet nunc viverra. ",
      imageSrc: "login.jpg",
    },
    questionnaire: {
      title: "Help us shape neoAdmin.",
      description:
        "We want to hear your thoughts about neoAdmin and how we can improve it! We just need few minutes of your time to answer the following questions.",
      content: [
        {
          id: "ROLE",
          title: "What is your role?",
          type: "radio",
          required: true,
          solutions: [
            { id: "developer", text: "Developer" },
            { id: "designer", text: "Designer" },
            { id: "manager", text: "Manager" },
            { id: "owner", text: "Owner" },
            { id: "other", text: "Other" },
          ],
        },
        {
          id: "WHOAREYOU",
          title: "Who are you or who do you represent?",
          type: "radio",
          required: true,
          solutions: [
            {
              id: "software-development-company",
              text: "Software development company",
            },
            { id: "freelance", text: "Freelancer or self-employed" },
            { id: "agency", text: "Agency" },
            {
              id: "company-own-product",
              text: "Company developing your own product or internal system",
            },
          ],
        },
        {
          id: "HOWMANYEMP",
          title: "What is the size of your team?",
          type: "radio",
          required: true,
          solutions: [
            { id: "single", text: "Single person" },
            { id: "2-4", text: "Small team (2-4 people)" },
            { id: "5-20", text: "Mid-sized (5-20)" },
            { id: "more-than-21", text: "Large team (21+)" },
          ],
        },
        {
          id: "PROBLEMS",
          title:
            "Which problems do you want or expect neoAdmin to solve for you?",
          type: "textarea",
        },
        {
          id: "PAYMENT",
          title: "How would you like to pay for the product?",
          type: "radio",
          required: true,
          solutions: [
            {
              id: "one-time-unlimited-projects",
              text: "One time payment for unlimited projects",
            },
            {
              id: "one-time-each-project",
              text: "One time payment for each project",
            },
            {
              id: "recurring-monthly-payment",
              text: "Recurring monthly payment",
            },
            {
              id: "recurring-yearly-payment",
              text: "Recurring yearly payment",
            },
          ],
        },
        {
          id: "email",
          title:
            "Optionally, would you like to provide us your email so we can stay in touch once we have updates?",
          type: "email",
        },
      ],
    },
    faqs: {
      title: "FAQs.",
      content: [
        {
          title: "What is neoAdmin?",
          description:
            "neoAdmin is a ReactJS library for building Admin Panels and CMS in a declarative way based on JSON configurations. Furthermore it also allows the developer to add custom code everywhere it's needed.",
        },
        {
          title: "How do I get access to neoAdmin?",
          description:
            "Currently it's not for sale, but we are working to release the first version. You can join the priority list so we can notify you when it's released.",
        },
        {
          title: "Why would I need to use neoAdmin?",
          description:
            "neoAdmin is appropriate for projects that need to manage the backend database from an Admin role perspective and helps the developer with enabling the basic CRUD operations over the database entities.",
        },
        {
          title: "How do I install my neoAdmin project?",
          description:
            "Once you have access to the repository, you can create a project with Create React App for example and then install the neoAdmin library using npm or yarn as a dependency of that project.",
        },
        {
          title: "How do I deploy my neoAdmin project?",
          description:
            "neoAdmin is a library that exposes React Components so you will need to create the project that contains it. neoAdmin does not need any special deployment process.",
        },
        {
          title: "Will neoAdmin be updated?",
          description:
            "Yes, we have a monthly release plan where we include new features and bugfixes.",
        },
        {
          title: "What if neoAdmin is missing an important feature for me?",
          description:
            "You can tell us which feature it is through our contact form and we will consider it for implementation.",
        },
        {
          title: "Can I try neoAdmin?",
          description:
            "Currently not, but soon we will be releasing a demo version of neoAdmin hosted on our servers.",
        },
        {
          title: "Which libraries does neoAdmin rely on?",
          description:
            "The most important libraries that we are using are MaterialUI, React Router and TinyMCE. We are also using libraries that we made ourselves in order to manage forms and upload images.",
        },
        {
          title: "Can I get support?",
          description:
            "Of course, you can contact us using our contact form on sending us an email to info@neoco.dev",
        },
        // {
        //   title: "Can I get a refund?",
        //   description:
        //     "We offer a 14 day money-back guarantee. If you're not satisfied with neoAdmin after using it for two weeks We'll refund you your money!",
        // },
      ],
    },
    customWork: {
      title: "Custom work.",
      description: `
        <p>Do you want to build a project with our library but don't have the resources to do it?</p>
        <p>If you don't have time or you can't find developers we can also help you on that. 
        You just need to get in contact with us and briefly explain us your case and we might:</p>
        <ul>
        <li> Get back to you and schedule a meeting </li>
        <li> Give you an estimate of time and price if the work is straightforward </li>
        <li> Decline the work due to timing or relevancy </li>
        </ul>
        `,
    },
  },
  contact: {
    join: {
      title: "Be the first to try it out!",
      description:
        "Leave us your email so we can get back to you as soon as the product launches. We are going to have a special offer discount for you!",
      textPlaceholder: "your email",
      showTextarea: false,
    },
    "custom-work": {
      title: "Custom work",
      description:
        "Do you want to build a project with our library but don't have the resources to do it?",
      textPlaceholder: "your email",
      textareaPlaceholder: "explain us your project",
    },
    questions: {
      title: "Any questions?",
      description:
        "Do you have any questions or some feedback for us? Let us know so we can improve!",
      textPlaceholder: "your email",
      textareaPlaceholder: "your questions or feedback",
    },
  },
  general: {
    productName: "neoAdmin",
    cta: "Join now the priority list",
    livePreview: "Live preview",
    comingSoon: "coming soon",
    back: "back",
    next: "next",
    contactUs: "contact us",
    contact: "Questions?",
    email: "your email",
    message: "message",
    other: "other",
    developed: "Developed by",
    send: "send",
    sentSuccessfully: "¡sent successfully!",
    warning: "Please answer in order to continue",
    questions: "Questions?",
    code: "Code",
    preview: "Preview",
    simplePreview: "A simple preview",
  },
  email: {
    "custom-work": "Custom Work",
    questions: "Questions",
    subject: "Message send by",
    mail: "Mail",
    user: "User",
    phone: "Phone number",
    message: "Message",
    contactingUserInfo: "Contacting user information",
    relatedServices: "Related Services",
    responseMessages: {
      pending: "Sending... 📭",
      error: "Something went wrong, please try again later",
      join: {
        success:
          "Thank you for subscribing! You will soon receive news from us. 📬",
      },
      help: {
        success: "Thanks for giving us your opinion! 📬",
      },
      "custom-work": {
        success: "Received! As soon as we can we will contact you. 📬",
      },
      questions: {
        success: "Received! As soon as we can we will contact you. 📬",
      },
    },
  },
  gdpr: {
    main: "I've read and agree to the",
    tos: "Terms",
    and: "and the",
    privacy: "Privacy Policy",
  },
  footer: {
    contact: "contact",
    us: { title: "Company" },
    letsTalk: { title: "let's talk", requiredServices: "required services" },
    "explain your project": "briefly explain your project",
  },
};
