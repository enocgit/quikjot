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
        "text-muted-foreground bg-muted flex w-full flex-col items-center justify-center gap-5 rounded-lg border p-5 xl:w-52 xl:min-w-52",
        className,
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
