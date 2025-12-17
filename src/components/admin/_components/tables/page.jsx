import AlertBox from "@/components/common/AlertBox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";

const Tables = ({ caption, columns, data, type, onDelete,onUpdate }) => {
  return (
    <div className="overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <Table className="w-full text-sm text-gray-700">
        {caption && (
          <TableCaption className="text-center text-gray-600 font-medium py-4">
            {caption}
          </TableCaption>
        )}
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
          {data?.length ? (
            data.map((row, rowIndex) => {
              console.log("Row Data=======>abc", row);
              return (
                <TableRow key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={`px-6 py-4 border-b border-gray-200 whitespace-nowrap truncate max-w-[200px] ${col.align === "right" ? "text-right" : "text-left"
                        }`}
                    >
                      {col.accessorKey === "actions" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onUpdate(row)}
                            title="Edit"
                            className="cursor-pointer"
                          >
                            <SquarePen size={18} className="text-blue-600 hover:text-blue-800" />
                          </button>
                          <AlertBox onDelete={onDelete} rowData={row} />
                        </div>
                      ) : (
                        row[col.accessorKey] ?? "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )
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

export default Tables;
