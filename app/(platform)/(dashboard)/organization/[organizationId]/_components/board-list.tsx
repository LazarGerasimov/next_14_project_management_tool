import { User2Icon } from "lucide-react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your boards.
      </div>
    </div>
  );
};

export default BoardList;
