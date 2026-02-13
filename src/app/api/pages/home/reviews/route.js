import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/model/page";

/**
 * ✅ CREATE Review
 */
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, rating, comment, _id, position } = body;

    if (!name || !rating || !comment || !_id || !position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = { name, rating, comment, _id, position };
    let page = await Page.findOne({ slug: "home" });

    if (!page) {
      page = new Page({
        title: "Home Page",
        slug: "home",
        status: "published",
        components: [],
      });
    }

    const reviewIndex = page.components.findIndex(
      (c) => c.type === "review_section"
    );

    if (reviewIndex > -1) {
      const reviews = page.components[reviewIndex].data.reviews || [];
      page.components[reviewIndex].data.reviews = [...reviews, newReview];
    } else {
      page.components.push({
        type: "review_section",
        data: { reviews: [newReview] },
      });
    }

    page.markModified("components");
    await page.save();

    return NextResponse.json({
      success: true,
      message: "Review added",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// /**
//  * ✅ GET Review by ID
//  */
// export async function GET(request) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("_id");

//     if (!id) {
//       return NextResponse.json({ error: "Missing _id" }, { status: 400 });
//     }

//     const page = await Page.findOne({ slug: "home" });
//     if (!page)
//       return NextResponse.json({ error: "Page not found" }, { status: 404 });

//     const reviewComp = page.components.find((c) => c.type === "review_section");
//     if (!reviewComp)
//       return NextResponse.json(
//         { error: "Review section not found" },
//         { status: 404 }
//       );

//     const review = reviewComp.data.reviews.find((r) => r._id === id);
//     if (!review)
//       return NextResponse.json({ error: "Review not found" }, { status: 404 });

//     return NextResponse.json({ success: true, review });
//   } catch (error) {
//     console.error("Error fetching review:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

/**
 * ✅ GET Reviews (all) OR Single Review by ID
 */
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("_id");

    const page = await Page.findOne({ slug: "home" });
    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    const reviewComp = page.components.find(
      (c) => c.type === "review_section"
    );

    if (!reviewComp) {
      return NextResponse.json(
        { error: "Review section not found" },
        { status: 404 }
      );
    }

    const title = reviewComp?.data?.title || "";
    const reviews = reviewComp?.data?.reviews || [];

    // ✅ If ID is provided → return single review
    if (id) {
      const review = reviews.find(
        (r) => r._id.toString() === id
      );

      if (!review) {
        return NextResponse.json(
          { error: "Review not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        title,
        review,
      });
    }

    // ✅ If no ID → return all reviews + title
    return NextResponse.json({
      success: true,
      title,
      reviews,
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


/**
 * ✅ UPDATE Review
 */
export async function PUT(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { _id, name, rating, comment, position } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing _id" }, { status: 400 });
    }

    const page = await Page.findOne({ slug: "home" });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const reviewCompIndex = page.components.findIndex(
      (c) => c.type === "review_section"
    );
    if (reviewCompIndex === -1) {
      return NextResponse.json(
        { error: "Review section not found" },
        { status: 404 }
      );
    }

    const reviews = page.components[reviewCompIndex].data.reviews || [];
    const reviewIndex = reviews.findIndex((r) => r._id === _id);
    if (reviewIndex === -1) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Update fields if provided
    if (name) reviews[reviewIndex].name = name;
    if (rating) reviews[reviewIndex].rating = rating;
    if (comment) reviews[reviewIndex].comment = comment;
    if (position) reviews[reviewIndex].position = position;

    page.components[reviewCompIndex].data.reviews = reviews;
    page.markModified("components");
    await page.save();

    return NextResponse.json({
      success: true,
      message: "Review updated",
      review: reviews[reviewIndex],
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * ✅ DELETE Review
 */
export async function DELETE(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Missing review _id" },
        { status: 400 }
      );
    }

    const page = await Page.findOne({ slug: "home" });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const reviewComponentIndex = page.components.findIndex(
      (comp) => comp.type === "review_section"
    );
    if (reviewComponentIndex === -1)
      return NextResponse.json(
        { error: "Review section not found" },
        { status: 404 }
      );

    const existingReviews =
      page.components[reviewComponentIndex].data.reviews || [];
    const updatedReviews = existingReviews.filter((r) => r._id !== _id);

    if (existingReviews.length === updatedReviews.length)
      return NextResponse.json({ error: "Review not found" }, { status: 404 });

    page.components[reviewComponentIndex].data.reviews = updatedReviews;
    page.markModified("components");
    await page.save();

    return NextResponse.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



export async function PATCH(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Missing title" },
        { status: 400 }
      );
    }

    const page = await Page.findOne({ slug: "home" });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    // Find review_section component
    const reviewCompIndex = page.components.findIndex(
      (c) => c.type === "review_section"
    );

    if (reviewCompIndex === -1) {
      // Create the component if it doesn't exist
      page.components.push({
        type: "review_section",
        data: {
          title: title,
          reviews: [],
        },
      });
    } else {
      // Update the title inside data only
      page.components[reviewCompIndex].data.title = title;
    }

    page.markModified("components");
    await page.save();

    return NextResponse.json({
      success: true,
      message: "Review section title updated",
      page,
    });
  } catch (error) {
    console.error("Error updating review section title:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
