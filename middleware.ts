import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Simple passthrough middleware
  return NextResponse.next();
}

export const config = {
  // Skip auth middleware for static files and public routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/).*)"],
}; 