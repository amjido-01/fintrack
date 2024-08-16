import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChartNoAxesCombined } from "lucide-react"
import Link from 'next/link'

const tabs = [
  {
    name: 'Dashboard',
    icon: ChartNoAxesCombined, // Replace with the appropriate icon
    href: '/dashboard'
  },
  {
    name: 'Workspace',
    icon: ChartNoAxesCombined, // Replace with the appropriate icon
    href: '/workspace'
  }
]

interface TabProps {
  text: string
  Icon: React.ElementType
  href: string
  selected: boolean
  setSelected: (text: string) => void
  customID?: string
}

const Tab = ({ text, Icon, href, selected, setSelected, customID }: TabProps) => {
  return (
    <Link href={href} passHref className='w-full'>
      <button
        onClick={() => setSelected(text)}
        className={` ${
          selected
            ? 'text-green-500'
            : 'hover:text-gray-900 dark:hover:text-gray-100'
        } relative flex items-center justify-center gap-2 w-full h-full transition-colors duration-300`}
      >
        <span className="relative z-10">{text}</span>
        <Icon className="w-5 h-5" />
        {selected && (
          <motion.div
            className="absolute left-0 top-0 h-full w-full"
            layoutId={customID + 'linetab'}
            transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: 0.1 }}
          >
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 h-[3px] w-full rounded-t-full bg-green-500"></span>
          </motion.div>
        )}
      </button>
    </Link>
  )
}

interface LineTabProps {
//   center?: boolean
  customID?: string
}

const LineTabs = ({ customID }: LineTabProps) => {
  const [selected, setSelected] = useState<string>(tabs[0].name)

  return (
    <div
      className={cn(
        'flex md:hidden fixed container bottom-0 left-0 z-50 w-full h-16 justify-between',
      )}
    >
      {tabs.map((tab) => (
        <Tab
          text={tab.name}
          Icon={tab.icon}
          href={tab.href}
          selected={selected === tab.name}
          setSelected={setSelected}
          key={tab.name}
          customID={customID}
        />
      ))}
    </div>
  )
}

export default LineTabs