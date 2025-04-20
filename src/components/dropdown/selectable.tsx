"use client";

import { useState, ReactNode, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import Text from "@styles/components/text";
import Dropdown from "./dropdown";
import { DropdownItem } from "@/utils/@types";
import theme from "@styles/theme";

// Interfaces for component props
export interface SelectableOption {
  key: string;
  value: string;
  label: ReactNode | string;
  disabled?: boolean;
}

interface SelectableProps {
  options: SelectableOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  theme?: {
    colors: {
      text: {
        primary: string;
        secondary: string;
      }
    }
  };
}

// Selected item display component
const SelectedItemDisplay = ({
  children,
  theme
}: {
  children?: ReactNode;
  theme?: {
    colors: {
      text: {
        primary: string;
      }
    }
  };
}) => {
  return (
    <div className="w-full py-1 px-2 bg-bg-quantinary cursor-pointer flex gap-1 rounded-md">
      <IoCheckmarkDone 
        color={theme?.colors.text.primary || "currentColor"}
      />
      <Text
        textColor={theme?.colors.text.primary || "currentColor"}
      >
        {children}
      </Text>
    </div>
  );
};

const Selectable = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  dropdownClassName = "",
}: SelectableProps) => {
  // For controlled or uncontrolled usage
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

  // Update internal state when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Handle selection change
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Get display label for selected value
  const getSelectedLabel = () => {
    const selected = options.find(option => option.value === selectedValue);
    return selected ? (typeof selected.label === 'string' ? selected.label : selected.value) : placeholder;
  };

  // Create menu items from options
  const menuItems: DropdownItem[] = options.map((option, index) => {
    // Add divider before all items except the first one
    const items: DropdownItem[] = [];
    if (index > 0) {
      items.push({ 
        key: `divider-${option.key}`, 
        type: "divider" 
      });
    }

    // Add the option itself
    items.push({
      key: option.key,
      label: selectedValue === option.value 
        ? <SelectedItemDisplay theme={theme}>{option.label}</SelectedItemDisplay> 
        : option.label,
      onClick: () => handleSelect(option.value),
      disabled: option.disabled
    });

    return items;
  }).flat(); // Flatten the array of arrays

  return (
    <div className={`selectable-dropdown flex flex-1 h-full ${className}`}>
      <Dropdown
        outterContainerClassName="flex flex-1 h-full"
        menuItems={menuItems}
        className={dropdownClassName}
      >
        <div className="flex flex-1 px-3 w-full h-full rounded-lg bg-bg-secondary justify-between items-center cursor-pointer hover:bg-bg-quantinary">
            <Text 
                textColor={theme?.colors.text.primary}
            >
                {getSelectedLabel()}
            </Text>
            <FaAngleDown 
                color={theme?.colors.text.secondary}
                size={12}
            />
        </div>
      </Dropdown>
    </div>
  );
};

export default Selectable;