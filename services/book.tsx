import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Author, Book } from "@prisma/client";

/**
 * @param include what it should include
 * @returns all books
 */
export async function getBooks(include?: {
  authors?: boolean | undefined;
  genres?: boolean | undefined;
  tags?: boolean | undefined;
  rating?: boolean | undefined;
}) {
  const books = await prisma.book.findMany({
    include: {
      authors: include?.authors ? include.authors : false,
      genres: include?.genres ? include.genres : false,
      tags: include?.tags ? include.tags : false,
      rating: include?.rating ? include.rating : false,
    },
  });
  return books;
}

/**
 * @param id id of the book
 * @param include what it should include
 * @returns a book
 */
export async function getBook(
  id: number,
  include?: {
    authors?: boolean | undefined;
    genres?: boolean | undefined;
    tags?: boolean | undefined;
    rating?: boolean | undefined;
  }
) {
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      authors: include?.authors ? include.authors : false,
      genres: include?.genres ? include.genres : false,
      tags: include?.tags ? include.tags : false,
      rating: include?.rating ? include.rating : false,
    },
  });
  return book;
}
