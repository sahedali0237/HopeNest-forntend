import { cn } from "cn";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className={cn("block text-sm font-medium text-foreground dark:text-muted-foreground", className)} {...props} />;
};

export default Label;