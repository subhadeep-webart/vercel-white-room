import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import { NextResponse } from "next/server";

export async function PUT(request) {
    await dbConnect();

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    let page = await Page.findOne({ slug: "media" });

    if (!page) {
        page = new Page({
            title: "MEDIA",
            slug: "media",
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
