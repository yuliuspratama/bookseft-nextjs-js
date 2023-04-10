import { GlobalContextProvider } from '@/context/globalContext'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
    <ChakraProvider>
    <Component {...pageProps} />
    </ChakraProvider>
    </GlobalContextProvider>
  )
}
