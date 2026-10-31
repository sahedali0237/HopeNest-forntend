import { cn } from "cn";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className={cn("block text-sm font-medium text-slate-700 dark:text-slate-300", className)} {...props} />;
};

export default Label;