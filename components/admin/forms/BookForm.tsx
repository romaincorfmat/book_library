"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import {
  useForm,

  //   SubmitHandler,
} from "react-hook-form";
import { z } from "zod";

import ColorPicker from "@/components/admin/ColorPicker";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createBook } from "@/lib/admin/actions/book";
import { bookSchema } from "@/lib/validation";
// import { Book } from "@/types";

// interface Props extends Partial<Book> {
//   type?: "create" | "update";
// }

const BookForm = () =>
  // { type, ...book }: Props
  {
    const router = useRouter();
    const form = useForm<z.infer<typeof bookSchema>>({
      resolver: zodResolver(bookSchema),
      defaultValues: {
        title: "",
        description: "",
        author: "",
        genre: "",
        rating: 1,
        totalCopies: 1,
        coverUrl: "",
        coverColor: "",
        videoUrl: "",
        summary: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
      const result = await createBook(values);

      if (result.success) {
        toast({
          title: "Book added successfully",
          description: "The book has been added to the library",
        });

        router.push(`/admin/books/${result.data.id}`);
      } else {
        toast({
          title: "Error while adding new book to library",
          description: result.message,
          variant: "destructive",
        });
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book title"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book Author"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Sci-fi, Fantasy, etc."
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    required
                    placeholder="Book rating"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={10000}
                    required
                    placeholder="Total copies"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type={"image"}
                    accept={"image/*"}
                    placeholder={"Upload a Book Cover"}
                    folder={"books/cover"}
                    variant={"light"}
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Primary Color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    onPickerChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book Description"
                    {...field}
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Trailer
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type={"video"}
                    accept={"video/*"}
                    placeholder={"Upload a Book Trailer"}
                    folder={"books/videos"}
                    variant={"light"}
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book Summary"
                    {...field}
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="book-form_btn text-white">
            Add new Book to Library
          </Button>
        </form>
      </Form>
    );
  };

export default BookForm;
