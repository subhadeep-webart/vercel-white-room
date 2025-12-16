const AdminNoDataFound = ({ noDataContent }) => {
    return (
        <div className="p-3 bg-[#f0f3f8]">
            <div className="w-full h-1/2 flex justify-center items-center">
                {noDataContent ?? ""}
            </div>
        </div>
    )
}

export default AdminNoDataFound;