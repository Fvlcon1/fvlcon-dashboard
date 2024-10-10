'use client'
import { ReactNode, useState } from "react";

const Pressable = ({
  children,
  onClick,
  className
} : {
  children : ReactNode
  onClick? : ()=>void
  className? : string
}) => {

  const [onHover, setOnHover] = useState<boolean>(false)
  const [onPress, setOnPress] = useState<boolean>(false)

  return (
    <div
      onClick={onClick}
      onMouseOver={()=>setOnHover(true)}
      onMouseLeave={()=>setOnHover(false)}
      onMouseDown={()=>setOnPress(true)}
      onMouseUp={()=>setOnPress(false)}
      className={`${className} duration-200`}
      style={{
        transform : `scale(${onPress ? 0.97 : 1})`,
      }}
    >
      {children}
    </div>
  )
}
export default Pressable