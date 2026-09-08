import { NextRequest, NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/seo/indexnow";

type IndexNowBody = {
  urls?: unknown;
};

export async function POST(request: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  const provided = request.headers.get("x-indexnow-secret");

  if (!secret || !provided || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as IndexNowBody;
    const urls = Array.isArray(body.urls)
      ? body.urls.filter((url): url is string => typeof url === "string" && url.length > 0)
      : [];

    if (!urls.length) {
      return NextResponse.json(
        { error: "Body must include a non-empty urls string array" },
        { status: 400 },
      );
    }

    const ok = await submitIndexNow(urls);

    if (!ok) {
      return NextResponse.json(
        { error: "IndexNow submission failed or is not configured" },
        { status: 502 },
      );
    }

    return NextResponse.json({ submitted: urls.length });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
