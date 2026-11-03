"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Select = React.forwardRef(function Select(
  props: SelectProps,
  ref
) {
  const {
    value,
    onValueChange,
    children,
    placeholder,
    className,
    ...propsRest
  } = props;

  const mountedRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mountedRef}
      className={cn(
        "relative flex h-10 w-full items-center rounded-md border border-border bg-muted px-3 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition focus-within:outline-none",
        className,
        "focus-within:border-primary"
      )}
      {...propsRest}
    >
      {children}
      {placeholder && (
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 pl-1 text-stone-400 select-none"
        >
          {placeholder}
        </span>
      )}
    </div>
  );
});

Select.displayName = "Select";

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const SelectTrigger = React.forwardRef(function SelectTrigger(
  props: SelectTriggerProps,
  ref
) {
  const { children, className, ...propsRest } = props;

  const mountedRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={mountedRef}
      type="button"
      role="combobox"
      aria-expanded="false"
      aria-haspopup="listbox"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md bg-transparent px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...propsRest}
    >
      {children}
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps
  extends React.ComponentPropsWithoutRef<"span"> {
  placeholder?: string;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
}

export const SelectValue = React.forwardRef(function SelectValue(
  props: SelectValueProps,
  ref
) {
  const { placeholder, children, className, ...propsRest } = props;

  const mountedRef = React.useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={mountedRef}
      className={cn(
        "pointer-events-none flex flex-1 items-center text-sm text-foreground",
        placeholder && "text-muted-foreground",
        className
      )}
      {...propsRest}
    >
      {children ?? placeholder}
    </span>
  );
});

SelectValue.displayName = "SelectValue";

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const SelectContent = React.forwardRef(function SelectContent(
  props: SelectContentProps,
  ref
) {
  const { children, className, ...propsRest } = props;

  const mountedRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mountedRef}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-card text-foreground shadow-md",
        className
      )}
      {...propsRest}
    >
      <div className="max-h-96 overflow-y-auto">{children}</div>
    </div>
  );
});

SelectContent.displayName = "SelectContent";

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const SelectItem = React.forwardRef(function SelectItem(
  props: SelectItemProps,
  ref
) {
  const { value, children, disabled, className, ...propsRest } = props;

  const mountedRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mountedRef}
      role="option"
      aria-selected="false"
      aria-disabled={disabled}
      /* @ts-expect-error - value prop is required by Radix SelectItem but not in HTML div props */
      value={value as string}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-primary/10 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...propsRest as React.ComponentPropsWithoutRef<"div">}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = "SelectItem";