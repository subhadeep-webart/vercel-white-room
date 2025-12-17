import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// POST - Create a new concert
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { concert_name,concert_image_url, concert_description, youtube_link } = body;

        if (!concert_name || !concert_image_url || !concert_description || !youtube_link) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newConcert = {
            _id: new mongoose.Types.ObjectId(),
            concert_name,
            concert_image_url,
            concert_description,
            youtube_link,
        };

        let page = await Page.findOne({ slug: "home" });

        if (!page) {
            page = new Page({ slug: "home", components: [] });
        }

        const componentIndex = page.components.findIndex(c => c.type === "latest_concerts");

        if (componentIndex > -1) {
            const concerts = page.components[componentIndex].data.concerts || [];
            page.components[componentIndex].data.concerts = [...concerts, newConcert];
        } else {
            page.components.push({
                type: "latest_concerts",
                data: { concerts: [newConcert] }
            });
        }

        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, concert: newConcert });
    } catch (error) {
        console.error("Error creating concert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// GET - Retrieve all concerts
export async function GET() {
    try {
        console.log("Calling========> inside latest concerts")
        await dbConnect();
        const page = await Page.findOne({ slug: "home" });

        const component = page?.components.find(c => c.type === "latest_concerts");
        const concerts = component?.data?.concerts || [];

        return NextResponse.json({ concerts });
    } catch (error) {
        console.error("Error fetching concerts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT - Update concert by _id
export async function PUT(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { _id,concert_name, concert_image_url, concert_description, youtube_link } = body;

        if (!_id || !concert_name || !concert_image_url || !concert_description || !youtube_link) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "home" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "latest_concerts");
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const concerts = page.components[componentIndex].data.concerts || [];
        const concertIndex = concerts.findIndex(concert => concert._id?.toString() === _id);

        if (concertIndex === -1) return NextResponse.json({ error: "Concert not found" }, { status: 404 });

        // Update the concert
        concerts[concertIndex] = { _id, concert_name, concert_image_url, concert_description, youtube_link };

        page.components[componentIndex].data.concerts = concerts;
        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, concert: concerts[concertIndex] });
    } catch (error) {
        console.error("Error updating concert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE - Remove concert by _id
export async function DELETE(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json({ error: "Missing concert _id" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "home" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "latest_concerts");
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const existingConcerts = page.components[componentIndex].data.concerts || [];

        const updatedConcerts = existingConcerts.filter(concert => concert._id?.toString() !== _id);

        if (updatedConcerts.length === existingConcerts.length) {
            return NextResponse.json({ error: "Concert not found" }, { status: 404 });
        }

        page.components[componentIndex].data.concerts = updatedConcerts;
        page.markModified("components");
        await page.save();
        revalidatePath("/");
        return NextResponse.json({ success: true, message: "Concert deleted" });
    } catch (error) {
        console.error("Error deleting concert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
