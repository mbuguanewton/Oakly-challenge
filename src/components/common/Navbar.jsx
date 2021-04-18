import { Box, Heading, Stack } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <Box
            width='100%'
            height='4rem'
            p='10px'
            as={Stack}
            direction='row'
            alignItems='center'
            justifyContent='center'
            bg='purple'
            alignItems='center'>
            <Heading as='h1' as={Link} to='/' size='lg' color='#fff'>
                Foodie
            </Heading>
        </Box>
    )
}

export default Navbar
