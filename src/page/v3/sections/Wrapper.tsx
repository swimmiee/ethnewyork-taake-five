import { cn } from "utils/cn";

export const Wrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className={cn("flex flex-col flex-1 p-4", className)}
      {...props}
    />
  );
};
