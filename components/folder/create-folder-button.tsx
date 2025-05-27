import { Plus } from "lucide-react";
import { Typography } from "../ui/typography";

export default function CreateFolderButton() {
  return (
    <button className="w-52 rounded-lg text-muted-foreground bg-muted border p-5 flex flex-col gap-5 items-center justify-center">
      <Plus size={42} strokeWidth={1} />
      <Typography variant="h5" className="">
        New Folder
      </Typography>
    </button>
  );
}
