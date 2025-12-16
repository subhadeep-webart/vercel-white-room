"use client";

import { useRef } from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";

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
import useDeletePressCoverage from "@/hooks/useDeletePressCoverage";

const PressCoverageTable = ({ columns, data, refetch }) => {
    const { handleDeletePressCoverage, loading } = useDeletePressCoverage(refetch);

    // Ref to track the currently playing audio
    const currentAudioRef = useRef(null);

    const handlePlay = (audio) => {
        if (currentAudioRef.current && currentAudioRef.current !== audio) {
            currentAudioRef.current.pause(); // Pause previous audio
        }
        currentAudioRef.current = audio; // Set new audio as current
    };

    return (
        <div className="overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
            <Table className="w-full text-sm text-gray-700">
                <TableCaption className="text-center text-gray-600 font-medium py-4">
                    A list of coverages
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
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={`px-6 py-4 border-b border-gray-200 whitespace-nowrap truncate max-w-[200px] ${col.align === "right" ? "text-right" : "text-left"
                                            }`}
                                    >
                                        {col.accessorKey === "actions" ? (
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/dashboard/home/press-coverage/edit-press-coverage/${row?._id}`}
                                                    className="cursor-pointer"
                                                >
                                                    <SquarePen size={18} className="text-blue-600 hover:text-blue-800" />
                                                </Link>
                                                <AlertBox onDelete={handleDeletePressCoverage} rowData={row} />
                                            </div>
                                        ) : col.accessorKey === "poster_image" || col.accessorKey === "song_image" ? (
                                            row[col.accessorKey] ? <SmallImageCard imageUrl={row[col.accessorKey]} /> : "-"
                                        ) : col.accessorKey === "poster_song" ? (
                                            <audio
                                                controls
                                                className="w-64"
                                                onPlay={(e) => handlePlay(e.currentTarget)}
                                            >
                                                <source src={row[col.accessorKey]} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        ) : (
                                            row[col.accessorKey] ?? "-"
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-8 text-gray-400 italic">
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default PressCoverageTable;
