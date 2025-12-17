import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import cloudinary from "@/utils/config";
import { getPublicIdFromUrl } from "@/utils/helper";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        // Extract public_id from Cloudinary URL
        const publicId = getPublicIdFromUrl(url);

        if (!publicId) {
            return NextResponse.json({ error: "Invalid Cloudinary URL" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "home" });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        const componentIndex = page.components.findIndex(
            (comp) => comp.type === "worked_for"
        );

        if (componentIndex === -1) {
            return NextResponse.json({ error: "Image section not found" }, { status: 404 });
        }

        page.components[componentIndex].data.images =
            page.components[componentIndex].data.images.filter((imgUrl) => imgUrl !== url);

        page.markModified("components");
        await page.save();
        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("DELETE IMAGE ERROR:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}