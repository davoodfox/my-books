import BookCard from "@/components/BookCard";
import { getGenres } from "@/services/genre";
import Link from "next/link";

export default async function Page() {
  const genres = await getGenres();

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Books</h2>
      <ul className="flex justify-center flex-wrap gap-3 m-3">
        {genres.map((genre) => (
          <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
        ))}
      </ul>
    </>
  );
}
