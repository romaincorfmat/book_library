"use server";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { BorrowBookParams } from "@/types";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // Add records to the database in a new table called borrowRecords"
    const record = db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
    });

    // Update the number of available copies of the book in the books table
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
