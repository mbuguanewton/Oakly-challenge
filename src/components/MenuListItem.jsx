import {
    Badge,
    Box,
    Heading,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
} from '@chakra-ui/react'
import React from 'react'
import { FaCartPlus } from 'react-icons/fa'

function MenuListItem({ menu }) {
    return (
        <Box
            height='12vh'
            as={Stack}
            direction='row'
            justifyContent='space-between'
            padding='10px'
            borderRadius='10px'
            border='2px solid #eee'>
            <Stack
                direction='column'
                height='100%'
                justifyContent='space-between'>
                <Heading as='h4' size='sm'>
                    {menu?.name}
                </Heading>
                <Badge p='8px' borderRadius='5px'>
                    {menu && `KES ${menu?.price}`}
                </Badge>
            </Stack>

            <Tag bg='purple' height='45%' color='#fff'>
                <TagLeftIcon as={FaCartPlus} />
                <TagLabel>Order</TagLabel>
            </Tag>
        </Box>
    )
}

export default MenuListItem
