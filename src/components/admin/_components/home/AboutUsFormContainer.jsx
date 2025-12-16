"use client";

import React from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/common/RichTextEditor";
import { useUpdateAboutUsPage } from "@/hooks/useUpdateAboutUsPage";
import { useGetAboutPageContent } from "@/hooks/useGetAboutPageContent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import FormErrorText from "../forms/FormErrorText";
import { Loader } from "@/components/common/Loader";
import { getComponentByType } from "@/utils/helper";

const AboutUsFormContainer = () => {
  const {
    data: aboutPageContent,
    loading: isAboutPageContentLoading,
    error: isAboutPageError,
  } = useGetAboutPageContent();
  const {
    handleUpdateAboutUs,
    loading: isUpdatingAboutPage,
    error: isAboutUpdateError,
    success: isAboutUpdateSuccess,
  } = useUpdateAboutUsPage();

  console.log("About Us Page Content======>", aboutPageContent);

  const contents = getComponentByType(aboutPageContent, "about_us");
  console.log("about_us", contents);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      footer_text: "",
      button_text: "",
      button_url: "",
    },
  });

  useEffect(() => {
    if (contents) {
      reset({
        title: contents?.title || "",
        description: contents?.description || "",
        footer_text: contents?.footer_text || "",
        button_text: contents?.button_text || "",
        button_url: contents?.button_url || "",
      });
    }
  }, [contents, reset]);

  const onSubmit = async (data) => {
    await handleUpdateAboutUs(data);
  };

  if (isAboutPageContentLoading) {
    return <AdminPageLoader content="Loading About Page Content" />;
  }

  return (
    <div className="overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <div className="max-w-full p-6 rounded-md space-y-6 ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 w-full">
            <Label htmlFor="about-header" className="mb-1 block">
              Title
            </Label>
            <Input
              id="about-header"
              {...register("title", { required: "Header is required" })}
              placeholder="Enter Header"
            />
            {errors.header && (
              <FormErrorText errorText={errors.header.message} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 w-full">
            <Label htmlFor="about-footer" className="mb-1 block">
              Footer Text
            </Label>
            <Input
              id="about-footer"
              {...register("footer_text", {
                required: "Footer Text is required",
              })}
              placeholder="Enter Footer Text"
            />
            {errors.footer_text && (
              <FormErrorText errorText={errors.footer_text.message} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 w-full">
            <Label htmlFor="button_text" className="mb-1 block">
              Button Text
            </Label>
            <Input
              id="button_text"
              {...register("button_text", {
                required: "Button Text is required",
              })}
              placeholder="Enter Button Text"
            />
            {errors.button_text && (
              <FormErrorText errorText={errors.button_text.message} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 w-full">
            <Label htmlFor="button_url" className="mb-1 block">
              Button Url
            </Label>
            <Input
              id="button_url"
              {...register("button_url", {
                required: "Button Url is required",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
                  message: "Enter a valid URL",
                },
              })}
              placeholder="Enter Button Url"
            />
            {errors.button_url && (
              <FormErrorText errorText={errors.button_url.message} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 w-full">
            <Label htmlFor="about-description" className="mb-1 block">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description && (
              <FormErrorText errorText={errors.description.message} />
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-32">
              {isUpdatingAboutPage ? <Loader /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUsFormContainer;
