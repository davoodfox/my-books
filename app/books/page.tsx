import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import type { Book } from "@prisma/client";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

async function getBooks() {
  // Get all books
  const books = await prisma.book.findMany({
    include: { author: true },
  });
  return books;
}

export default async function Page() {
  const books = await getBooks();

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id} className="flex flex-col border border-gray-300 p-2">
          <h2 className="text-xl">{book.title}</h2>
          <h2 className="text-lg">{book.author.name}</h2>
          <p className="text-sm">{book.description}</p>
        </li>
      ))}
    </ul>
  );
}
