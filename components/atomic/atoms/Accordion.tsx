"use client";

import { cn } from "@/lib/utils";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AccordionType = "single";

interface AccordionContextValue {
  value?: string;
  setValue: (nextValue?: string) => void;
  collapsible: boolean;
}

interface AccordionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

interface AccordionProps {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string;
  className?: string;
  children: ReactNode;
}

const Accordion = ({
  type = "single",
  collapsible = false,
  defaultValue,
  className,
  children,
}: AccordionProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
      collapsible,
      type,
    }),
    [value, collapsible, type],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn(className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}

const AccordionItem = ({ value, className, children }: AccordionItemProps) => {
  const accordion = useContext(AccordionContext);

  if (!accordion) {
    return null;
  }

  const isOpen = accordion.value === value;

  const toggle = () => {
    if (isOpen && accordion.collapsible) {
      accordion.setValue(undefined);
      return;
    }

    accordion.setValue(value);
  };

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle }}>
      <div className={cn(className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

const AccordionTrigger = ({ className, children }: AccordionTriggerProps) => {
  const item = useContext(AccordionItemContext);

  if (!item) {
    return null;
  }

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={item.toggle}
      data-state={item.isOpen ? "open" : "closed"}
      aria-expanded={item.isOpen}
    >
      {children}
    </button>
  );
};

interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

const AccordionContent = ({ className, children }: AccordionContentProps) => {
  const item = useContext(AccordionItemContext);

  if (!item) {
    return null;
  }

  return (
    <div
      className="grid transition-all duration-300 ease-in-out"
      style={{ gridTemplateRows: item.isOpen ? "1fr" : "0fr" }}
      data-state={item.isOpen ? "open" : "closed"}
      aria-hidden={!item.isOpen}
    >
      <div className="overflow-hidden">
        <div className={cn(className)}>{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
