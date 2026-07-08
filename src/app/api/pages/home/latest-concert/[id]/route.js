import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

// GET - Get a concert by _id
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing concert ID" },
        { status: 400 }
      );
    }

    const page = await Page.findOne({ slug: "home" });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const component = page.components.find((c) => c.type === "latest_concerts");
    if (!component) {
      return NextResponse.json(
        { error: "Concert section not found" },
        { status: 404 }
      );
    }

    const concert = component.data.concerts.find(
      (c) => c._id?.toString() === id
    );

    if (!concert) {
      return NextResponse.json({ error: "Concert not found" }, { status: 404 });
    }

    return NextResponse.json({ concert });
  } catch (error) {
    console.error("Error fetching concert:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
