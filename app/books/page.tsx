import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import type { Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

async function getBooks() {
  // Get all books
  const books = await prisma.book.findMany({
    include: { authors: true },
  });
  return books;
}

export default async function Page() {
  const books = await getBooks();

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Books</h2>
      <ul className="flex justify-center flex-wrap gap-3 m-3">
        {books.map((book) => (
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
            <h2 className="px-1 text-lg whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
              {book.authors.map((author, index) => (
                <Link href={`/authors/${author.id}`}>
                  <span>
                    {index + 1 == book.authors.length
                      ? author.name
                      : ", " + author.name}
                  </span>
                </Link>
              ))}
            </h2>
          </li>
        ))}
      </ul>
    </>
  );
}
