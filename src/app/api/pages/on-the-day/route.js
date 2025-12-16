import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();

    // Get media page
    const page = await Page.findOne({ slug: "on_the_day" });
    if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ page });
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, section_image_url, description } = body;

        if (!title || !section_image_url || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContent = {
            _id: new mongoose.Types.ObjectId(),
            title,
            section_image_url,
            description,
        };

        let page = await Page.findOne({ slug: "on_the_day" });

        if (!page) {
            page = new Page({ slug: "on_the_day", components: [], title: "ON THE DAY", heading: "WHAT TO EXPECT FROM A NIGHT WITH THE WHITE ROOMS", status: "published" });
        }

        const componentIndex = page.components.findIndex(c => c.type === "contents");

        if (componentIndex > -1) {
            const contents = page.components[componentIndex].data.contents || [];
            page.components[componentIndex].data.contents = [...contents, newContent];
        } else {
            page.components.push({
                type: "contents",
                data: { contents: [newContent] }
            });
        }

        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, contents: newContent });
    } catch (error) {
        console.error("Error creating media:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { _id, title, section_image_url, description } = body;

        if (!_id || !section_image_url || !description || !title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "on_the_day" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "contents");
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const contents = page.components[componentIndex].data.contents || [];
        const concertIndex = contents.findIndex(concert => concert._id?.toString() === _id);

        if (concertIndex === -1) return NextResponse.json({ error: "Concert not found" }, { status: 404 });

        // Update the concert
        contents[concertIndex] = { _id, title, section_image_url, description };

        page.components[componentIndex].data.contents = contents;
        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, content: contents[concertIndex] });
    } catch (error) {
        console.error("Error updating concert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE - Remove content by _id
export async function DELETE(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json({ error: "Missing content _id" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "on_the_day" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "contents");
        console.log("Component Index=====>", componentIndex);
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const existingAssets = page.components[componentIndex].data.contents || [];

        const updatingAssets = existingAssets.filter(content => content._id?.toString() !== _id);

        if (updatingAssets.length === existingAssets.length) {
            return NextResponse.json({ error: "content not found" }, { status: 404 });
        }

        page.components[componentIndex].data.contents = updatingAssets;
        page.markModified("components");
        await page.save();
        return NextResponse.json({ success: true, message: "content deleted" });
    } catch (error) {
        console.error("Error deleting content:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

