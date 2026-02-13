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


export async function PATCH(request) {
    await dbConnect();

    const body = await request.json();
    const { type, newTitle } = body;

    if (!type || !newTitle) {
        return NextResponse.json({ error: "Missing type or newTitle" }, { status: 400 });
    }

    const page = await Page.findOne({ slug: "home" });
    if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const componentIndex = page.components.findIndex(comp => comp.type === type);
    if (componentIndex === -1) {
        return NextResponse.json({ error: "Component not found" }, { status: 404 });
    }

    // Update the title inside data only
    page.components[componentIndex].data.title = newTitle;

    page.markModified("components");
    await page.save();

    return NextResponse.json({ success: true, page });
}


export async function GET() {
  try {
    await dbConnect();

    const page = await Page.findOne({ slug: "home" });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    const component = page.components.find(
      (comp) => comp.type === "worked_for"
    );

    if (!component) {
      return NextResponse.json(
        { error: "Worked For section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title: component?.data?.title || "",
      images: component?.data?.images || [],
    });

  } catch (error) {
    console.error("Error fetching worked_for section:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


