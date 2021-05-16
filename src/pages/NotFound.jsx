import React from 'react'
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <Box height='100vh' width='100%' overflow='hidden'>
            <Center
                as={Stack}
                height='100%'
                direction='column'
                alignItems='center'
                justifyContent='center'>
                <Heading>404 | Page No found</Heading>
                <Text as={Link} to='/'>
                    Go back home &rarr;
                </Text>
            </Center>
        </Box>
    )
}

export default NotFound
