import React, { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { Box } from '@chakra-ui/layout'
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import axios from 'axios'
import Loader from 'react-spinners/ClipLoader'

function AdminMenuForm({ menus, setMenus, toggle }) {
    const [error, setError] = useState(null)

    const validator = yup.object().shape({
        name: yup.string().required('name is required'),
        price: yup.number().required('Price is required'),
    })

    const addMenuItem = async (item) => {
        try {
            const baseUrl = 'http://localhost:3000/api/menu'
            const config = { headers: { 'Content-Type': 'application/json' } }
            const { data } = await axios.post(baseUrl, item, config)

            if (!data.data) {
                setError('Something went wrong, try again')
                return
            }

            setMenus([data.data, ...menus])
        } catch (error) {
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
    }, [error])
    return (
        <Box
            width='100%'
            height='auto'
            p='10px'
            border='1px solid #eee'
            mb='1rem'>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                }}
                validationSchema={validator}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true)

                    await addMenuItem(values)

                    actions.setSubmitting(false)
                    actions.resetForm()
                    toggle()
                }}>
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <Box
                        as='form'
                        width='100%'
                        height='auto'
                        onSubmit={handleSubmit}>
                        <FormControl
                            mb='1rem'
                            isInvalid={touched.name && errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Field
                                as={Input}
                                name='name'
                                type='text'
                                placeholder='e.g Chapati'
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.price && errors.price}>
                            <FormLabel>Price</FormLabel>
                            <Field
                                as={Input}
                                name='price'
                                type='number'
                                placeholder='eg 10.00'
                            />
                            <FormErrorMessage>{errors.price}</FormErrorMessage>
                        </FormControl>

                        <Button
                            type='submit'
                            bg='purple'
                            my='1rem'
                            color='#fff'
                            _focus={{ bg: 'purple.700' }}
                            _hover={{ bg: 'purple.700' }}
                            width='100%'
                            height='3rem'
                            isLoading={isSubmitting}
                            spinner={<Loader color='#ffff' size={20} />}>
                            Add item
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default AdminMenuForm
