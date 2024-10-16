import { ClickAwayListener } from "@mui/base";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const Popover = ({
  show,
  close,
  onClick,
  children,
  style,
  content,
  position = "right", // Default position
}: {
  show: boolean;
  close: () => void;
  onClick?: () => void;
  children?: ReactNode;
  content?: ReactNode;
  style? : string
  position?: "top" | "bottom" | "left" | "right";
}) => {
  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "bottom-full left-0";
      case "bottom":
        return "top-full left-0";
      case "left":
        return "right-[120%] top-0";
      case "right":
      default:
        return "left-[120%] top-0";
    }
  };

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {show && (
          <ClickAwayListener onClickAway={close}>
            <motion.div
              className={`Popover absolute overflow-hidden z-50 bg-bg-tetiary border-[1px] border-solid border-bg-quantinary rounded-lg shadow-custom-shadow ${getPositionClass()} ${style}`}
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
