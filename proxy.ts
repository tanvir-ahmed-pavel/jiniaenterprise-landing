import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";
import { htmlToMarkdownResponse, wantsMarkdown } from "@/lib/markdown/negotiate";

export async function proxy(request: NextRequest) {
  // Agents that ask for text/markdown get the page converted to markdown.
  // Browsers keep getting HTML.
  if (wantsMarkdown(request)) {
    const markdown = await htmlToMarkdownResponse(request);
    if (markdown) return markdown;
  }

  const response = await updateSession(request);
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
