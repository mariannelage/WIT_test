'use client';

import React from 'react';
import { Button, TextInput } from './styledForm';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CityForm({onFormSubmit}) {

  return (

    <Formik
        initialValues={{ cityInput: ''}}
        onSubmit={(values) => {
          onFormSubmit(values.cityInput);
        }}
        >
          <Form>
            <TextInput name="cityInput" />
            <ErrorMessage name="cityInput" component="div" />
            <Button type="submit">Go</Button>
          </Form>
    </Formik>

  );
}
