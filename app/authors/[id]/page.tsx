import React from "react";
import { PrismaClient } from "@prisma/client";
import type { Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

async function getAuthor(id: number) {
  // Get a author
  const book = await prisma.author.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
  return book;
}

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
        <ul className="flex justify-center flex-wrap gap-3 m-3">
          {author.books.map((book) => (
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
            </li>
          ))}
        </ul>
      </div>
    );
  else return <>no such author</>;
}

export default Page;

async function getBooks() {
  // Get all books
  const books = await prisma.book.findMany({
    include: { authors: true },
  });
  return books;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: String(book.id),
  }));
}
