import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();

    const body = await request.json();
    const { type, url } = body;

    if (!type || !url) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    let page = await Page.findOne({ slug: "home" });

    if (!page) {
        page = new Page({
            title: "Home Page",
            slug: "home",
            status: "published",
            components: [],
        });
    }

    // Find the "images_section" component
    const trustedUsImageComponentIndex = page.components.findIndex(
        (comp) => comp.type === "worked_for"
    );

    if (trustedUsImageComponentIndex > -1) {
        const existingImages = page.components[trustedUsImageComponentIndex].data.images || [];
        page.components[trustedUsImageComponentIndex].data.images = [...existingImages, url];
    } else {
        // Create the images section if it doesn't exist
        page.components.push({
            title: "TRUSTED BY",
            type: "worked_for",
            data: {
                images: [url],
            },
        });
    }

    page.markModified("components");
    await page.save();
    return NextResponse.json({ success: true, page });
}


