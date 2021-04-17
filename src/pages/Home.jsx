import React from 'react'
import { Stack, Box } from '@chakra-ui/layout'
import Navbar from '../components/common/Navbar'
import { Heading } from '@chakra-ui/layout'
import MenuList from '../components/MenuList'

function Home() {
    return (
        <>
            <Navbar />
            <Box height='auto' width='100%' minHeight='90vh'>
                <Box width='50%' height='auto' margin='1rem auto'>
                    <Box
                        width='100%'
                        height='30vh'
                        as={Stack}
                        p='20px'
                        direction='row'
                        alignItems='center'
                        borderRadius='10px'
                        border='2px solid #eee'
                        justifyContent='space-between'></Box>
                    <Box
                        width='100%'
                        height='auto'
                        my='2rem'
                        borderRadius='10px'>
                        <Heading color='#555' as='h2' size='lg' my='1rem'>
                            Our Menu
                        </Heading>
                        <MenuList />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Home
