import { createContext, useContext, useReducer } from "react";
import { collection } from "./collection";

export const LibraryContext = createContext({});

LibraryContext.displayName = "LibraryContext";

const libraryReducer = (state, action) => {
  switch (action.type) {
    case "borrow-book":
      // Update logic for borrowing a book
      return state.map((book) =>
        book.id === action.id ? { ...book, available: false } : book
      );

    case "return-book":
      // Update logic for returning a book
      return state.map((book) =>
        book.id === action.id ? { ...book, available: true } : book
      );

    case "remove-book":
      // Update logic for removing a book
      return state.filter((book) => book.id !== action.id);

    case "add-book":
      // Existing logic for adding a book
      const newBook = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
        title: action.title,
        author: action.author,
        category: action.category.toLowerCase(),
        available: true,
      };
      return [...state, newBook];

    default:
      return state;
  }
};

export const LibraryContextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(libraryReducer, collection.books);

  const actions = {
    borrowBook: (id) => dispatch({ type: "borrow-book", id }),
    returnBook: (id) => dispatch({ type: "return-book", id }),
    removeBook: (id) => dispatch({ type: "remove-book", id }),
    addBook: (props) => dispatch({ type: "add-book", ...props }),
  };

  return (
    <LibraryContext.Provider value={{ books, actions }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryContextProvider");
  }
  return context;
};
