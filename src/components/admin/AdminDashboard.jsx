import {
    Box,
    Button,
    Heading,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlusCircle, FaPowerOff } from 'react-icons/fa'
import { useHistory } from 'react-router'
import AdminMenuForm from './AdminMenuForm'
import AdminMenuList from './AdminMenuList'

function AdminDashboard() {
    const history = useHistory()
    const [menus, setMenus] = useState([])
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    const fetchAllMenus = async () => {
        try {
            const baseUrl = 'http://localhost:3000/api/menu'
            const config = { headers: { 'Content-Type': 'application/json' } }
            const { data } = await axios.get(baseUrl, config)

            if (!data.data.length) {
                setMenus([])
                return
            }

            setMenus(data.data)
        } catch (error) {
            console.log(error)
            setMenus([])
            return
        }
    }

    const logout = () => {
        if (typeof window !== undefined) {
            localStorage.removeItem('foodieAdmin')
            history.push('/admin')
        } else {
            return
        }
    }

    useEffect(() => {
        fetchAllMenus()
    }, [])
    return (
        <Box
            width={{ sm: '100%', md: '80%', lg: '60%', xl: '50%' }}
            mx='auto'
            borderRadius='10px'
            height='auto'>
            <Box height='auto' minHeight='10vh' width='100%'>
                <Box
                    border='1px solid #eee'
                    height='auto'
                    width='100%'
                    borderRadius='10px'
                    my='1rem'
                    p='10px'>
                    <HStack
                        justifyContent='space-between'
                        alignItems='flex-start'>
                        <Heading as='h2' size='md'>
                            Welcome Admin
                        </Heading>
                        <Tag
                            p='10px'
                            colorScheme='purple'
                            onClick={logout}
                            cursor='pointer'>
                            <TagLeftIcon as={FaPowerOff} />
                            <TagLabel>Logout</TagLabel>
                        </Tag>
                    </HStack>

                    <Button
                        type='submit'
                        bg='purple'
                        my='1rem'
                        color='#fff'
                        _focus={{ bg: 'purple.600' }}
                        _hover={{ bg: 'purple.700' }}
                        width='40%'
                        height='3rem'
                        leftIcon={<FaPlusCircle />}
                        onClick={toggle}
                        fontWeight='400'>
                        Menu item
                    </Button>
                </Box>

                {open && (
                    <AdminMenuForm
                        menus={menus}
                        setMenus={setMenus}
                        toggle={toggle}
                    />
                )}

                <AdminMenuList menus={menus} setMenus={setMenus} />
            </Box>
        </Box>
    )
}

export default AdminDashboard
