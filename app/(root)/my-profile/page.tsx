import { desc } from "drizzle-orm";
import React from "react";

import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Book } from "@/types";

const MyProfilePage = async () => {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookList title="Borrowed Books" books={latestBooks} />
    </>
  );
};

export default MyProfilePage;
