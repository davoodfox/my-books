import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @param include what it should include
 * @returns all genres
 */
export async function getGenres(include?: { books?: boolean | undefined }) {
  const genres = await prisma.genre.findMany({
    include: {
      books: include?.books ? include.books : false,
    },
  });
  return genres;
}

/**
 * @param id id of the genre
 * @param include what it should include
 * @returns a genre
 */
export async function getGenre(
  id: number,
  include?: {
    books?: boolean | undefined;
  }
) {
  const genre = await prisma.genre.findUnique({
    where: {
      id: id,
    },
    include: {
      books: include?.books ? include.books : false,
    },
  });
  return genre;
}
