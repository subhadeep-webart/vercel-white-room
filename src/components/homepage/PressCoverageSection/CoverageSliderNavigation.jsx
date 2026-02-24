import { ChevronLeft, ChevronRight } from "lucide-react";

const CoverageSliderNavigation = ({ prevRef, nextRef }) => {
    return (
        <div className="mr-10 mt-10 justify-end gap-2 hidden md:flex lg:hidden">
            <button
                ref={prevRef}
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
                <ChevronLeft className="h-6 w-6 text-gray-500" />
            </button>
            <button
                ref={nextRef}
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
                <ChevronRight className="h-6 w-6 text-gray-500" />
            </button>
        </div>
    );
};

export default CoverageSliderNavigation;