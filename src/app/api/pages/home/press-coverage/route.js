import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// POST - Create a new concert
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { poster_title, poster_image, poster_song, song_image } = body;

        if (!poster_title || !poster_image || !poster_song || !song_image) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newCoverages = {
            _id: new mongoose.Types.ObjectId(),
            poster_title,
            poster_image,
            poster_song,
            song_image
        };

        let page = await Page.findOne({ slug: "home" });

        if (!page) {
            page = new Page({ slug: "home", components: [] });
        }

        const componentIndex = page.components.findIndex(c => c.type === "press-coverage");

        if (componentIndex > -1) {
            const coverages = page.components[componentIndex].data.coverages || [];
            page.components[componentIndex].data.coverages = [...coverages, newCoverages];
        } else {
            page.components.push({
                type: "press-coverage",
                data: { coverages: [newCoverages] }
            });
        }

        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, concert: newCoverages });
    } catch (error) {
        console.error("Error creating concert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// GET - Retrieve all concerts
// export async function GET() {
//     try {
//         console.log("Calling========> inside latest concerts")
//         await dbConnect();
//         const page = await Page.findOne({ slug: "home" });

//         const component = page?.components.find(c => c.type === "press-coverage");
//         const coverages = component?.data?.coverages || [];

//         return NextResponse.json({ coverages });
//     } catch (error) {
//         console.error("Error fetching coverages:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

export async function GET() {
  try {
    console.log("Calling========> inside press coverage");

    await dbConnect();

    const page = await Page.findOne({ slug: "home" });

    if (!page) {
      return NextResponse.json(
        { error: "Home page not found" },
        { status: 404 }
      );
    }

    const component = page.components.find(
      (c) => c.type === "press-coverage"
    );

    if (!component) {
      return NextResponse.json(
        { error: "Press coverage section not found" },
        { status: 404 }
      );
    }

    const coverages = component?.data?.coverages || [];
    const title = component?.data?.title || "";

    // ✅ Return BOTH
    return NextResponse.json({
      success: true,
      title,
      coverages,
    });

  } catch (error) {
    console.error("Error fetching coverages:", error);
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
        const { _id, poster_image, poster_song, poster_title } = body;

        if (!_id || !poster_image || !poster_song || !poster_title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "home" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "press-coverage");
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const coverages = page.components[componentIndex].data.coverages || [];
        const concertIndex = coverages.findIndex(concert => concert._id?.toString() === _id);

        if (concertIndex === -1) return NextResponse.json({ error: "Concert not found" }, { status: 404 });

        // Update the concert
        coverages[concertIndex] = { _id, poster_image, poster_title, poster_song };

        page.components[componentIndex].data.coverages = coverages;
        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, coverage: coverages[concertIndex] });
    } catch (error) {
        console.error("Error updating coverage:", error);
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
            return NextResponse.json({ error: "Missing coverage _id" }, { status: 400 });
        }

        const page = await Page.findOne({ slug: "home" });
        if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        const componentIndex = page.components.findIndex(c => c.type === "press-coverage");
        if (componentIndex === -1) return NextResponse.json({ error: "Component not found" }, { status: 404 });

        const existingCoverages = page.components[componentIndex].data.coverages || [];

        const updatedCoverages = existingCoverages.filter(coverage => coverage._id?.toString() !== _id);

        if (updatedCoverages.length === existingCoverages.length) {
            return NextResponse.json({ error: "Coverages not found" }, { status: 404 });
        }

        page.components[componentIndex].data.coverages = updatedCoverages;
        page.markModified("components");
        await page.save();

        return NextResponse.json({ success: true, message: "Coverage deleted" });
    } catch (error) {
        console.error("Error deleting coverage:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PATCH - Update press-coverage title only
export async function PATCH(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        const page = await Page.findOne({ slug: "home" });
        if (!page) {
            return NextResponse.json(
                { error: "Page not found" },
                { status: 404 }
            );
        }

        const componentIndex = page.components.findIndex(
            (c) => c.type === "press-coverage"
        );

        if (componentIndex === -1) {
            return NextResponse.json(
                { error: "Component not found" },
                { status: 404 }
            );
        }

        // Update only the title field
        page.components[componentIndex].data.title = title;

        page.markModified("components");
        await page.save();

        return NextResponse.json({
            success: true,
            title: page.components[componentIndex].data.title,
        });
    } catch (error) {
        console.error("Error updating title:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

