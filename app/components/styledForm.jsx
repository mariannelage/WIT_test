import React from 'react';
import styled from 'styled-components'
import { Formik, Field  } from 'formik';

export function Button({children}) {

    const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0 1em;
    padding: 0.25em 1em;
    `

    return (
        <Button>{children}</Button>
)}

export function TextInput({name}){

    const TextInput = styled(Field)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    padding: 0.25em 1em;
    `

    return (
        <TextInput name={name} />
)}