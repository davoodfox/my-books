interface Props {}
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function Page(props: Props) {
  const {} = props;
  // async function addAuthor(data: FormData) {
  //   "use server";
  //   await prisma.author.create({
  //     data: {
  //       name: data.get("name") as string,
  //     },
  //   });
  // }
  return (
    // <form action={addAuthor}>
    <form>
      <input
        type="text"
        name="name"
        className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />

      <button
        type="submit"
        className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add
      </button>
    </form>
  );
}

export default Page;
