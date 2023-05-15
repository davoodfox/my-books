import BookCard from "@/components/BookCard";
import { getBooks } from "@/services/book";

export default async function Page() {
  const books = await getBooks({ authors: true });

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Books</h2>
      <ul className="flex justify-center flex-wrap gap-3 m-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} authors={book.authors} />
        ))}
      </ul>
    </>
  );
}
