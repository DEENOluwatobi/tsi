import {
    Briefcase,
    Layout,
    Server,
    PenTool,
    Search,
    BarChart3
} from 'lucide-react';
import { Skill } from '@/types/skills';
  
const createSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

export const skillsData: Skill[] = [
    {
        id: 1,
        title: "Product Management",
        slug: createSlug("Product Management"),
        description: "Learn to lead product development, create roadmaps, and drive product strategy using industry-standard methodologies",
        icon: Briefcase,
        gradient: "from-red-500 to-blue-500",
        longDescription: "Our Product Management track prepares you for the dynamic world of digital product leadership. You'll learn how to identify market opportunities, define product vision, and execute successful product strategies that deliver real value.",
        benefits: [
        "Hands-on learning - You'll build real products, not just follow tutorials. Learn by doing—graduate with a portfolio that proves you can ship.",
        "You'll develop true product thinking. Understand how to solve the right problems, not just check off features.",
        "You'll gain practical AI skills as a PM. Stay future-ready by learning how to apply AI where it matters.",
        "You'll grow faster with personalized feedback and mentorship. Students will be getting expert support every step of the way.",
        "You'll learn in groups, just like the real world. Collaborate, communicate, and lead—because product is always a team sport."
        ],
        modules: [
        {
            title: "Product Discovery",
            description: "Learn how to identify market opportunities and validate product ideas."
        },
        {
            title: "Product Strategy",
            description: "Develop frameworks for setting product vision and strategic direction."
        },
        {
            title: "Product Development",
            description: "Master agile methodologies and product development processes."
        },
        {
            title: "Product Analytics",
            description: "Learn to measure product success and make data-driven decisions."
        }
        ],
        pricing: {
        regular: 1600,
        discount: 1000,
        discountEnds: new Date("2025-06-10")
        },
        testimonials: [
        {
            quote: "This program transformed my approach to product management. The hands-on experience was invaluable.",
            name: "Sarah Johnson",
            title: "Senior Product Manager, TechCorp"
        },
        {
            quote: "I landed my dream PM role within a month of completing this course.",
            name: "Michael Chen",
            title: "Product Manager, Innovation Labs"
        }
        ],
        startDate: "August 15, 2025"
    },
    {
        id: 2,
        title: "Frontend Development",
        slug: createSlug("Frontend Development"),
        description: "Master modern frontend tools like HTML, CSS and JavaScript to build responsive, interactive web applications",
        icon: Layout,
        gradient: "from-blue-500 to-red-500",
        longDescription: "Our Frontend Development track equips you with the skills needed to create beautiful, responsive, and interactive user interfaces. From fundamentals to advanced frameworks, you'll learn everything needed to build modern web applications.",
        benefits: [
        "Build a comprehensive portfolio of real-world projects.",
        "Master modern frameworks and libraries like React, Next.js, and Tailwind CSS.",
        "Learn industry best practices for responsive design and accessibility.",
        "Develop skills in UI/UX design principles alongside technical implementation.",
        "Work collaboratively with designers and backend developers on full-stack projects."
        ],
        modules: [
        {
            title: "HTML & CSS Foundations",
            description: "Build a strong foundation in semantic HTML and modern CSS."
        },
        {
            title: "JavaScript Essentials",
            description: "Master core JavaScript concepts and DOM manipulation."
        },
        {
            title: "React & State Management",
            description: "Learn component-based architecture and state management patterns."
        },
        {
            title: "Next.js & Modern Tooling",
            description: "Build production-ready applications with Next.js and modern build tools."
        }
        ],
        pricing: {
        regular: 1440,
        discount: 900,
        discountEnds: new Date("2025-06-10")
        },
        startDate: "June 15, 2025"
    },
    {
        id: 3,
        title: "Backend Development",
        slug: createSlug("Backend Development"),
        description: "Build robust server-side applications, APIs, and database architectures using Node.js and Python",
        icon: Server,
        gradient: "from-red-500 via-blue-500 to-red-500",
        longDescription: "Our Backend Development track focuses on building scalable, secure, and efficient server-side applications. You'll learn to design APIs, manage databases, and implement authentication systems that power modern web applications.",
        benefits: [
        "Develop expertise in Node.js and Python for server-side development.",
        "Master RESTful API design and implementation.",
        "Learn database design and optimization with SQL and NoSQL solutions.",
        "Build secure applications with proper authentication and authorization.",
        "Deploy and scale applications using cloud services."
        ],
        modules: [
        {
            title: "Server-Side Fundamentals",
            description: "Learn core concepts of backend development and server architecture."
        },
        {
            title: "API Development",
            description: "Design and build RESTful and GraphQL APIs."
        },
        {
            title: "Database Systems",
            description: "Master SQL, NoSQL, and database optimization techniques."
        },
        {
            title: "Authentication & Security",
            description: "Implement secure user authentication and data protection."
        }
        ],
        pricing: {
        regular: 1440,
        discount: 900,
        discountEnds: new Date("2025-06-10")
        },
        startDate: "June 22, 2025"
    },
    {
        id: 4,
        title: "Graphic Design",
        slug: createSlug("Graphic Design"),
        description: "Create stunning visual content using industry-standard tools and master the principles of design",
        icon: PenTool,
        gradient: "from-blue-500 via-red-500 to-blue-500",
        longDescription: "Our Graphic Design track teaches you to communicate visually and create compelling designs for digital and print media. Learn color theory, typography, layout principles, and master industry-standard tools.",
        benefits: [
        "Build a professional design portfolio showcasing your creative skills.",
        "Master industry-standard design tools like Adobe Creative Suite.",
        "Develop a deep understanding of design principles and visual communication.",
        "Learn to translate client requirements into effective design solutions.",
        "Gain experience in both digital and print design workflows."
        ],
        modules: [
        {
            title: "Design Fundamentals",
            description: "Master color theory, typography, and composition principles."
        },
        {
            title: "Digital Design Tools",
            description: "Learn to use Adobe Photoshop, Illustrator, and Figma effectively."
        },
        {
            title: "Brand Identity Design",
            description: "Create comprehensive brand identities and style guides."
        },
        {
            title: "UI/UX Design",
            description: "Design user interfaces that are both beautiful and functional."
        }
        ],
        pricing: {
        regular: 1280,
        discount: 800,
        discountEnds: new Date("2025-06-10")
        },
        startDate: "June 29, 2025"
    },
    {
        id: 5,
        title: "Search Engine Optimization",
        slug: createSlug("Search Engine Optimization"),
        description: "Learn advanced SEO strategies to improve website visibility and drive organic traffic growth",
        icon: Search,
        gradient: "from-red-500 to-blue-500",
        longDescription: "Our SEO track equips you with the skills to improve website visibility and drive organic traffic. Learn technical SEO, keyword research, content optimization, and analytics to help businesses achieve their online marketing goals.",
        benefits: [
        "Master both technical and content SEO strategies.",
        "Learn to conduct comprehensive site audits and implement improvements.",
        "Develop skills in keyword research and competitive analysis.",
        "Understand how to measure SEO success and report on results.",
        "Stay updated with the latest search engine algorithm changes."
        ],
        modules: [
        {
            title: "SEO Fundamentals",
            description: "Understand how search engines work and ranking factors."
        },
        {
            title: "Technical SEO",
            description: "Learn site architecture, crawlability, and performance optimization."
        },
        {
            title: "Content & On-Page SEO",
            description: "Master keyword research and content optimization techniques."
        },
        {
            title: "Link Building & Off-Page SEO",
            description: "Develop strategies for building high-quality backlinks."
        }
        ],
        pricing: {
        regular: 1120,
        discount: 700,
        discountEnds: new Date("2025-06-10")
        },
        startDate: "July 6, 2025"
    },
    {
        id: 6,
        title: "Data Analysis",
        slug: createSlug("Data Analysis"),
        description: "Master data analysis tools and techniques to derive insights and make data-driven decisions",
        icon: BarChart3,
        gradient: "from-blue-500 to-red-500",
        longDescription: "Our Data Analysis track teaches you to extract meaningful insights from complex datasets. Learn statistical analysis, data visualization, and how to communicate findings to drive business decisions.",
        benefits: [
        "Develop proficiency in data analysis tools like Python, R, and SQL.",
        "Learn to clean, process, and transform raw data into useful formats.",
        "Master statistical methods and data visualization techniques.",
        "Build predictive models and implement machine learning algorithms.",
        "Create compelling data stories that drive decision-making."
        ],
        modules: [
        {
            title: "Data Fundamentals",
            description: "Learn data types, structures, and basic statistical concepts."
        },
        {
            title: "Data Processing & Cleaning",
            description: "Master techniques for preparing data for analysis."
        },
        {
            title: "Statistical Analysis",
            description: "Apply statistical methods to extract insights from data."
        },
        {
            title: "Data Visualization",
            description: "Create compelling visualizations that communicate insights clearly."
        }
        ],
        pricing: {
        regular: 1440,
        discount: 900,
        discountEnds: new Date("2025-06-10")
        },
        startDate: "July 13, 2025"
    }
];