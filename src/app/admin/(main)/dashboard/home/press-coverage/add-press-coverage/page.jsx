import AddPressCoverageForm from "@/components/admin/_components/home/AddPressCoverageForm";

const AddPressCoveragePage = () => {
  return (
    <>
      <div className="p-3 bg-[#f0f3f8]">
        <div className="max-w-full p-6 rounded-lg space-y-6 bg-white shadow-2xl">
          <p className="text-black font-semibold text-lg py-2">Add Poster</p>
          <AddPressCoverageForm />
        </div>
      </div>
    </>
  );
};

export default AddPressCoveragePage;
