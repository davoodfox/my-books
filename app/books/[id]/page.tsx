import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBook, getBooks } from "@/services/book";

async function Page({ params: { id } }: { params: { id: number } }) {
  const book = await getBook(Number(id), {
    authors: true,
    genres: true,
    tags: true,
    rating: true,
  });

  if (book)
    return (
      <div className="mt-3">
        {" "}
        {book.coverImage && (
          <Image
            src={book.coverImage}
            alt={book.title}
            width={160}
            height={100}
            className="mb-2 rounded xs:float-left mx-auto xs:mr-3"
          />
        )}
        <div>
          <h2 className="text-xl font-bold ">
            {book.title} ({book.publishYaer})
          </h2>
          {book.authors && (
            <h2 className="px-1 text-base mb-3 text-slate-900">
              {book.authors.map((author, index) => (
                <span key={author.id}>
                  <Link href={`/authors/${author.id}`}>
                    {index + 1 == book.authors?.length
                      ? author.name
                      : ", " + author.name}
                  </Link>
                </span>
              ))}
            </h2>
          )}
        </div>
        {book.genres && (
          <div className="mb-3">
            <span className="font-bold">Genres: </span>
            {book.genres.map((genre, index) => (
              <span key={genre.id} className="text-xs text-slate-900">
                <Link href={`/genres/${genre.id}`}>
                  {index + 1 == book.genres?.length
                    ? genre.name
                    : genre.name + ", "}
                </Link>
              </span>
            ))}
          </div>
        )}
        {book.tags && (
          <div className="mb-3">
            <span className="font-bold">Tags: </span>
            {book.tags.map((tag, index) => (
              <span key={tag.id} className="text-xs">
                <Link
                  className="bg-slate-900 text-white px-1 pb-0.5 rounded"
                  href={`/tags/${tag.id}`}
                >
                  {tag.name}
                </Link>
              </span>
            ))}
          </div>
        )}
        {book.ratingValue && (
          <div
            className="mb-3 border-b-4 inline-block"
            style={{
              borderStyle: "solid",
              borderColor: book.rating?.color ? book.rating.color : "#333",
            }}
          >
            <span className="font-bold">Rating: </span>
            <span>{book.ratingValue} / 10</span>
          </div>
        )}
        <p className="text-lg">{book.description}</p>
      </div>
    );
  else return <>no such book</>;
}

export default Page;

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: String(book.id),
  }));
}
