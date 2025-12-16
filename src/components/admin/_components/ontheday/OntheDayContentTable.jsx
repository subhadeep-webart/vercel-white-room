"use client"

import AlertBox from "@/components/common/AlertBox";
import SmallImageCard from "@/components/common/SmallImageCard";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useDeleteOntheDayPageContentById from "@/hooks/useDeleteOntheDayPageContentById";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const OntheDayContentTable = ({ columns, data, refetch }) => {

    const { handleDeleteOnTheDayPageContent, loading: isDeletingContent } = useDeleteOntheDayPageContentById(refetch);
    return (
        <div className="overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
            <Table className="w-full text-sm text-gray-700">
                <TableCaption className="text-center text-gray-600 font-medium py-4">
                    A list of on the day contents
                </TableCaption>

                <TableHeader>
                    <TableRow className="bg-[#28354f] hover:bg-[#28354f]">
                        {columns.map((col, idx) => (
                            <TableHead
                                key={idx}
                                className={`px-6 py-4 text-sm font-semibold text-slate-200 border-b border-gray-300 ${col.align === "right" ? "text-right" : "text-left"
                                    }`}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length ? (
                        data.map((row, rowIndex) => {
                            console.log("Row Data=======>abc", row);
                            return (
                                <TableRow
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    {columns.map((col, colIndex) => (
                                        <TableCell
                                            key={colIndex}
                                            className={`px-6 py-4 border-b border-gray-200 whitespace-nowrap truncate max-w-[200px] ${col.align === "right" ? "text-right" : "text-left"}`}
                                        >
                                            {col.accessorKey === "actions" ? (
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/dashboard/on-the-day/content/edit-section/${row?._id}`}
                                                        type="button"
                                                        className="cursor-pointer"
                                                    >
                                                        <SquarePen
                                                            size={18}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>
                                                    <AlertBox onDelete={handleDeleteOnTheDayPageContent} rowData={row} />
                                                </div>
                                            ) : col.accessorKey === "section_image_url" && row[col.accessorKey] ? (
                                                <SmallImageCard imageUrl={row[col.accessorKey]} />
                                            ) : (
                                                row[col.accessorKey] ? <p dangerouslySetInnerHTML={{ __html: row[col.accessorKey] }} className="text-left"></p> : "-"
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-8 text-gray-400 italic"
                            >
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default OntheDayContentTable;
