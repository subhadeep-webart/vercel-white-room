import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

/**
 * ✅ CREATE Instagram Feed Section
 */
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
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

    // Check if instagram_feed already exists
    const instaIndex = page.components.findIndex(
      (c) => c.type === "instagram_feed"
    );

    if (instaIndex > -1) {
      // Update title if exists
      page.components[instaIndex].data.title = title;
    } else {
      // Create new instagram_feed section
      page.components.push({
        type: "instagram_feed",
        data: { title },
      });
    }

    page.markModified("components");
    await page.save();

    return NextResponse.json({
      success: true,
      message: "Instagram Feed section created/updated",
      page,
    });
  } catch (error) {
    console.error("Error creating Instagram Feed section:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



/**
 * ✅ GET Instagram Feed Section
 */
export async function GET() {
  try {
    await dbConnect();

    const page = await Page.findOne({ slug: "home" });

    if (!page) {
      return NextResponse.json(
        { error: "Home page not found" },
        { status: 404 }
      );
    }

    const instaSection = page.components.find(
      (c) => c.type === "instagram_feed"
    );

    if (!instaSection) {
      return NextResponse.json(
        { error: "Instagram Feed section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title: instaSection.data.title,
    });
  } catch (error) {
    console.error("Error fetching Instagram Feed section:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
