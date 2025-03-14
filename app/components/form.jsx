'use client';

import React, { useState } from 'react';
import { Button, TextInput } from './styledForm';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CityForm({onCityChange}) {
  const validationSchema = Yup.object({
    cityInput: Yup.string()
      .required('City is required to get forecast')
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
          <Form className="py-8">
            <TextInput name="cityInput" />
            <Button type="submit">Go</Button>
            <ErrorMessage name="cityInput" component="div" className="text-red-400 pt-2" />
          </Form>
    </Formik>

  );
}
