import { Button } from "@/components/ui/button";
import { PenBox, Trash2 } from "lucide-react";

const WhatTheySectionClientCard = ({ clientDetail }) => {
  const { client_name, client_location } = clientDetail;
  return (
    <div className="w-full min-h-16 h-16 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg">
      <p className="text-lg font-semibold">{client_name}</p>
      <p className="text-sm font-normal">{client_location}</p>
      <div className="flex justify-center items-center gap-1 mt-2">
        <Button size="icon" className="rounded-full">
          <PenBox />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          color="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default WhatTheySectionClientCard;
