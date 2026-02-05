"use server"
import { INSTAGRAM_CONFIGURATION, INSTAGRAM_TOKEN } from "@/utils/constants";

export async function getInstagramMedia() {
    console.log("Enter====>")
    const url = `https://graph.instagram.com/24827167166959629/media?fields=${INSTAGRAM_CONFIGURATION.id},username=${INSTAGRAM_CONFIGURATION.username},caption,media_type,media_url,permalink,timestamp&access_token=${INSTAGRAM_TOKEN}`;

    const res = await fetch(url, {
        cache: "no-store", // or 'force-cache' if you want caching
    });

    console.log("Response=======>",res);

    if (!res.ok) {
        throw new Error("Failed to fetch Instagram media");
    }

    return res.json();
}