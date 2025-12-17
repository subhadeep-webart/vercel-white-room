import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

export async function PUT(request) {
    await dbConnect();

    const body = await request.json();
    const { type, data } = body;

    console.log("Data========>", data);

    if (!type || !data) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Find the "home" page, or create it if it doesn't exist
    let page = await Page.findOne({ slug: "booking-us" });

    if (!page) {
        page = new Page({
            title: "WHAT YOU GET WHEN YOU BOOK THE WHITE ROOMS",
            slug: "booking-us",
            status: "published",
            components: [],
        });
    }

    // Find if the component already exists
    const existingComponentIndex = page.components.findIndex(
        (component) => component.type === type
    );

    console.log("Existing Component", existingComponentIndex);

    if (existingComponentIndex > -1) {
        // Update existing component
        page.components[existingComponentIndex].data = data;
    } else {
        // Add new component
        page.components.push({ type, data });
    }

    await page.save();

    return NextResponse.json({ success: true, page });
}
