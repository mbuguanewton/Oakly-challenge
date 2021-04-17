import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './utils/theme'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/700.css'

const app = (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ChakraProvider>
)

hydrate(app, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
