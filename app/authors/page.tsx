import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import type { Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

async function getAuthors() {
  // Get all authors
  const authors = await prisma.author.findMany();
  return authors;
}

export default async function Page() {
  const authors = await getAuthors();

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Authors</h2>
      <ul className="flex flex-col flex-wrap gap-3">
        {authors.map((author) => (
          <li key={author.id} className="flex flex-col">
            <Link href={`/authors/${author.id}`}>
              <h2 className="text-lg mb-2 text-grey-700 ">{author.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
