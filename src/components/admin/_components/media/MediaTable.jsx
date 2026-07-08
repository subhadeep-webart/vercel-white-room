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
import useDeleteConcert from "@/hooks/useDeleteConcert";
import useDeleteMediaById from "@/hooks/useDeleteMediaById";
import { MEDIA_COVERAGE_TABLE_COLUMNS } from "@/utils/constants";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MediaTable = ({ data, refetch }) => {
  const router = useRouter();

  const { handleDeleteMedia, loading: isMediaDeleting } =
    useDeleteMediaById(refetch);

  return (
    <div className="overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <Table className="w-full text-sm text-gray-700">
        <TableCaption className="text-center text-gray-600 font-medium py-4">
          A list of concerts
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-[#28354f] hover:bg-[#28354f]">
            {MEDIA_COVERAGE_TABLE_COLUMNS.map((col, idx) => (
              <TableHead
                key={idx}
                className={`px-6 py-4 text-sm font-semibold text-slate-200 border-b border-gray-300 ${
                  col.align === "right" ? "text-right" : "text-left"
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
                  {MEDIA_COVERAGE_TABLE_COLUMNS.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={`px-6 py-4 border-b border-gray-200 whitespace-nowrap truncate max-w-[200px] ${col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {col.accessorKey === "actions" ? (
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/dashboard/media/edit-media/${row?._id}`}
                            type="button"
                            className="cursor-pointer"
                          >
                            <SquarePen
                              size={18}
                              className="text-blue-600 hover:text-blue-800"
                            />
                          </Link>
                          <AlertBox
                            onDelete={handleDeleteMedia}
                            rowData={row}
                          />
                        </div>
                      ) : row[col.accessorKey] &&
                        col.accessorKey === "file_url" ? (
                        <SmallImageCard imageUrl={row[col.accessorKey]} />
                      ) : (
                        (row[col.accessorKey] ?? "-")
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={MEDIA_COVERAGE_TABLE_COLUMNS.length}
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

export default MediaTable;
