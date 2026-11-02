import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./AddBookForm.module.css";

interface FormValues {
  author: string;
  title: string;
  year: number;
  description: string;
}

const initialValues: FormValues = {
  author: "",
  title: "",
  year: 2026,
  description: "",
};

const bookValuesScheme = Yup.object().shape({
  author: Yup.string().min(2, "Minimum 2 symbols").required("Is required"),
  title: Yup.string().min(5, "Minimum 5 symbols").required("Is required"),
  year: Yup.number().required("Is required"),
  description: Yup.string().required("Is required"),
});

interface AddBookFormProps {
  onSubmit: () => void;
}

export default function AddBookForm({ onSubmit }: AddBookFormProps) {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    actions.resetForm();
    onSubmit();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={bookValuesScheme}
      >
        <Form>
          <label>
            Author:
            <Field type="text" name="author" />
            <ErrorMessage
              name="author"
              component="span"
              className={css.error}
            />
          </label>
          <label>
            Title:
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="span" className={css.error} />
          </label>
          <label>
            Year:
            <Field type="number" name="year" />
            <ErrorMessage name="year" component="span" className={css.error} />
          </label>
          <label>
            Description:
            <Field as="textarea" type="text" name="description" />
            <ErrorMessage
              name="description"
              component="span"
              className={css.error}
            />
          </label>
          <button type="submit">Add book</button>
        </Form>
      </Formik>
    </>
  );
}
