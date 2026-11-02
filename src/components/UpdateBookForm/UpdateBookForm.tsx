import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./UpdateBookForm.module.css";
import type { Book } from "../../types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../../services/booksApi";
import * as Yup from "yup";

interface UpdateBookFormProps {
  book: Book;
}

interface FormValues {
  author: string;
  title: string;
  year: number;
  description: string;
}

const bookValuesScheme = Yup.object().shape({
  title: Yup.string()
    .min(2, "Min length is 2")
    .required("This field is required"),
  author: Yup.string()
    .min(5, "Min length is 5")
    .required("This field is required"),
  year: Yup.number().required("This field is required"),
  description: Yup.string().required("This fiels is required"),
});

export default function UpdateBookForm({ book }: UpdateBookFormProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });

  const initialValues = {
    title: book.title,
    author: book.author,
    year: book.year,
    description: book.description,
  };

  const handleSubmit = (values: FormValues) => {
    mutate({ ...values, id: book.id });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={bookValuesScheme}
    >
      <Form>
        <label>
          Title:
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="span" className={css.error} />
        </label>
        <label>
          Author:
          <Field name="author" type="text" />
          <ErrorMessage name="author" component="span" className={css.error} />
        </label>
        <label>
          Year:
          <Field name="year" type="number" />
          <ErrorMessage name="year" component="span" className={css.error} />
        </label>
        <label>
          Description:
          <Field as="textarea" name="description" type="text" />
          <ErrorMessage
            name="description"
            component="span"
            className={css.error}
          />
        </label>
        <button type="submit">Update book</button>
      </Form>
    </Formik>
  );
}
