import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: 'https://usw2-promoted-terrapin-30708.upstash.io',
  token: process.env.UPSTASH_TOKEN || ""
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"),
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<Response | undefined> {
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
  const response = NextResponse.next();

  response.headers.set('X-RateLimit-Limit', limit.toString(),)
  response.headers.append('X-RateLimit-Remaining', remaining.toString())
  response.headers.append('X-RateLimit-Reset', reset.toString())

  return success ? response : new Response('Too many requests', {
    status: 429,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  })
}

export const config = {
  matcher: ["/api/notes/:path*"],
};
