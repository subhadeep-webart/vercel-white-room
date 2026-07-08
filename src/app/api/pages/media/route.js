import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  // Get media page
  const page = await Page.findOne({ slug: "media" });
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, file_url, file_type } = body;

    if (!title || !file_url || !file_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMedia = {
      _id: new mongoose.Types.ObjectId(),
      title,
      file_url,
      file_type,
    };

    let page = await Page.findOne({ slug: "media" });

    if (!page) {
      page = new Page({ slug: "media", components: [], title: "MEDIA" });
    }

    const componentIndex = page.components.findIndex(
      (c) => c.type === "media_assets"
    );

    if (componentIndex > -1) {
      const media_assets =
        page.components[componentIndex].data.media_assets || [];
      page.components[componentIndex].data.media_assets = [
        ...media_assets,
        newMedia,
      ];
    } else {
      page.components.push({
        type: "media_assets",
        data: { media_assets: [newMedia] },
      });
    }

    page.markModified("components");
    await page.save();

    return NextResponse.json({ success: true, media_assets: newMedia });
  } catch (error) {
    console.error("Error creating media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT - Update concert by _id
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, file_url, file_type, title } = body;

    if (!_id || !file_url || !file_type || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const page = await Page.findOne({ slug: "media" });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const componentIndex = page.components.findIndex(
      (c) => c.type === "media_assets"
    );
    if (componentIndex === -1)
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );

    const media_assets =
      page.components[componentIndex].data.media_assets || [];
    const concertIndex = media_assets.findIndex(
      (concert) => concert._id?.toString() === _id
    );

    if (concertIndex === -1)
      return NextResponse.json({ error: "Concert not found" }, { status: 404 });

    // Update the concert
    media_assets[concertIndex] = { _id, file_url, file_type, title };

    page.components[componentIndex].data.media_assets = media_assets;
    page.markModified("components");
    await page.save();

    return NextResponse.json({
      success: true,
      concert: media_assets[concertIndex],
    });
  } catch (error) {
    console.error("Error updating concert:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE - Remove concert by _id
export async function DELETE(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing media _id" }, { status: 400 });
    }

    const page = await Page.findOne({ slug: "media" });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const componentIndex = page.components.findIndex(
      (c) => c.type === "media_assets"
    );
    if (componentIndex === -1)
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );

    const existingAssets =
      page.components[componentIndex].data.media_assets || [];

    const updatingAssets = existingAssets.filter(
      (media) => media._id?.toString() !== _id
    );

    if (updatingAssets.length === existingAssets.length) {
      return NextResponse.json({ error: "media not found" }, { status: 404 });
    }

    page.components[componentIndex].data.media_assets = updatingAssets;
    page.markModified("components");
    await page.save();
    return NextResponse.json({ success: true, message: "media deleted" });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
