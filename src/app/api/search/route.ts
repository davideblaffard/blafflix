import { NextResponse } from "next/server";
import { searchMoviesByQuery } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchMoviesByQuery(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Errore durante la ricerca TMDB:", error);
    return NextResponse.json(
      { error: "Errore durante la ricerca su TMDB." },
      { status: 500 }
    );
  }
}
