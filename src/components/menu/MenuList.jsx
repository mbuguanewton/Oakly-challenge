import React, { useState, useEffect } from 'react'
import { Grid, Text } from '@chakra-ui/react'
import axios from 'axios'
import MenuListItem from './MenuListItem'

function MenuList() {
    const [menus, setMenus] = useState([])

    const fetchMenus = async () => {
        try {
            const baseUrl = 'http://localhost:3000'
            const { data } = await axios.get(`${baseUrl}/api/menu`)
            if (!data.data.length) {
                setMenus([])
            } else {
                return setMenus(data.data)
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchMenus()
    }, [])

    return (
        <>
            <Grid
                width='100%'
                height='auto'
                gap='1rem'
                templateColumns={{
                    sm: 'repeat(1,1fr)',
                    md: 'repeat(2,1fr)',
                    lg: 'repeat(2,1fr)',
                    xl: 'repeat(3,1fr)',
                }}>
                {menus &&
                    menus.map((menu) => (
                        <MenuListItem
                            key={menu?._id}
                            menu={menu}
                            menus={menus}
                            setMenus={setMenus}
                        />
                    ))}
            </Grid>
            {!menus.length && <Text>Menu items not available</Text>}
        </>
    )
}

export default MenuList
