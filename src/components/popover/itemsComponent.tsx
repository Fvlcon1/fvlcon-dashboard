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
        className="px-[10px] py-[4px] duration-200 hover:bg-bg-quantinary rounded-[5px] w-full cursor-pointer"
        onClick={() => {
          if (handleAnyItemClick) handleAnyItemClick();
          if (item.closeOnClick && closeFunction) closeFunction();
          if (item.setActive) item.setActive(index, item.active ?? true);
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
      {index < items.length - 1 && (
        <div className="w-full h-[1px] bg-bg-quantinary"></div>
      )}
    </Fragment>
  );
};

export default ItemsComponent;
