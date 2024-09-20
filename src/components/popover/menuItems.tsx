import { menuItemsTypes } from "@/utils/@types";
import ItemsComponent from "./itemsComponent";
import Popover from "./popover";

const MenuItems = ({
  items,
  handleAnyItemClick,
  closeFunction,
  id
}: {
  items: menuItemsTypes[];
  handleAnyItemClick?: () => void;
  closeFunction?: (index?: number) => void;
  id : string
}) => {
  return (
    <div className="p-1">
      {items.map((item, index: number) => (
        <div key={index}>
          {item.dropdown ? (
            <Popover
              show={item.active ?? false}
              close={() => {
                if (item.setActive) item.setActive(index, false);
              }}
              content={
                <MenuItems
                  items={item.dropdown}
                  id={id}
                  closeFunction={() => {
                    if (item.setActive) item.setActive(index, false);
                  }}
                />
              }
            >
              <ItemsComponent
                items={items}
                id={id}
                closeFunction={closeFunction}
                handleAnyItemClick={handleAnyItemClick}
                item={item}
                index={index}
              />
            </Popover>
          ) : (
            <ItemsComponent
              items={items}
              closeFunction={closeFunction}
              handleAnyItemClick={handleAnyItemClick}
              item={item}
              id={id}
              index={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
