import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;

export async function POST(request, res) {
    const body = await request.json();
    const { paramsToSign } = body;
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return new Response(JSON.stringify({ signature }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

