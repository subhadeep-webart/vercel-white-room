"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CloudinaryUploader from "@/components/common/CloudinaryUploader";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const ClientRow = ({ client, index, onChange, onDelete }) => {
  const handleField = (field, value) => {
    onChange(index, { ...client, [field]: value });
  };

  const handleLogoUpload = (info) => {
    const uploadedUrl = info?.secure_url;
    if (uploadedUrl) {
      handleField("client_logo", uploadedUrl);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 md:flex-row md:items-start">
      {/* Logo */}
      <div className="w-full md:w-56 shrink-0">
        <Label className="mb-1 block">Client Logo</Label>
        {client?.client_logo ? (
          <div className="relative w-full h-24 border rounded-md bg-[#0F1116]">
            <Image
              src={client.client_logo}
              alt={`${client?.client_name || "Client"} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="w-full h-24 border border-dashed rounded-md flex items-center justify-center text-xs text-gray-400">
            No logo uploaded
          </div>
        )}
        <CloudinaryUploader
          onUpload={handleLogoUpload}
          imageUrl={client?.client_logo}
        />
      </div>

      {/* Text fields */}
      <div className="flex-1 w-full flex flex-col gap-4">
        <div className="w-full">
          <Label htmlFor={`client_name_${index}`} className="mb-1 block">
            Client Name
          </Label>
          <Input
            id={`client_name_${index}`}
            placeholder="Enter Client Name"
            value={client?.client_name || ""}
            onChange={(e) => handleField("client_name", e.target.value)}
          />
        </div>

        <div className="w-full">
          <Label htmlFor={`client_location_${index}`} className="mb-1 block">
            Client Location
          </Label>
          <Input
            id={`client_location_${index}`}
            placeholder="Enter Client Location"
            value={client?.client_location || ""}
            onChange={(e) => handleField("client_location", e.target.value)}
          />
        </div>
      </div>

      {/* Delete */}
      <div className="shrink-0 flex md:flex-col items-center justify-end">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => onDelete(index)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default ClientRow;
