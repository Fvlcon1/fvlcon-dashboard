'use client'

import { hexOpacity } from "@/utils/hexOpacity"
import theme from "@styles/theme"
import { ChangeEventHandler, Dispatch, FocusEventHandler, ReactNode, SetStateAction, useState } from "react"

type InputProps = {
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    type?: "text" | "number" | "password";
    PreIcon?: ReactNode;
    PostIcon?: ReactNode;
    required? : boolean
    borderColor? : string
    inputClassName?: string
    autofocus? : boolean
    onChange? : ChangeEventHandler<HTMLInputElement>
    onBlur? : FocusEventHandler<HTMLInputElement>
    name? : string
  } & (
    | { content: string; setContent?: Dispatch<SetStateAction<string>> }
    | { content: number; setContent?: Dispatch<SetStateAction<number>> }
  );
  
  const Input = ({
    className,
    inputClassName,
    placeholder,
    type,
    content,
    autofocus,
    setContent,
    PreIcon,
    PostIcon,
    name,
    onClick,
    onChange,
    onBlur,
    required,
    borderColor
  }: InputProps) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
  
    return (
      <div
        className={`flex w-full flex-1 gap-2 px-[15px] py-[10px] h-[45px] items-center rounded-full bg-bg-secondary border-bg-tetiary border-[1px] border-solid duration-200 ${className}`}
        onClick={onClick}
        style={{
          borderColor : inputFocus || hover ? theme.colors.main.primary : borderColor || theme.colors.bg.quantinary
        }}
      >
        {PreIcon && PreIcon}
        <input
          placeholder={placeholder ?? "Input text"}
          type={type ?? "text"}
          required={required}
          className={`flex w-full flex-1 bg-transparent outline-none placeholder:text-[12px] placeholder:text-text-secondary text-text-primary md:text-[12px] text-[16px] ${inputClassName}`}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          value={content}
          autoFocus={autofocus}
          name={name}
          onChange={(e) => {onChange ? onChange(e) : setContent && setContent(e.target.value as any)}}
        />
        {PostIcon && PostIcon}
      </div>
    );
  };
  
  export default Input;
  
