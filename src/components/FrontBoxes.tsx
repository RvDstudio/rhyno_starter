"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const integrations = [
  {
    name: "Nextjs 14",
    description: "Framework",
    logo: "/images/nextjs.png",
    active: false,
  },
  {
    name: "Neon Tech",
    description: "Database",
    logo: "/images/neon.png",
    active: false,
  },
  {
    name: "Drizzle",
    description: "Next gen TypeScript ORM.",
    logo: "/images/drizzle.png",
    active: false,
  },
  {
    name: "Tailwind",
    description: "Utility-first CSS framework",
    logo: "/images/tailwind.png",
    active: false,
  },
  {
    name: "Shadcn",
    description: "Beautifully designed components",
    logo: "/images/shadcn.png",
    active: false,
  },
  {
    name: "Nextauth V5",
    description: "Authentication for the Web.",
    logo: "/images/Nextauth.png",
    active: false,
  },
];

export default function FrontBoxes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-8 bg-gray-50 pt-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-medium leading-tight text-gray-600 sm:text-4xl lg:text-4xl">
            What do we find under the hood?
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-16 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="overflow-hidden bg-white rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <img
                    className="flex-shrink-0 w-12 h-auto rounded-md"
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                  />
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold text-black">
                      {integration.name}
                    </p>
                    <p className="mt-px text-sm text-gray-600">
                      {integration.description}
                    </p>
                  </div>
                  <motion.svg
                    className={`w-6 h-6 text-blue-600 ${
                      integration.active ? "block" : "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
