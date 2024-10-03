'use client'

import { useState, useContext, useEffect } from "react";
import { FaGear } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDashboardCustomize, MdViewQuilt } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import Popover from "@components/popover/popover";
import MenuItems from "@components/popover/menuItems";
import Button from "@components/button/button";
import ClickableTab from "@components/clickable/clickabletab";
import Flex from "@styles/components/flex";
import theme from "@styles/theme";
import AddCam from "../add cam/addCam";
import { liveContext } from "@/context/live";
import { menuItemsTypes } from "@/utils/@types";

const Controls = () => {
  const [showAddCam, setShowAddCam] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const { numberOfCamerasPerPage, setNumberOfCamerasPerPage } = useContext(liveContext);

  const setActive = (index: number, state?: boolean) => {
    setLayoutMenuItems((prev) =>
      prev.map((item, i) => ({
        ...item,
        active: i === index ? state ?? true : false,
      }))
    );
  };

  const updateNumberOfPagesInMenuItems = () => {
    setLayoutMenuItems(prev => {
      return prev.map((item) => {
        if(item.name.startsWith("CPP")){
          return {
            ...item,
            name : `CPP: ${numberOfCamerasPerPage}`
          }
        } else {
          return item
        }
      })
    })
  }

  useEffect(()=>{
    updateNumberOfPagesInMenuItems()
  },[numberOfCamerasPerPage])

  const [layoutMenuItems, setLayoutMenuItems] = useState<menuItemsTypes[]>([
    {
      name: `CPP: ${numberOfCamerasPerPage}`,
      onClick: () => {},
      setActive: (index: number, active: boolean) => setActive(index, active),
      icon: <MdDashboardCustomize color={theme.colors.text.secondary}/>,
      dropdown: [
        { 
            name: "4", 
            onClick: () => {
              setNumberOfCamerasPerPage(4)
            }, 
            closeOnClick: true 
        },
        { 
            name: "9", 
            onClick: () => {
                setNumberOfCamerasPerPage(9)
              }, 
            closeOnClick: true 
        },
        { 
            name: "12", 
            onClick: () => {setNumberOfCamerasPerPage(12)}, 
            closeOnClick: true 
        },
      ],
    },
    {
      name: "Delete",
      onClick: () => {},
      icon: <FaGear color={theme.colors.text.secondary} size={13}/>,
    },
  ]);

  return (
    <Flex width="fit-content" align="center" gap={0}>
      <Popover
        show={showLayoutMenu}
        close={() => setShowLayoutMenu(false)}
        content={
          <MenuItems
            items={layoutMenuItems}
            closeFunction={() => setShowLayoutMenu(false)}
            id={"controls"}
          />
        }
      >
        <ClickableTab onClick={() => setShowLayoutMenu(!showLayoutMenu)}>
          <Flex width="fit-content" align="center">
            <MdViewQuilt 
                color={theme.colors.text.secondary} 
                size={18} 
            />
            <IoMdArrowDropdown color={theme.colors.text.secondary} />
          </Flex>
        </ClickableTab>
      </Popover>
      <ClickableTab>
        <Flex width="fit-content" align="center">
            <FaGear 
                color={theme.colors.text.secondary} 
                size={14} 
            />
          <IoMdArrowDropdown color={theme.colors.text.secondary} />
        </Flex>
      </ClickableTab>
      <Button
        text="Add Cam +"
        onClick={() => setShowAddCam(true)}
        className="ml-1"
      />
      <AddCam display={showAddCam} setDisplay={setShowAddCam} />
    </Flex>
  );
};

export default Controls;
