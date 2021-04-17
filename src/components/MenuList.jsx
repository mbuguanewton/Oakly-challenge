import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
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
                templateColumns='repeat(3,1fr)'>
                {menus &&
                    menus.map((menu) => (
                        <MenuListItem
                            menu={menu}
                            menus={menus}
                            setMenus={setMenus}
                        />
                    ))}
            </Grid>
        </>
    )
}

export default MenuList
