import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetInstagramFeedHeader from "@/hooks/useGetInstagramFeedHeader";
import useUpdateInstagramFeedHeader from "@/hooks/useUpdateInstagramFeedHeader";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const InstagramFeedAddHeader = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { handleUpdateInstagramFeedHeader, loading } =
    useUpdateInstagramFeedHeader(refetch);
  const { title,refetch: refetchHeader } = useGetInstagramFeedHeader();

  useEffect(() => {
    if (title) {
      setValue("headerText", title);
    }
  }, [title, setValue]);

  const onSubmit = async (data) => {
    if (!data.headerText) return;

    const res = await handleUpdateInstagramFeedHeader(data.headerText);
    console.log("res instagram feed header", res);
    if (res?.success) {
      reset();
      await refetchHeader()
    }
  };
  return (
    <form
      className="space-y-4 bg-white shadow-md px-4 py-4 rounded-md mb-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-black text-lg font-semibold">Add Header Text</p>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="headerText" className="mb-2 block">
            Header Text
          </Label>
          <Input
            id="headerText"
            placeholder="Header Text"
            {...register("headerText", { required: "Header text is required" })}
          />
          {errors.headerText && (
            <FormErrorText errorText={errors.headerText.message} />
          )}
        </div>

        <Button
          type="submit"
          className="w-32 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default InstagramFeedAddHeader;
