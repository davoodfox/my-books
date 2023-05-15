import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @returns all authors
 */
export async function getAuthors() {
  const authors = await prisma.author.findMany();
  return authors;
}

/**
 * @param id id of the author
 * @returns a author
 */
export async function getAuthor(id: number) {
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
