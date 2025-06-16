import { Plus } from "lucide-react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
type LargeCreateButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function LargeCreateButton({
  label,
  onClick,
  className,
}: LargeCreateButtonProps) {
  return (
    <button
      className={cn(
        "w-52 min-w-52 rounded-lg text-muted-foreground bg-muted border p-5 flex flex-col gap-5 items-center justify-center",
        className
      )}
      onClick={onClick}
    >
      <Plus size={42} strokeWidth={1} />
      <Typography variant="h5" className="">
        {label}
      </Typography>
    </button>
  );
}
