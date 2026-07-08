import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

export async function GET() {
  await dbConnect();

  const page = await Page.findOne({ slug: "home", status: "published" }).lean();

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

  // Find the "home" page, or create it if it doesn't exist
  let page = await Page.findOne({ slug: "home" });

  if (!page) {
    page = new Page({
      title: "Home Page",
      slug: "home",
      status: "published",
      components: [],
    });
  }

  // Find if the component already exists
  const existingComponentIndex = page.components.findIndex(
    (component) => component.type === type
  );

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

export async function DELETE(request) {
  await dbConnect();

  const body = await request.json();
  const { componentType, itemId } = body;

  if (!componentType || !itemId) {
    return NextResponse.json(
      { error: "Missing componentType or itemId" },
      { status: 400 }
    );
  }

  // Get the "home" page
  const page = await Page.findOne({ slug: "home" });

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Find the component (e.g., review_section)
  const component = page.components.find((c) => c.type === componentType);

  if (!component) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  // Filter out the review by ID
  const originalLength = component.data.length;
  component.data = component.data.filter(
    (item) => item._id?.toString() !== itemId
  );

  if (component.data.length === originalLength) {
    return NextResponse.json(
      { error: "Item not found in component" },
      { status: 404 }
    );
  }

  await page.save();

  return NextResponse.json({
    success: true,
    message: `Item ${itemId} removed from ${componentType}`,
    page,
  });
}
