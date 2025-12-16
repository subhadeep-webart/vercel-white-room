import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import cloudinary from "@/utils/config";
import { getPublicIdFromUrl } from "@/utils/helper";

export async function DELETE(request) {
    await dbConnect();

    const body = await request.json();
    const { url } = body;

    if (!url) {
        return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const publicId = getPublicIdFromUrl(url);

    if (!publicId) {
        return NextResponse.json({ error: "Invalid Cloudinary URL" }, { status: 400 });
    }

    try {
        const page = await Page.findOne({ slug: "about" });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        const componentIndex = page.components.findIndex(comp => comp.type === "about_us_images");

        if (componentIndex === -1) {
            return NextResponse.json({ error: "about_us_images section not found" }, { status: 404 });
        }

        const existingImages = page.components[componentIndex].data.images || [];

        const updatedImages = existingImages.filter(img => img !== url);

        page.components[componentIndex].data.images = updatedImages;
        page.markModified("components");
        await page.save();

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ success: true, updatedImages });

    } catch (err) {
        console.error("Error deleting image:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
