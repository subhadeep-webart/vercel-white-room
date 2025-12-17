import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

export async function PUT(request) {
    await dbConnect();

    const body = await request.json();
    const { title, components } = body;

    // Validate input
    if (!title || !Array.isArray(components)) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const slug = "shop";

    // Try to find the page by slug
    let page = await Page.findOne({ slug });

    if (page) {
        // Update existing page
        page.title = title;
        page.components = components;
    } else {
        // Create a new page
        page = new Page({
            title,
            slug,
            status: "published", // default status, adjust if needed
            components
        });
    }

    await page.save();

    return NextResponse.json({ success: true, page });
}
