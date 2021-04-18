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
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from 'react-spinners/ClipLoader'
import * as yup from 'yup'

function MenuListItem({ menu, menus, setMenus }) {
    const [open, setOpen] = useState(false)

    const baseUrl = `http://localhost:3000/api/menu/${menu?._id}`

    const updateItem = async (update) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }

            const { data } = await axios.patch(baseUrl, update, config)

            const newMenus =
                menus &&
                menus.map((menu) => {
                    if (menu?._id === data?.data._id) {
                        menu = data?.data
                    }
                    return menu
                })

            setMenus(newMenus)

            alert('menu item updated')
        } catch (error) {
            alert(error.message)
            return
        }
    }
    const deleteItem = async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }

            const { data } = await axios.delete(baseUrl, config)

            alert('Are you sure you want to continue')

            const newMenus =
                menus && menus.filter((menu) => menu?._id !== data?.data._id)

            setMenus(newMenus)

            alert('menu item deleted')
        } catch (error) {
            alert(error.message)
            return
        }
    }

    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    const validator = yup.object().shape({
        name: yup.string().required('name is required'),
        price: yup.number().required('Price is required'),
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
                        colorScheme='purple'
                        height='100%'
                        width='25%'
                        p='10px'
                        cursor='pointer'
                        onClick={toggle}>
                        <TagLeftIcon as={FaEdit} />
                        <TagLabel>Edit</TagLabel>
                    </Tag>
                </Stack>
                <Stack
                    direction='row'
                    height='100%'
                    justifyContent='space-between'>
                    <Badge p='8px' width='30%' borderRadius='5px'>
                        {menu && `KES ${menu?.price}`}
                    </Badge>
                    <Tag
                        colorScheme='red'
                        height='100%'
                        p='10px'
                        width='25%'
                        cursor='pointer'
                        onClick={deleteItem}>
                        <TagLeftIcon as={FaTrashAlt} />
                        <TagLabel>Delete</TagLabel>
                    </Tag>
                </Stack>
            </Box>
            {open && (
                <Formik
                    initialValues={{
                        name: menu?.name,
                        price: menu?.price,
                    }}
                    validationSchema={validator}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)

                        await updateItem(values)

                        actions.setSubmitting(false)
                        actions.resetForm()

                        toggle()
                    }}>
                    {({ touched, errors, handleSubmit, isSubmitting }) => (
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
                                <FormErrorMessage>
                                    {errors.name}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={touched.price && errors.price}>
                                <FormLabel>Price</FormLabel>
                                <Field
                                    as={Input}
                                    name='price'
                                    type='number'
                                    placeholder='eg 10.00'
                                />
                                <FormErrorMessage>
                                    {errors.price}
                                </FormErrorMessage>
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
                                Edit item
                            </Button>
                        </Box>
                    )}
                </Formik>
            )}
        </Box>
    )
}

export default MenuListItem
