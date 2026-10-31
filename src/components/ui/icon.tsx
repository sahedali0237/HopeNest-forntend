import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
  asChild?: boolean;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size, className, asChild, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : "svg";

    return (
      <Comp
        ref={ref}
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(className)}
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";

export { Icon };
