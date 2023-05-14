import Image from "next/image";
import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import SelectAuthor from "../components/SelectAuthor";
import type { Author } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

async function getAuthors() {
  // Get all authors
  const authors = await prisma.author.findMany();
  return authors;
}

export default async function Home() {
  return (
    <>
      <Link href="/add-author">Add Author</Link>
      <Link href="/add-book">Add Book</Link>
      <Link href="/books">Books</Link>
      <Link href="/authors">Authors</Link>
    </>
  );
}
