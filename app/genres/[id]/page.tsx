import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getGenre, getGenres } from "@/services/genre";
import Tabs from "@/components/Tabs";

async function Page({ params: { id } }: { params: { id: number } }) {
  const genre = await getGenre(Number(id), {
    books: true,
  });

  if (genre)
    return (
      <div className="mt-3">
        <h2>{genre.name}</h2>
        <Tabs categories={["Books", "Anime"]} content={genre} />
      </div>
    );
  else return <>no such genre</>;
}

export default Page;

export async function generateStaticParams() {
  const genres = await getGenres();
  return genres.map((genre) => ({
    id: String(genre.id),
  }));
}
