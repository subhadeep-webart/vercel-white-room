import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormErrorText from "../forms/FormErrorText";

const AddClientModal = ({
  openAddClientModal,
  setOpenAddClientModal,
  onClientAdd,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      client_name: "",
      client_location: "",
    },
  });

  const onSubmit = (data) => {
    onClientAdd(data);
    reset();
  };

  return (
    <Dialog open={openAddClientModal} onOpenChange={setOpenAddClientModal}>
      <DialogContent className="bg-[#f0f3f8] max-w-lg !w-full">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">
            Add Client
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-full p-6 rounded-md space-y-6">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="client_name" className="mb-1 block">
                  Client Name
                </Label>
                <Input
                  id="client_name"
                  placeholder="Enter Client Name"
                  {...register("client_name", {
                    required: "Name is required",
                  })}
                />
                {errors.client_name && (
                  <FormErrorText errorText={errors.client_name.message} />
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-1">
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="client_location" className="mb-1 block">
                  Client Location
                </Label>
                <Input
                  id="client_location"
                  placeholder="Enter Client Location"
                  {...register("client_location", {
                    required: "Client Location is required",
                  })}
                />
                {errors.client_location && (
                  <FormErrorText errorText={errors.client_location.message} />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-32">
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
