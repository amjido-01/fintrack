"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'

interface ProjectsData {
  id: number;
  name: string;
  description: string;
  link: string;
  icon: any;
}

const iconSize = 18;

const ProjectsData = [
  {
    id: 1,
    name: 'Expense Tracking',
    description: 'Easily add and categorize your expenses.',
    link: 'https://syntaxui.com',
    icon: <BookOpen size={iconSize} />,
  },
  {
    id: 2,
    name: 'Budget Management',
    description: 'Set and track your budgets with ease.',
    link: 'https://prettyfolio.com',
    icon: <BookOpen size={iconSize} />,
  },
  {
    id: 2,
    name: 'Reports and Analytics',
    description: 'Gain insights with detailed reports and visual charts.',
    link: 'https://enchant.ansubkhan.com',
    icon: <BookOpen size={iconSize} />,
  },
  {
    id: 3,
    name: 'Secure Authentication',
    description: 'Securely log in with OAuth providers like Google.',
    link: 'https://ansubkhan.com',
    icon: <BookOpen size={iconSize} />,
  },
  {
    id: 4,
    name: 'Reports and Analytics',
    description: 'Gain insights with detailed reports and visual charts.',
    link: 'https://enchant.ansubkhan.com',
    icon: <BookOpen />,
  },
]

const HoverSpring = () => {
  return (
    <div className='container border-2 mt-20'>
      <h2 className='scroll-m-20 text-3xl text-center font-extrabold tracking-tight lg:text-4xl'>Features</h2>
      <div className="container grid w-full grid-cols-2 gap-x-10 md:grid-cols-3">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: 'spring',
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border-2 p-4 rounded-md"
            >
              <a target="_blank" rel="noopener noreferrer" href={project.link}>
                <Image
                  src={project.icon}
                  width={30}
                  height={30}
                  className="mb-3 rounded-lg border-gray-400 dark:border"
                  alt={project.name}
                />
                <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {project.name}
                </div>
                <div className="max-w-[250px] text-sm font-normal text-gray-500 dark:text-gray-500">
                  {project.description}
                </div>
              </a>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default HoverSpring