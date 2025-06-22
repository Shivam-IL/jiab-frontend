import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const s3Url = req.nextUrl.searchParams.get("url");

  if (!s3Url) {
    return new Response("Missing 'url' query param", { status: 400 });
  }

  try {
    const response = await fetch(s3Url);

    if (!response.ok) {
      return new Response("Failed to fetch from S3", { status: response.status });
    }

    const contentType = response.headers.get("Content-Type") || "text/plain";
    const body = await response.text();

    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response("Error fetching file", { status: 500 });
  }
}
