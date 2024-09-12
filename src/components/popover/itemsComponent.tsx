import { menuItemsTypes } from "@/utils/@types";
import AppTypography from "@styles/components/appTypography";
import Flex from "@styles/components/flex";
import { Fragment } from "react";

const ItemsComponent = ({
  item,
  items,
  index,
  closeFunction,
  handleAnyItemClick,
}: {
  item: menuItemsTypes;
  handleAnyItemClick?: () => void;
  items: menuItemsTypes[];
  index: number;
  closeFunction?: (index?: number) => void;
}) => {
  return (
    <Fragment>
      <div
      className={`px-2 py-[4px] duration-200 rounded-[5px] hover:bg-bg-quantinary w-full cursor-pointer`}
        onClick={() => {
          if (handleAnyItemClick) handleAnyItemClick();
          if (item.closeOnClick && closeFunction) closeFunction();
          if (item.setActive)  item.setActive(index, item.active ? item.active : true);
          if (item.onClick) item.onClick(index);
        }}
      >
        <Flex align="center">
          {item.icon}
          <AppTypography>
            {item.name}
          </AppTypography>
        </Flex>
      </div>
    </Fragment>
  );
};

export default ItemsComponent;
