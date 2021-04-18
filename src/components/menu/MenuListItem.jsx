import {
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
    Tag,
    TagLabel,
    TagLeftIcon,
} from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Field } from 'formik'
import React, { useState } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import Loader from 'react-spinners/ClipLoader'
import * as yup from 'yup'

function MenuListItem({ menu }) {
    const [open, setOpen] = useState(false)

    const makeOrder = async (order) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }

            const baseUrl = 'http://localhost:3000'

            const { data } = await axios.post(
                `${baseUrl}/api/order`,
                order,
                config
            )

            if (data.message === 'ok') {
                alert('Order successful')
            }
        } catch (error) {
            throw error
        }
    }

    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    const validator = yup.object().shape({
        number: yup.string().required('number is required'),
    })

    return (
        <Box
            height='auto'
            as={Stack}
            direction='column'
            justifyContent='space-between'
            padding='20px 10px'
            borderRadius='10px'
            border='2px solid #eee'>
            <Box
                height='auto'
                width='100%'
                as={Stack}
                direction='column'
                justifyContent='space-between'>
                <Stack
                    direction='row'
                    height='100%'
                    justifyContent='space-between'>
                    <Heading as='h4' size='sm'>
                        {menu?.name}
                    </Heading>
                    <Tag
                        bg='purple'
                        height='100%'
                        p='10px'
                        color='#fff'
                        cursor='pointer'
                        onClick={toggle}>
                        <TagLeftIcon as={FaCartPlus} />
                        <TagLabel>Order</TagLabel>
                    </Tag>
                </Stack>
                <Badge p='8px' my='1rem' width='30%' borderRadius='5px'>
                    {menu && `KES ${menu?.price}`}
                </Badge>
            </Box>
            {open && (
                <Formik
                    initialValues={{
                        number: '',
                    }}
                    validationSchema={validator}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)

                        const order = {
                            menuItemId: menu?._id,
                            userPhoneNumber: values.number,
                        }

                        await makeOrder(order)

                        actions.setSubmitting(false)
                        actions.resetForm()

                        toggle()
                    }}>
                    {({ touched, errors, handleSubmit, isSubmitting }) => (
                        <Box as='form' width='100%' onSubmit={handleSubmit}>
                            <Stack width='100%'>
                                <FormControl
                                    width='100%'
                                    mt='1rem'
                                    isInvalid={touched.number && errors.number}>
                                    <FormLabel fontSize='.9rem'>
                                        Number
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        placeholder='+254700000000'
                                        width='100%'
                                        height='2.5rem'
                                        name='number'
                                    />
                                    <FormErrorMessage>
                                        {errors.number}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    type='submit'
                                    bg='purple'
                                    color='#fff'
                                    _focus={{ bg: 'purple.600' }}
                                    _hover={{ bg: 'purple.700' }}
                                    width='100%'
                                    height='2.5rem'
                                    isLoading={isSubmitting}
                                    spinner={<Loader color='#ffff' size={20} />}
                                    fontSize='.8rem'
                                    onClick={makeOrder}>
                                    Order
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            )}
        </Box>
    )
}

export default MenuListItem
