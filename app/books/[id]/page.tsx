import React from "react";
import { PrismaClient } from "@prisma/client";
import type { Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

async function getBook(id: number) {
  // Get a book
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      authors: true,
    },
  });
  return book;
}

async function getBooks() {
  // Get all books
  const books = await prisma.book.findMany({
    include: { authors: true },
  });
  return books;
}

async function Page({ params: { id } }: { params: { id: number } }) {
  const book = await getBook(Number(id));

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
            className="mb-2 rounded float-left mr-3"
          />
        )}
        <div>
          <h2 className="text-xl font-bold ">
            {book.title} ({book.publishYaer})
          </h2>
          <h2 className="px-1 text-base mb-3">
            {book.authors.map((author, index) => (
              <span key={author.id}>
                <Link href={`/authors/${author.id}`}>
                  {index + 1 == book.authors.length
                    ? author.name
                    : ", " + author.name}
                </Link>
              </span>
            ))}
          </h2>
        </div>
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
