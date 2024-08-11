import React from 'react'
import Image from 'next/image'

type TestimonyProps = {
    img: string;
    name: string;
    role: string;
    testimony: string;
}
const Testimony: React.FC<TestimonyProps> = ({img, name, role, testimony}) => {
  return (
    <div>
        <div className="shrink-0 px-2 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative">
                <Image className='w-full h-44 object-cover' src={img} width={500} height={500} alt="testimonial" />
                <div className="bg-slate-900 text-slate-50 p-4">
                    <span className="block font-semibold text-lg mb-1">{name}</span>
                    <span className="block mb-3 text-sm font-medium">{role}</span>
                    <span className="block text-sm text-slate-300">{testimony}</span>
                </div>
                <span className="text-7xl absolute top-2 right-2 text-slate-700">"</span>
            </div>
    </div>
  )
}

export default Testimony