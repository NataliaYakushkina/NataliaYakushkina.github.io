
window.CONTENT = {
  profile: {
    name: "Natalia Yakushkina",
    background: "assets/img/bg.jpg",         
    intro: "a Unity developer for digital twins, VR and AI-driven 3D worlds.",   
    photo: "assets/img/profile.png",          
    cv: "assets/CV_Natalia_Yakushkina.pdf",   
    email: "yakushkina.nat@gmail.com",
    github: "https://github.com/NataliaYakushkina",
    linkedin: "https://www.linkedin.com/in/natalia-yakushkina/",

  },

  projects: [
    {
      slug: "ai-avatar-gallery",
      title: "Spatial Awareness for AI Avatars",
      pitch: "An LLM-driven guide that uses real-time spatial data to help users navigate a virtual art gallery.",
      tags: ["Unity", "C#", "Python", "OpenAI tool calling", "WebSocket"],
      facts: [
        ["Context", "Bachelor thesis (grade 1.3)"],
        ["Role", "Solo — concept, development, user study"],
        ["Supervision", "HSHL & Fraunhofer IEM"],
        ["Platform", "Desktop"]
      ],
      goal:
        "Language models communicate fluently but struggle to navigate 3D environments." + 
        " The goal was to build an AI guide that reliably answers spatial questions and provides accurate navigation guidance.",
      built: [
        "Virtual art gallery in Unity with a conversational AI assistant",
        "Semantic scene representation with real-time spatial data",
        "LLM integration through OpenAI function calling",
        "Visual guidance through object highlighting and navigation paths"
      ],
      poster: "assets/img/ai-avatar-gallery.jpg",
      preview: "assets/video/ai-avatar-gallery-preview.mp4",
      video: "assets/video/ai-avatar-gallery.mp4",
      youtube: "https://youtu.be/bYCac7HQhBI",
      images: [],
      links: [
        // ["GitHub", "https://github.com/..."]
      ]
    },
    {
      slug: "airport-digital-twin",
      title: "Interactive Digital Twin for Airport Processes",
      pitch: "Real-time digital twin of an airport apron with live sensor data streamed into Unity.",
      tags: ["Unity", "C#", "Apache Kafka", "Meta XR SDK", "Quest Pro"],
      facts: [
        ["Context", "Internship at Fraunhofer IEM, contributing to the research project FastGate"],
        ["Role", "Intern, Unity developer in the Digital Engineering team"],
        ["Platform", "Desktop and Meta Quest Pro"]
      ],
      goal:
        "FastGate is a research project funded by the German Federal Ministry for Digital and Transport and the North Rhine-Westphalia Ministry of Economic Affairs, Industry, Climate Action and Energy. " +
        "It aims to automate airport apron operations to reduce turnaround times, CO₂ emissions and noise. " +
        "Its real-time digital twin visualizes aircraft, jet bridges and staff for process optimization, planning and VR training. " +
        "During my internship, I contributed to the Unity digital twin, focusing on live data integration and the VR version.",
      built: [
        "Real-time data pipeline streaming sensor data into Unity via Apache Kafka",
        "Rigged, animated 3D characters representing tracked people",
        "Live tooltips on aircraft, jet bridges and staff, updated in real time",
        "VR mode using Meta XR Core and Interaction SDK"
      ],
      poster: "assets/img/airport-digital-twin.jpeg",
      preview: "assets/video/airport-digital-twin-preview.mp4",
      video: "assets/video/airport-digital-twin.mp4",
      youtube: "https://youtu.be/UUb1hNP_uHI",
      images: [],
      links: []
    },
    {
      slug: "ar-urban-greening",
      title: "AR App for Urban Greening",
      pitch: "A mobile AR app that allows citizens to virtually place trees along their streets.",
      tags: ["Unity", "C#", "Vuforia", "Blender", "Mobile AR"],
      facts: [
        ["Context", "University project"],
        ["Role", "Solo — concept, development, user study"],
        ["Platform", "Mobile AR"]
      ],
      goal:
        "Develop an AR app that enables users to visualize virtual tree placements in real-world environments to support urban greening initiatives.",
      built: [
        "Mobile AR app in Unity with Vuforia ground plane detection",
        "Four prototype variants: realistic vs. stylized trees × carousel vs. dropdown menu",
        "3D tree models adapted and optimized in Blender, with wind animations"
      ],
      poster: "assets/img/ar-urban-greening.jpeg",
      preview: "assets/video/ar-urban-greening-preview.mp4",
      video: "assets/video/ar-urban-greening.mp4",
      youtube: "https://youtu.be/ihgevpY3bqY",
      images: [],
      links: []
    },
    {
      slug: "ar-glasses-tryon",
      title: "Virtual Try-On Glasses",
      pitch: "A mobile AR app to try on glasses using face tracking.",
      tags: ["Unity", "C#", "AR Foundation", "Face Tracking", "Blender", "Mobile"],
      facts: [
        ["Context", "University project"],
        ["Role", "Solo — concept, development, user study"],
        ["Platform", "Mobile AR"]
      ],
      goal:
        "Enhance the mobile shopping experience by enabling users to virtually try on glasses through their smartphones.",
      built: [
        "Real-time face tracking with AR Foundation",
        "3D glasses models created in Blender",
        "Face tone adjustment"
      ],
      challenges: [
        // ["Problem", "How I solved it"]
      ],
      poster: "assets/img/ar-glasses-tryon.jpeg",
      preview: "assets/video/ar-glasses-tryon-preview.mp4",
      video: "assets/video/ar-glasses-tryon.mp4",
      youtube: "https://youtu.be/GGhXLCwXex0",
      images: [],
      links: []
    },
    {
      slug: "household-helper",
      title: "Household Helper Web App",
      pitch: "A progressive web app that helps households organize everyday tasks — built as a Scrum team.",
      tags: ["React", "Vite", "PWA", "Node.js", "SQLite", "Scrum"],
      facts: [
        ["Context", "University project"],
        ["Role", "Front-end developer in a Scrum team"],
        ["Platform", "Desktop and mobile"]
      ],
      goal:
        "Develop and deploy a household helper app as a team, using Scrum.", 
      built: [
        "React front end as a progressive web app",
        "Connected the React front end to the team's REST API (Node.js, Express, SQLite)",
        "Deployment on a university server"
      ],
      challenges: [
        // ["Problem", "How I solved it"]
      ],
      poster: "assets/img/household-helper.jpeg",
      preview: "assets/video/household-helper-preview.mp4",
      video: "assets/video/household-helper.mp4",
      youtube: "https://youtu.be/0OjWH1e_JpA",
      images: [],
      links: []
    }
  ]
};
