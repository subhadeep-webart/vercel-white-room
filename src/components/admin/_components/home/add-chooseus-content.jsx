import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import FormErrorText from "../forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import useAddReview from "@/hooks/useAddReview";
import useUpdateReview from "@/hooks/useUpdateReview";

const AddChooseusContent = ({
  openAddContent,
  setOpenAddContent,
  refetch,
  isEdited = false,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reviewer_name: "",
      ratings: "",
      reviews: "",
      reviewer_position: ""
    },
  });

  console.log("Default Values====>", defaultValues);
  // Reset form when dialog opens or defaultValues change
  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      reset({
        reviewer_name: defaultValues.name || "",
        ratings: defaultValues.rating || "",
        reviews: defaultValues.comment || "",
        reviewer_position: defaultValues.position || "",
      });
    }
  }, [defaultValues, reset]);

  const { handleSubmitReview, loading: isSubmitReviewLoading } =
    useAddReview(refetch);
  const { handleUpdateReview, loading: isUpdateReviewLoading } =
    useUpdateReview(refetch);

  const onSubmit = async (data) => {
    if (isEdited && defaultValues?._id) {
      await handleUpdateReview({ ...data, _id: defaultValues._id });
    } else {
      await handleSubmitReview(data);
    }

    reset();
    setOpenAddContent(false);
  };

  const isLoading = isSubmitReviewLoading || isUpdateReviewLoading;

  return (
    <Dialog open={openAddContent} onOpenChange={setOpenAddContent}>
      <DialogContent className="bg-[#f0f3f8] !max-w-2/3 !w-full">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">
            {isEdited ? "Edit Review" : "Add Review"}
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-full p-6 rounded-md space-y-6">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reviewer Name */}
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="reviewer_name" className="mb-1 block">
                  Reviewer Name
                </Label>
                <Input
                  id="reviewer_name"
                  placeholder="Enter Reviewer Name"
                  {...register("reviewer_name", {
                    required: "Name is required",
                  })}
                />
                {errors.reviewer_name && (
                  <FormErrorText errorText={errors.reviewer_name.message} />
                )}
              </div>

              {/* Rating */}
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="ratings" className="mb-1 block">
                  Rating (1-5)
                </Label>
                <Input
                  id="ratings"
                  type="number"
                  placeholder="Enter Rating"
                  {...register("ratings", {
                    required: "Rating is required",
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 5, message: "Maximum rating is 5" },
                  })}
                />
                {errors.ratings && (
                  <FormErrorText errorText={errors.ratings.message} />
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-1">
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="reviewer_position" className="mb-1 block">
                  Position
                </Label>
                <Input
                  id="reviewer_position"
                  placeholder="Enter Reviewer Position"
                  {...register("reviewer_position", { required: "Reviewer Position is required" })}
                />
                {errors.reviewer_position && (
                  <FormErrorText errorText={errors.reviewer_position.message} />
                )}
              </div>
            </div>
            {/* Reviews */}
            <div className="w-full grid grid-cols-1">
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="reviews" className="mb-1 block">
                  Reviews
                </Label>
                <Textarea
                  id="reviews"
                  placeholder="Enter Reviews"
                  rows={4}
                  {...register("reviews", { required: "Review is required" })}
                />
                {errors.reviews && (
                  <FormErrorText errorText={errors.reviews.message} />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-32" disabled={isLoading}>
                {isLoading ? <Loader /> : isEdited ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddChooseusContent;
