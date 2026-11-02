import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./AddContactForm.module.css";
import * as Yup from "yup";

const addContactValidationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  number: Yup.string().required("This field is required"),
  hasWork: Yup.string().oneOf(["true", "false"]),
  city: Yup.string().required("This field is required"),
  job: Yup.string().required("This field is required"),
  hobbies: Yup.array().of(
    Yup.string().oneOf(["sport", "reading", "travelling"]),
  ),
  email: Yup.string().email().required("This field is required"),
  sex: Yup.string().oneOf(["male", "female"]),
  birthDay: Yup.string().required("This field is required"),
  description: Yup.string(),
});

type Hobbies = "sport" | "reading" | "travelling";

interface FormValues {
  name: string;
  number: string;
  hasWork: "true" | "false";
  city: string;
  job: string;
  hobbies: Hobbies[];
  email: string;
  sex: string;
  birthDay: string;
  description: string;
}

const initialValues: FormValues = {
  name: "",
  number: "",
  hasWork: "false",
  city: "",
  job: "",
  hobbies: [],
  email: "",
  sex: "male",
  birthDay: "",
  description: "",
};

export default function AddContactForm() {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addContactValidationSchema}
    >
      <Form className={css.form}>
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
        <label>
          Number
          <Field type="phone" name="number" />
          <ErrorMessage name="number" component="span" className={css.error} />
        </label>
        <label>
          City
          <Field type="text" name="city" />
          <ErrorMessage name="city" component="span" className={css.error} />
        </label>
        <label>
          Job
          <Field type="text" name="job" />
          <ErrorMessage name="job" component="span" className={css.error} />
        </label>
        <label>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" className={css.error} />
        </label>
        <fieldset>
          <legend>Hobbies</legend>
          <label>
            <Field type="checkbox" name="hobbies" value="sport" />
            Sport
          </label>
          <label>
            <Field type="checkbox" name="hobbies" value="reading" />
            Reading
          </label>
          <label>
            <Field type="checkbox" name="hobbies" value="traveling" />
            Traveling
          </label>
          <ErrorMessage name="hobbies" component="span" className={css.error} />
        </fieldset>
        <label>
          Sex
          <select name="sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <ErrorMessage name="sex" component="span" className={css.error} />
        </label>
        <fieldset>
          <legend>Has Work</legend>
          <label>
            <Field type="radio" name="hasWork" value="true" />
            Yes
          </label>
          <label>
            <Field type="radio" name="hasWork" value="false" />
            No
          </label>
          <ErrorMessage name="hasWork" component="span" className={css.error} />
        </fieldset>
        <label>
          BirthDay
          <Field type="date" name="birthDay" />
          <ErrorMessage
            name="birthDay"
            component="span"
            className={css.error}
          />
        </label>
        <label>
          Description
          <Field as="textarea" type="date" name="description" />
        </label>
        <button type="submit">Send contact</button>
      </Form>
    </Formik>
  );
}
