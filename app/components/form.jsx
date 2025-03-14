'use client';

import React, { useState } from 'react';
import { Button, TextInput } from './styledForm';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CityForm({onCityChange}) {
  const validationSchema = Yup.object({
    cityInput: Yup.string()
      .required('City is required')
  });

  const [cityName, setCityName] = useState({ cityInput: '' });


  return (

    <Formik
        initialValues={{ cityName}}
        onSubmit={(values) => {
          setCityName(values);
          onCityChange(values.cityInput);
        }}
        validationSchema={validationSchema}
        >
          <Form>
            <TextInput name="cityInput" />
            <Button type="submit">Go</Button>
            <ErrorMessage name="cityInput" component="div" />
          </Form>
    </Formik>

  );
}
