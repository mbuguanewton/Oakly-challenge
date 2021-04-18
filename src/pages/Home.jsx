import React from 'react'
import { Stack, Box, Image, Heading } from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import MenuList from '../components/menu/MenuList'

function Home() {
    return (
        <>
            <Navbar />
            <Box height='auto' width='100%' minHeight='90vh'>
                <Box
                    width={{ sm: '100%', md: '80%', lg: '70%', xl: '60%' }}
                    p={['10px']}
                    height='auto'
                    margin='1rem auto'>
                    <Box
                        width='100%'
                        height='30vh'
                        as={Stack}
                        direction='row'
                        alignItems='center'
                        borderRadius='10px'
                        border='2px solid #eee'
                        justifyContent='space-between'>
                        <Image
                            src='/foodie.jpg'
                            height='100%'
                            width='100%'
                            borderRadius='10px'
                            objectPosition='top'
                            objectFit='cover'
                        />
                    </Box>
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
