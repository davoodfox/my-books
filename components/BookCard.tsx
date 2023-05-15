import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Author, Book } from "@prisma/client";

function BookCard({ book, authors }: { book: Book; authors: Author[] | null }) {
  return (
    <li key={book.id} className="flex flex-col w-40 text-center">
      <Link href={`/books/${book.id}`}>
        {book.coverImage && (
          <Image
            src={book.coverImage}
            alt={book.title}
            width={160}
            height={100}
            className="mb-2 rounded"
          />
        )}
      </Link>
      <Link href={`/books/${book.id}`}>
        <h2 className="px-1 text-xl whitespace-nowrap overflow-hidden text-ellipsis mb-2 text-slate-900 font-bold">
          {book.title}
        </h2>
      </Link>
      {authors != null && (
        <h2 className="px-1 text-lg whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
          {authors.map((author, index) => (
            <span key={author.id}>
              <Link href={`/authors/${author.id}`}>
                {index + 1 == authors.length ? author.name : ", " + author.name}
              </Link>
            </span>
          ))}
        </h2>
      )}
    </li>
  );
}

export default BookCard;
