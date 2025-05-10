'use client'
import React from 'react';
import Link from 'next/link';
import { skillsData } from '@/data/skills';

const TechSkills = () => {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Digital Skill Acquisition
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock your potential with in-demand technical skills for the digital age
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill) => (
            <div
              key={skill.id}
              className="group p-6 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg relative overflow-hidden h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`mb-4 bg-gradient-to-r ${skill.gradient} p-3 w-fit rounded-lg`}>
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {skill.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                {skill.description}
              </p>
              
              {/* Hover Button */}
              <div className="relative mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={`/skill/${skill.slug}`} className='cursor-pointer'>
                  <button className={`bg-gradient-to-r ${skill.gradient} text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-auto`}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSkills;

// 'use client'
// import React from 'react';
// import { 
//   Briefcase, 
//   Layout, 
//   Server, 
//   PenTool, 
//   Search, 
//   BarChart3 
// } from 'lucide-react';

// const skillsData = [
//   {
//     id: 1,
//     title: "Product Management",
//     description: "Learn to lead product development, create roadmaps, and drive product strategy using industry-standard methodologies",
//     icon: Briefcase,
//     gradient: "from-red-500 to-blue-500"
//   },
//   {
//     id: 2,
//     title: "Frontend Development",
//     description: "Master modern frontend tools like HTML, CSS and JavaScript to build responsive, interactive web applications",
//     icon: Layout,
//     gradient: "from-blue-500 to-red-500"
//   },
//   {
//     id: 3,
//     title: "Backend Development",
//     description: "Build robust server-side applications, APIs, and database architectures using Node.js and Python",
//     icon: Server,
//     gradient: "from-red-500 via-blue-500 to-red-500"
//   },
//   {
//     id: 4,
//     title: "Graphic Design",
//     description: "Create stunning visual content using industry-standard tools and master the principles of design",
//     icon: PenTool,
//     gradient: "from-blue-500 via-red-500 to-blue-500"
//   },
//   {
//     id: 5,
//     title: "Search Engine Optimization",
//     description: "Learn advanced SEO strategies to improve website visibility and drive organic traffic growth",
//     icon: Search,
//     gradient: "from-red-500 to-blue-500"
//   },
//   {
//     id: 6,
//     title: "Data Analysis",
//     description: "Master data analysis tools and techniques to derive insights and make data-driven decisions",
//     icon: BarChart3,
//     gradient: "from-blue-500 to-red-500"
//   }
// ];

// const TechSkills = () => {
//   return (
//     <section className="w-full py-12 px-4 md:px-8 lg:px-16">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
//             Digital Skill Acquisition
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Unlock your potential with in-demand technical skills for the digital age
//           </p>
//         </div>

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {skillsData.map((skill) => (
//             <div
//               key={skill.id}
//               className="group p-6 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg relative overflow-hidden"
//             >
//               {/* Gradient Background on Hover */}
//               <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
//               {/* Icon */}
//               <div className={`mb-4 bg-gradient-to-r ${skill.gradient} p-3 w-fit rounded-lg`}>
//                 <skill.icon className="w-6 h-6 text-white" />
//               </div>

//               {/* Content */}
//               <h3 className="text-xl font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
//                 {skill.title}
//               </h3>
//               <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
//                 {skill.description}
//               </p>

//               {/* Hover Button */}
//               <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button className={`bg-gradient-to-r ${skill.gradient} text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-shadow duration-300`}>
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TechSkills;