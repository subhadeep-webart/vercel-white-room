import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

// GET - Get a concert by _id
export async function GET(request, { params }) {
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Missing coverage ID" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "media" });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        const component = page.components.find(c => c.type === "media_assets");
        if (!component) {
            return NextResponse.json({ error: "Media not found" }, { status: 404 });
        }

        const media_asset = component.data.media_assets.find(c => c._id?.toString() === id);
        console.log("Media Assets=======>", media_asset);
        if (!media_asset) {
            return NextResponse.json({ error: "media not found" }, { status: 404 });
        }

        return NextResponse.json({ media_asset });
    } catch (error) {
        console.error("Error fetching media:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
