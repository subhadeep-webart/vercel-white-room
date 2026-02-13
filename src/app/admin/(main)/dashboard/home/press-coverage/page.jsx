"use client"
import PressCoverageAddHeader from "@/components/admin/_components/home/PressCoverageAddHeader";
import PressCoverageTable from "@/components/admin/_components/home/PressCoverageTable";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import useGetAllPressCoverages from "@/hooks/useGetAllPressCoverages";
import { PRESS_COVERAGE_COLUMNS } from "@/utils/constants";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";

const PressCoveragePage = () => {
    const { coverages, loading: isPressCoveragesFetching, refetch } = useGetAllPressCoverages();

    if (isPressCoveragesFetching) {
        return <AdminPageLoader content={"Loading press coverage section content"} />
    }

    return (
        <div className="p-3 bg-[#f0f3f8]">
            <PressCoverageAddHeader/>
            <div className="flex justify-end items-end">
                <Link
                    href={"/admin/dashboard/home/press-coverage/add-press-coverage"}
                    type="button"
                    className="btn-11 relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
          border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
                >
                    <IoMdAddCircle size={20} />
                    <span>Add Poster</span>
                </Link>
            </div>
            <PressCoverageTable
                columns={PRESS_COVERAGE_COLUMNS}
                data={coverages}
                refetch={refetch}
            />
        </div>
    )
}

export default PressCoveragePage;