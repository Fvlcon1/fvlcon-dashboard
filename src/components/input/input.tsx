'use client'

import { hexOpacity } from "@/utils/hexOpacity"
import theme from "@styles/theme"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"

type InputProps = {
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    type?: "text" | "number";
    PreIcon?: ReactNode;
    PostIcon?: ReactNode;
    inputClassName?: string;
  } & (
    | { content: string; setContent: Dispatch<SetStateAction<string>> }
    | { content: number; setContent: Dispatch<SetStateAction<number>> }
  );
  
  const Input = ({
    className,
    inputClassName,
    placeholder,
    type,
    content,
    setContent,
    PreIcon,
    PostIcon,
    onClick,
  }: InputProps) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
  
    return (
      <div
        className={`flex w-full flex-1 gap-2 px-[15px] py-[10px] items-center rounded-full bg-bg-secondary border-bg-tetiary border-[1px] border-solid ${
          inputFocus || hover ? "border-main-primary" : "border-bg-quantinary"
        } duration-200 ${className}`}
        onClick={onClick}
      >
        {PreIcon && PreIcon}
        <input
          placeholder={placeholder ?? "Input text"}
          type={type ?? "text"}
          className={`flex w-full flex-1 bg-transparent outline-none placeholder:text-[12px] placeholder:text-text-secondary text-text-primary md:text-[12px] text-[16px] ${inputClassName}`}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          value={content} // Automatically handles string or number based on the type
          onChange={(e) => setContent(e.target.value as any)} // TypeScript infers correct type
        />
        {PostIcon && PostIcon}
      </div>
    );
  };
  
  export default Input;
  
