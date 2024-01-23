import { useLibrary } from "./LibraryContext";
import { Stack, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

export const AddBookForm = () => {
  const {
    actions: { addBook },
  } = useLibrary();
  const [showFields, setShowFields] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
  });

  const handleButtonClick = async () => {
    if (!showFields) {
      setShowFields(true);
    } else {
      // Submit the form and log the result of adding the book
      const bookAdded = await addBook(formData);
      console.log("Book added:", bookAdded);

      // Reset the form
      setFormData({ title: "", author: "", category: "" });
      setShowFields(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <Stack spacing={4}>
        {showFields && (
          <>
            <FormControl>
              <FormLabel htmlFor="title">Title:</FormLabel>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="author">Author:</FormLabel>
              <Input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="category">Category:</FormLabel>
              <Input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </FormControl>
          </>
        )}

        <Button type="button" onClick={handleButtonClick}>
          {showFields ? "Submit" : "Add Book"}
        </Button>
      </Stack>
    </form>
  );
};
