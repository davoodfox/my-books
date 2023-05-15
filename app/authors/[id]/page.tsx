import React from "react";
import Image from "next/image";
import { getAuthor } from "@/services/author";
import { getBooks } from "@/services/book";
import BookCard from "@/components/BookCard";

async function Page({ params: { id } }: { params: { id: number } }) {
  const author = await getAuthor(Number(id));

  if (author)
    return (
      <div className="">
        {" "}
        <h2 className="text-xl font-bold mb-3">{author.name}</h2>
        {author.coverImage && (
          <Image
            src={author.coverImage}
            alt={author.name}
            width={160}
            height={100}
            className="mb-2 rounded float-left mr-3"
          />
        )}
        <p className="text-lg">{author.description}</p>
        {author.books && (
          <ul className="flex justify-center flex-wrap gap-3 m-3">
            {author.books.map((book) => (
              <BookCard book={book} authors={null} />
            ))}
          </ul>
        )}
      </div>
    );
  else return <>no such author</>;
}

export default Page;

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: String(book.id),
  }));
}
