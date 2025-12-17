import dbConnect from "@/lib/mongodb";
import { error } from "@/lib/responseHandler";
import SiteSetting from "@/model/siteModel";
export async function POST(req) {
  try {
    await dbConnect();
    const siteData = await SiteSetting.create(req.json());
    console.log("siteData", siteData);
  } catch (err) {
    return error({ error: err.message });
  }
}
