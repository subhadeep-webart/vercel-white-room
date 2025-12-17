"use client";

import AddChooseusContent from "@/components/admin/_components/home/add-chooseus-content";
import Tables from "@/components/admin/_components/tables/page";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { Button } from "@/components/ui/button";
import useDeleteReviewByReviewId from "@/hooks/useDeleteReviewByReviewId";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { ALL_REVIEWS_TABLE_COLUMNS } from "@/utils/constants";
import { getComponentByType } from "@/utils/helper";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const ChooseUs = () => {
  const {
    data: homeContent,
    loading: isReviewLoading,
    refetch,
  } = useGetHomePageContent();
  const { handleDeleteReview, loading: isDeleteReviewing } =
    useDeleteReviewByReviewId(refetch);
  const allReviews = getComponentByType(homeContent, "review_section");
  const [openAddContent, setOpenAddContent] = useState(false);
  const [openEditContent, setOpenEditContent] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const handleAdd = () => {
    setOpenAddContent(true);
  };

  const handleEditReview = (values) => {
    console.log("Calling edit content====>")
    setDefaultValues(values);
    setOpenEditContent(true);
  };

  if (isReviewLoading) {
    return <AdminPageLoader content={"Loading Reviews"} />;
  }

  console.log("All Reviews======>", allReviews);

  return (
    <>
      <div className="p-3 bg-[#f0f3f8]">
        <div className="flex justify-end items-end">
          <Button
            onClick={handleAdd}
            type="button"
            className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
   border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
          >
            <IoMdAddCircle size={20} />
            <span>Add Content</span>
          </Button>
        </div>
        <Tables
          caption="A list of reviews."
          type="review_sections"
          columns={ALL_REVIEWS_TABLE_COLUMNS}
          data={allReviews?.reviews}
          onUpdate={handleEditReview}
          onDelete={handleDeleteReview}
        />

        {openAddContent && (
          <AddChooseusContent
            openAddContent={openAddContent}
            setOpenAddContent={setOpenAddContent}
            refetch={refetch}
          />
        )}

        {openEditContent && (
          <AddChooseusContent
            openAddContent={openEditContent}
            setOpenAddContent={setOpenEditContent}
            refetch={refetch}
            isEdited={true}
            defaultValues={defaultValues}
          />
        )}
      </div>
    </>
  );
};

export default ChooseUs;
