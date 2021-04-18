import React from 'react'
import { Center, Grid, Text } from '@chakra-ui/react'
import AdminMenuListItem from './AdminMenuListItem'

function AdminMenuList({ menus, setMenus }) {
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
                        <AdminMenuListItem
                            key={menu?._id}
                            menu={menu}
                            menus={menus}
                            setMenus={setMenus}
                        />
                    ))}
            </Grid>
            {!menus.length && (
                <Center my='2rem'>
                    <Text>Menu items not available</Text>
                </Center>
            )}
        </>
    )
}

export default AdminMenuList
