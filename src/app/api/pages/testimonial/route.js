import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    const page = await Page.findOne({ slug: "testimonial", status: "published" }).lean();
    console.log("Page Data found conlose=====>", page);
    if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
}