'use client'

import { logo } from "@/assets"
import Image from "next/image"

const Logo = () => {
    return (
        <div className="mt-[-7px] hover:animate-pulse cursor-pointer">
            <Image
                src={require('@/assets/logo.png')}
                width={50}
                height={50}
                alt="logo"
            />
        </div>
    )
}
export default Logo