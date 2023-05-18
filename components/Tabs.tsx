"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { Genre, Book } from "@prisma/client";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Tabs({
  categories,
  content,
}: {
  categories: string[];
  content: { books: Book[] };
}) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {categories.map((category, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
          {content.books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              {book.title}
            </Link>
          ))}
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
          {content.books.map((book) => (
            <Link key={book.id} href={`/animes/${book.id}`}>
              {book.title}
            </Link>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;
