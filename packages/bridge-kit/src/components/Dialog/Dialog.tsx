"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay> & { className?: string },
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "tw-bk-fixed tw-bk-inset-0 tw-bk-z-50 tw-bk-bg-background/80 tw-bk-backdrop-blur-sm data-[state=open]:tw-bk-animate-in data-[state=closed]:tw-bk-animate-out data-[state=closed]:tw-bk-fade-out-0 data-[state=open]:tw-bk-fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content> & { className?: string },
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "tw-bk-fixed tw-bk-left-[50%] tw-bk-top-[50%] tw-bk-z-50 tw-bk-grid tw-bk-w-full tw-bk-max-w-2xl tw-bk-translate-x-[-50%] tw-bk-translate-y-[-50%] tw-bk-gap-4 tw-bk-border tw-bk-bg-background tw-bk-p-6 tw-bk-shadow-lg tw-bk-duration-200 data-[state=open]:tw-bk-animate-in data-[state=closed]:tw-bk-animate-out data-[state=closed]:tw-bk-fade-out-0 data-[state=open]:tw-bk-fade-in-0 data-[state=closed]:tw-bk-zoom-out-95 data-[state=open]:tw-bk-zoom-in-95 data-[state=closed]:tw-bk-slide-out-to-left-1/2 data-[state=closed]:tw-bk-slide-out-to-top-[48%] data-[state=open]:tw-bk-slide-in-from-left-1/2 data-[state=open]:tw-bk-slide-in-from-top-[48%] sm:tw-bk-rounded-lg md:tw-bk-w-full",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="tw-bk-absolute tw-bk-right-4 tw-bk-top-4 tw-bk-rounded-sm tw-bk-opacity-70 tw-bk-ring-offset-background tw-bk-transition-opacity hover:tw-bk-opacity-100 focus:tw-bk-outline-none focus:tw-bk-ring-2 focus:tw-bk-ring-ring focus:tw-bk-ring-offset-2 disabled:tw-bk-pointer-events-none data-[state=open]:tw-bk-bg-accent data-[state=open]:tw-bk-text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="tw-bk-h-4 tw-bk-w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="tw-bk-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tw-bk-flex tw-bk-flex-col tw-bk-space-y-1.5 tw-bk-text-center sm:tw-bk-text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tw-bk-flex tw-bk-flex-col-reverse sm:tw-bk-flex-row sm:tw-bk-justify-end sm:tw-bk-space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title> & {
    className?: string;
    children?: React.ReactNode;
  },
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "tw-bk-text-lg tw-bk-font-semibold tw-bk-leading-none tw-bk-tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<DialogDescriptionProps, "className">
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    {...props}
    className={cn("tw-bk-text-sm tw-bk-text-muted-foreground", className)}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
