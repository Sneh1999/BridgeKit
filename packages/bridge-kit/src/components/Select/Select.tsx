"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "../../lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger> & {
    className?: string;
    children?: React.ReactNode;
  },
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "tw-bk-flex tw-bk-h-10 tw-bk-w-full tw-bk-items-center tw-bk-justify-between tw-bk-rounded-md tw-bk-border tw-bk-border-input tw-bk-bg-background tw-bk-px-3 tw-bk-py-2 tw-bk-text-sm tw-bk-ring-offset-background placeholder:tw-bk-text-muted-foreground focus:tw-bk-outline-none focus:tw-bk-ring-2 focus:tw-bk-ring-ring focus:tw-bk-ring-offset-2 disabled:tw-bk-cursor-not-allowed disabled:tw-bk-opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="tw-bk-h-4 tw-bk-w-4 tw-bk-opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content> & {
    className?: string;
    children?: React.ReactNode;
  },
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "tw-bk-relative tw-bk-z-50 tw-bk-min-w-[8rem] tw-bk-overflow-hidden tw-bk-rounded-md tw-bk-border tw-bk-bg-popover tw-bk-text-popover-foreground tw-bk-shadow-md data-[state=open]:tw-bk-animate-in data-[state=closed]:tw-bk-animate-out data-[state=closed]:tw-bk-fade-out-0 data-[state=open]:tw-bk-fade-in-0 data-[state=closed]:tw-bk-zoom-out-95 data-[state=open]:tw-bk-zoom-in-95 data-[side=bottom]:tw-bk-slide-in-from-top-2 data-[side=left]:tw-bk-slide-in-from-right-2 data-[side=right]:tw-bk-slide-in-from-left-2 data-[side=top]:tw-bk-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:tw-bk-translate-y-1 data-[side=left]:tw-bk--translate-x-1 data-[side=right]:tw-bk-translate-x-1 data-[side=top]:tw-bk--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "tw-bk-p-1",
          position === "popper" &&
            "tw-bk-h-[var(--radix-select-trigger-height)] tw-bk-w-full tw-bk-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "tw-bk-py-1.5 tw-bk-pl-8 tw-bk-pr-2 tw-bk-text-sm tw-bk-font-semibold",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item> & {
    className?: string;
    children?: React.ReactNode;
  },
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "tw-bk-relative tw-bk-flex tw-bk-w-full tw-bk-cursor-default hover:tw-bk-bg-secondary tw-bk-select-none tw-bk-items-center tw-bk-rounded-sm tw-bk-py-1.5 tw-bk-px-2 tw-bk-text-sm tw-bk-outline-none focus:tw-bk-bg-accent focus:tw-bk-text-accent-foreground data-[disabled]:tw-bk-pointer-events-none data-[disabled]:tw-bk-opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "tw-bk--mx-1 tw-bk-my-1 tw-bk-h-px tw-bk-bg-muted",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
