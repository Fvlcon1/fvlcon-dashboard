'use client'
import theme, { colors } from "@styles/theme";
import { ButtonProps } from "@/utils/@types";
import AppTypography from "@styles/components/appTypography";
import { useState } from "react";
import Flex from "@styles/components/flex";
import { TypographyBold } from "@styles/style.types";

const Button = ({
  className,
  children,
  id,
  color,
  colorTheme,
  background,
  border,
  type,
  PreIcon,
  PostIcon,
  onClick,
  radius,
  maxWidth,
  size,
  textSize,
  textBold,
  padding,
  shadow,
  Loader,
  opacity,
  disabled,
  showLoader,
  variant,
  disableElevation,
  hover,
  text,
  icon
}: ButtonProps) => {

  const [onHover, setOnHover] = useState<boolean>(false)
  const [onPress, setOnPress] = useState<boolean>(false)

  return (
    <button
      style={{
        background : (onHover && !disabled)
                      ? hover?.background 
                      ? hover?.background 
                      : background ?? theme.colors.bg.alt1
                      : theme.colors.bg.tetiary,
        padding : padding ?? '7px 15px',
        border : border,
        borderRadius : radius ? `${radius}px` : '7px',
        maxWidth,
        width : size?.width ?? 'fit-content',
        height : size?.height,
        opacity : (onHover && !disabled)
                  ? hover?.opacity 
                  ?? 0.9 
                  : disabled 
                  ? 0.5 : 1,
        transform : `scale(${onPress ? 0.97 : 1})`,
      }}
      onClick={onClick}
      onMouseOver={()=>setOnHover(true)}
      onMouseLeave={()=>setOnHover(false)}
      onMouseDown={()=>setOnPress(true)}
      onMouseUp={()=>setOnPress(false)}
      className={`${className} duration-200 ${disabled && 'cursor-not-allowed'}`}
      disabled={disabled}
    >
      <div className="w-full justify-center items-center flex gap-[8px] ">
        <AppTypography
          size={textSize}
          bold={textBold ?? TypographyBold.sm2}
          textColor={
            onHover ? hover?.color
              ? hover.color
              : color ?? theme.colors.text.primary
              : theme.colors.text.primary
          }
        >
          <Flex 
              width="fit-content"
              align="center"
              gap={8}
          >
              {icon}
              {text ?? 'Button'}
          </Flex>
        </AppTypography>
      </div>
    </button>
  )
}

type customPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export default Button