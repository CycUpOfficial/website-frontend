import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

const getAllowedHosts = () => {
  const hosts = new Set(["localhost", "127.0.0.1"]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      hosts.add(new URL(apiUrl).hostname);
    } catch {
      // Ignore malformed API URL and fallback to default hosts.
    }
  }

  return hosts;
};

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { message: "Missing 'url' query parameter." },
      { status: 400 },
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json(
      { message: "Invalid URL provided." },
      { status: 400 },
    );
  }

  if (!ALLOWED_PROTOCOLS.has(targetUrl.protocol)) {
    return NextResponse.json(
      { message: "Unsupported URL protocol." },
      { status: 400 },
    );
  }

  const allowedHosts = getAllowedHosts();
  if (!allowedHosts.has(targetUrl.hostname)) {
    return NextResponse.json(
      { message: "Host is not allowed." },
      { status: 403 },
    );
  }

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: "GET",
      cache: "force-cache",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Failed to fetch image." },
        { status: upstream.status },
      );
    }

    const bytes = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to proxy image." },
      { status: 502 },
    );
  }
}
