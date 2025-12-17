import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

// GET - Get a concert by _id
export async function GET(request, { params }) {
    try {
        await dbConnect();


        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Missing Content ID" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "on_the_day" });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        const component = page.components.find(c => c.type === "contents");
        if (!component) {
            return NextResponse.json({ error: "Content not found" }, { status: 404 });
        }

        const content = component.data.contents.find(c => c._id?.toString() === id);
        console.log("Media Assets=======>", content);
        if (!content) {
            return NextResponse.json({ error: "media not found" }, { status: 404 });
        }

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Error fetching media:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
