import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

export default function Home() {
  console.log(sampleBooks[0]);
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
