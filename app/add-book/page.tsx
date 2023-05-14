import Image from "next/image";
import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import SelectAuthor from "@/components/SelectAuthor";
import type { Author } from "@prisma/client";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

async function getAuthors() {
  // Get all authors
  const authors = await prisma.author.findMany();
  return authors;
}

export default async function Page() {
  const authors = await getAuthors();
  async function addItem(data: FormData) {
    "use server";
    const authorId = Number(data.get("authorId"));

    // Create one Book
    const Book = await prisma.book.create({
      data: {
        title: data.get("title") as string,
        description: data.get("description") as string,
        authorId: authorId,
      },
    });
  }

  return (
    <form action={addItem}>
      <input
        type="text"
        name="title"
        className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      <input
        type="text"
        name="description"
        className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      {/* <SelectAuthor authors={authors} /> */}
      <select name="authorId">
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add
      </button>
    </form>
  );
}
