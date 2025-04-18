'use client'

import { logo } from "@/assets"
import Image from "next/image"

const Logo = ({
    size
} : {
    size? : number
}) => {
    return (
        <div className="mt-[-7px] hover:animate-pulse cursor-pointer">
            <Image
                src={require('@/assets/prod/fvlcon-logo-thick.png')}
                width={size ?? 50}
                height={size ?? 50}
                alt="logo"
            />
        </div>
    )
}
export default Logo