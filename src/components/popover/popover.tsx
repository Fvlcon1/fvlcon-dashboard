import { ClickAwayListener } from "@mui/base";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const Popover = ({
  show,
  close,
  children,
  content,
  position = "right", // Default position
}: {
  show: boolean;
  close: () => void;
  children?: ReactNode;
  content?: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) => {
  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "bottom-full left-0";
      case "bottom":
        return "top-full left-0";
      case "left":
        return "right-full top-0 transform -translate-y-1/2";
      case "right":
      default:
        return "left-full top-0 transform -translate-y-1/2";
    }
  };

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {show && (
          <ClickAwayListener onClickAway={close}>
            <motion.div
              className={`absolute z-50 bg-bg-tetiary border-[1px] border-solid border-bg-quantinary rounded-lg shadow-xl ${getPositionClass()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {content}
            </motion.div>
          </ClickAwayListener>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;
