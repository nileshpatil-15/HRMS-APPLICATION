import React, { ReactNode } from 'react'
interface props{
  children:ReactNode
  

}
export const Description:React.FC<props> =({children})=> {



  return (
   <p  className='text-neutral-600 font-montserrat text-[14px] font-normal'>
    {children} 
   </p>
  )
}

export default Description