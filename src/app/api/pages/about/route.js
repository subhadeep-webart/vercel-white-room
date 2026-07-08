import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

export async function GET() {
  await dbConnect();

  const page = await Page.findOne({
    slug: "about",
    status: "published",
  }).lean();

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(request) {
  await dbConnect();

  const body = await request.json();
  const { type, data } = body;

  if (!type || !data) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  let page = await Page.findOne({ slug: "about" });

  if (!page) {
    page = new Page({
      title: "About Us",
      slug: "about",
      status: "published",
      components: [],
    });
  }

  const existingIndex = page.components.findIndex((c) => c.type === type);
  if (existingIndex > -1) {
    page.components[existingIndex].data = data;
  } else {
    page.components.push({ type, data });
  }

  await page.save();

  return NextResponse.json({ success: true, page });
}

export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  const { type, url } = body;

  if (!type || !url) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  let page = await Page.findOne({ slug: "about" });

  if (!page) {
    page = new Page({
      title: "About Us",
      slug: "about",
      status: "published",
      components: [],
    });
  }

  // Find the "images_section" component
  const aboutImageComponentIndex = page.components.findIndex(
    (comp) => comp.type === "about_us_images"
  );

  console.log(aboutImageComponentIndex);

  if (aboutImageComponentIndex > -1) {
    const existingImages =
      page.components[aboutImageComponentIndex].data.images || [];
    console.log("existing====>", existingImages);
    page.components[aboutImageComponentIndex].data.images = [
      ...existingImages,
      url,
    ];
  } else {
    // Create the images section if it doesn't exist
    page.components.push({
      type: "about_us_images",
      data: {
        images: [url],
      },
    });
  }

  page.markModified("components");
  await page.save();

  return NextResponse.json({ success: true, page });
}
