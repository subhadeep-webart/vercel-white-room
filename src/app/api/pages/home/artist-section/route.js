import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function POST(request) {
//     try {
//         await dbConnect();

//         const body = await request.json();
//         const { artist_name } = body;

//         if (!artist_name) {
//             return NextResponse.json(
//                 { error: "Missing Artist Name" },
//                 { status: 400 }
//             );
//         }

//         const newArtist = { _id: new mongoose.Types.ObjectId(), artist_name };
//         let page = await Page.findOne({ slug: "home" });

//         if (!page) {
//             page = new Page({
//                 title: "Home Page",
//                 slug: "home",
//                 status: "published",
//                 components: [],
//             });
//         }

//         const artistIndex = page.components.findIndex(
//             (c) => c.type === "artist_section"
//         );

//         if (artistIndex > -1) {
//             const artists = page.components[artistIndex].data.artists || [];
//             page.components[artistIndex].data.artists = [...artists, newArtist];
//         } else {
//             page.components.push({
//                 type: "artist_section",
//                 data: { artists: [newArtist] },
//             });
//         }

//         page.markModified("components");
//         await page.save();

//         return NextResponse.json({
//             success: true,
//             message: "Artist added",
//             artist: newArtist,
//         });
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

export async function POST(request) {
    try {
        await dbConnect();

        const { artist_name, section } = await request.json();

        if (!artist_name || !section) {
            return NextResponse.json(
                { error: "Missing Artist Name or Section" },
                { status: 400 }
            );
        }

        const newArtist = {
            _id: new mongoose.Types.ObjectId(),
            artist_name
        };

        let page = await Page.findOne({ slug: "home" });

        if (!page) {
            page = new Page({
                title: "Home Page",
                slug: "home",
                status: "published",
                components: [],
            });
        }

        const artistIndex = page.components.findIndex(
            (c) => c.type === "artist_section"
        );

        if (artistIndex > -1) {
            const artistSection = page.components[artistIndex];

            // 🔥 FORCE FIX (handles array + undefined)
            if (
                !artistSection.data?.artists ||
                Array.isArray(artistSection.data.artists)
            ) {
                artistSection.data = {
                    ...artistSection.data,
                    artists: {}
                };
            }

            // 🔥 Dynamic section
            if (!artistSection.data.artists[section]) {
                artistSection.data.artists[section] = [];
            }

            artistSection.data.artists[section].push(newArtist);

        } else {
            page.components.push({
                type: "artist_section",
                data: {
                    artists: {
                        [section]: [newArtist]
                    }
                },
            });
        }

        page.markModified("components");
        await page.save();

        return NextResponse.json({
            success: true,
            artist: newArtist,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    await dbConnect();

    const { data } = await request.json();

    if (!data || typeof data !== "object") {
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

    const index = page.components.findIndex(
        (component) => component.type === "artist_section"
    );

    if (index > -1) {
        page.components[index].data = {
            ...page.components[index].data,
            ...data
        };
    } else {
        page.components.push({
            type: "artist_section",
            data
        });
    }

    page.markModified("components");
    await page.save();

    return NextResponse.json({ success: true, page });
}

// export async function DELETE(request) {
//     try {
//         await dbConnect();

//         const body = await request.json();
//         const { _id } = body;

//         if (!_id) {
//             return NextResponse.json(
//                 { error: "Missing artist _id" },
//                 { status: 400 }
//             );
//         }

//         const page = await Page.findOne({ slug: "home" });
//         if (!page)
//             return NextResponse.json({ error: "Page not found" }, { status: 404 });

//         const artistComponentIndex = page.components.findIndex(
//             (comp) => comp.type === "artist_section"
//         );
//         if (artistComponentIndex === -1)
//             return NextResponse.json(
//                 { error: "Artist section not found" },
//                 { status: 404 }
//             );

//         const existingArtists =
//             page.components[artistComponentIndex].data.artists || [];
//         const updatedArtists = existingArtists.filter((r) => r._id.toString() !== _id.toString());

//         console.log("Updated===> artist====>", updatedArtists);

//         if (existingArtists.length === updatedArtists.length)
//             return NextResponse.json({ error: "Artist not found" }, { status: 404 });

//         page.components[artistComponentIndex].data.artists = updatedArtists;
//         page.markModified("components");
//         await page.save();

//         return NextResponse.json({ success: true, message: "Review deleted" });
//     } catch (error) {
//         console.error("Error deleting artist:", error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

export async function DELETE(request) {
    try {
        await dbConnect();

        const { _id, section } = await request.json();

        if (!_id || !section) {
            return NextResponse.json(
                { error: "Missing artist _id or section" },
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

        const artistComponentIndex = page.components.findIndex(
            (comp) => comp.type === "artist_section"
        );

        if (artistComponentIndex === -1) {
            return NextResponse.json(
                { error: "Artist section not found" },
                { status: 404 }
            );
        }

        const artistSection = page.components[artistComponentIndex];

        // 🔥 FIX: Ensure correct structure
        if (
            !artistSection.data?.artists ||
            Array.isArray(artistSection.data.artists)
        ) {
            return NextResponse.json(
                { error: "Invalid artists structure" },
                { status: 400 }
            );
        }

        const sectionArtists = artistSection.data.artists[section] || [];

        const updatedArtists = sectionArtists.filter(
            (artist) => artist._id.toString() !== _id.toString()
        );

        if (sectionArtists.length === updatedArtists.length) {
            return NextResponse.json(
                { error: "Artist not found in this section" },
                { status: 404 }
            );
        }

        // 🔥 Update only that section
        artistSection.data.artists[section] = updatedArtists;

        page.markModified("components");
        await page.save();

        return NextResponse.json({
            success: true,
            message: "Artist deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting artist:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
