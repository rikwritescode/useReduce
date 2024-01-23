import { useLibrary } from "./LibraryContext";
import { AddBookForm } from "./AddBookForm";

export const Book = ({ book }) => {
  const {
    actions: { borrowBook, returnBook, removeBook },
  } = useLibrary();

  const handleRemoveClick = () => {
    removeBook(book.id);
  };

  return (
    <>
      <h4>📖 {book.title}</h4>
      <p>✍ {book.author}</p>
      {book.available ? (
        <>
          <button type="button" onClick={() => borrowBook(book.id)}>
            ⇩ Borrow
          </button>
          <button type="button" onClick={handleRemoveClick}>
            🗑 Remove
          </button>
        </>
      ) : (
        <button type="button" onClick={() => returnBook(book.id)}>
          ⏎ Return
        </button>
      )}
      <AddBookForm />
    </>
  );
};
