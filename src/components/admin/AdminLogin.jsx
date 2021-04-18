import React, { useEffect, useState } from 'react'
import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Loader from 'react-spinners/ClipLoader'
import { useHistory } from 'react-router-dom'

function AdminLogin() {
    const history = useHistory()
    const [error, setError] = useState(null)
    const validator = yup.object().shape({
        email: yup
            .string()
            .email('invalid email address')
            .required('email is required'),
        password: yup.string().required('Password is required'),
    })

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
    }, [error])

    return (
        <Box
            height='auto'
            p='20px'
            width={{ sm: '100%', md: '60%', lg: '50%', xl: '30%' }}
            mx='auto'
            borderRadius='10px'
            as={Stack}
            border='1px solid #eee'>
            <Heading as='h2' size='lg' my='1rem'>
                Admin Login
            </Heading>

            <HStack>
                <Badge
                    textTransform='lowercase'
                    p='5px'
                    borderRadius='5px'
                    fontWeight='400'
                    fontSize='.9rem'>
                    Email: admin@mail.com
                </Badge>
                <Badge
                    textTransform='lowercase'
                    p='5px'
                    borderRadius='5px'
                    fontWeight='400'
                    fontSize='.9rem'>
                    Password: admin123
                </Badge>
            </HStack>

            {error && (
                <Alert status='error' borderRadius='10px' my='1rem'>
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validator}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)

                    const admin = {
                        email: 'admin@mail.com',
                        password: 'admin123',
                    }

                    if (values.email !== admin.email) {
                        setError('Invalid, check email or password')
                        actions.setSubmitting(false)
                        return
                    }
                    if (values.password !== admin.password) {
                        setError('Invalid, check email or password')
                        actions.setSubmitting(false)
                        return
                    }

                    localStorage.setItem(
                        'foodieAdmin',
                        `foodie-Admin&${new Date().getTime()}`
                    )

                    actions.setSubmitting(false)
                    actions.resetForm()

                    history.push('/admin')
                }}>
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <Box
                        as='form'
                        width='100%'
                        height='auto'
                        onSubmit={handleSubmit}>
                        <FormControl
                            mb='1rem'
                            isInvalid={touched.email && errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Field
                                as={Input}
                                name='email'
                                type='text'
                                placeholder='password'
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={touched.password && errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Field
                                as={Input}
                                name='password'
                                type='password'
                                placeholder='password'
                            />
                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>

                        <Button
                            type='submit'
                            bg='purple'
                            my='1rem'
                            color='#fff'
                            _focus={{ bg: 'purple.600' }}
                            _hover={{ bg: 'purple.700' }}
                            width='100%'
                            height='3rem'
                            isLoading={isSubmitting}
                            spinner={<Loader color='#ffff' size={20} />}>
                            Login
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default AdminLogin
