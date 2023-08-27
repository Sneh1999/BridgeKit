import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "tw-bk-flex tw-bk-h-10 tw-bk-w-full tw-bk-rounded-md tw-bk-border tw-bk-border-input tw-bk-bg-background tw-bk-px-3 tw-bk-py-2 tw-bk-text-sm tw-bk-ring-offset-background file:tw-bk-border-0 file:tw-bk-bg-transparent file:tw-bk-text-sm file:tw-bk-font-medium placeholder:tw-bk-text-muted-foreground focus-visible:tw-bk-outline-none focus-visible:tw-bk-ring-2 focus-visible:tw-bk-ring-ring focus-visible:tw-bk-ring-offset-2 disabled:tw-bk-cursor-not-allowed disabled:tw-bk-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
