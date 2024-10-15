'use client'

import { liveContext } from "@/context/live";
import { IPosition, menuItemsTypes } from "@/utils/@types";
import MenuItems from "@components/popover/menuItems";
import Popover from "@components/popover/popover"
import theme from "@styles/theme";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";

const ProfilePopup = ({
    position
} : {
    position? : IPosition
}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [menuItems, setMenuItems] = useState<menuItemsTypes[]>([
        {
          name: `Logout`,
          onClick: () => signOut({redirect : true}),
          icon: <BiLogOut color={theme.colors.text.secondary}/>,
          closeOnClick : true
        },
      ]);
    return (
        <Popover
            position={position}
            show={showMenu}
            close={() => setShowMenu(false)}
            content={
                <MenuItems
                    items={menuItems}
                    closeFunction={() => setShowMenu(false)}
                    id={"controls"}
                />
            }
        >
            <FaCircleUser
                color={theme.colors.bg.alt2}
                onClick={()=>setShowMenu(prev => !prev)}
            />
        </Popover>
    )
}
export default ProfilePopup