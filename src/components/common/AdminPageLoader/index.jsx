import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"

const AdminPageLoader = ({ content }) => {
    return (
        <div className="w-full h-1/2 flex justify-center items-center">
            <Button size="md" variant={"ghost"}>
                <Spinner />
                {content} ....
            </Button>
        </div>
    )
}

export default AdminPageLoader;