import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "tw-bk-inline-flex tw-bk-items-center tw-bk-gap-2 tw-bk-justify-center tw-bk-rounded-md tw-bk-text-sm tw-bk-font-medium tw-bk-ring-offset-background tw-bk-transition-colors focus-visible:tw-bk-outline-none focus-visible:tw-bk-ring-2 focus-visible:tw-bk-ring-ring focus-visible:tw-bk-ring-offset-2 disabled:tw-bk-pointer-events-none disabled:tw-bk-opacity-50",
  {
    variants: {
      variant: {
        default:
          "tw-bk-bg-primary tw-bk-text-primary-foreground hover:tw-bk-bg-primary/80",
        accent:
          "tw-bk-bg-accent tw-bk-text-accent-foreground hover:tw-bk-bg-accent/80",
      },
      size: {
        default: "tw-bk-h-10 tw-bk-px-4 tw-bk-py-2",
        sm: "tw-bk-h-9 tw-bk-rounded-md tw-bk-px-3",
        lg: "tw-bk-h-11 tw-bk-rounded-md tw-bk-px-8",
        icon: "tw-bk-h-10 tw-bk-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="tw-bk-animate-spin tw-bk-rounded-full tw-bk-h-4 tw-bk-w-4 tw-bk-border-4 tw-bk-border-gray-300 tw-bk-border-l-white tw-bk-items-center tw-bk-justify-center tw-bk-mx-auto" />
        ) : (
          props.children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
