import { Category } from "./Category";
import { useLibrary } from "./LibraryContext";

export const Books = () => {
  const { books } = useLibrary();
  const categories = books
    ? [...new Set(books.map((book) => book.category))]
    : [];

  return (
    <>
      <h2>Books ({books ? books.length : 0}):</h2>
      {categories.map((category) => (
        <Category
          key={category}
          title={category ? category[0].toUpperCase() + category.slice(1) : ""}
          category={category}
        />
      ))}
    </>
  );
};
