import * as React from 'react'
import { useState , useEffect} from "react";
import { Card, Image, Stack, CardBody, Heading, CardFooter, Button, Text, layout, Flex,  Box,Spacer, IconButton, Container } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useGlobalContext } from "@/context/globalContext";


function Layout ({children}){
  const [showMenu, setShowMenu] = useState(false);
  const{isLogin,setIsLogin} = useGlobalContext();

  return (
        <>
<Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.100"
      color="black"
    >
      <Box as="a" href="/"  fontSize="2xl" fontWeight="bold">
        Rack Buku
      </Box>
      <Spacer />
      <Box as="a" href="/" display={{ base: "block", md: "none" }}>
        <IconButton
          icon={showMenu ? <CloseIcon /> : <HamburgerIcon />}
          onClick={() => setShowMenu(!showMenu)}
          variant="ghost"
          size="md"
          aria-label="Menu"
        />
      </Box>
      
      <Box
        display={{
          base: showMenu ? "block" : "none",
          md: "flex",
        }}
        width={{
          base: "full",
          md: "auto",
        }}
        alignItems="center"
        flexGrow={1}
      >
        <Button as="a" href="/" variant="ghost" mr={4}>
          Home
        </Button>
        {isLogin && (
          <>
        <Button as="a" href="/books/new" variant="ghost" mr={4}>
        Buku Baru</Button>
          </>
        )}
        {
          !isLogin ? (
            <>
            <Button as="a" href="/login" variant="ghost" mr={4} >
            Login</Button>
            <Button as="a" href="/register" variant="ghost" mr={4} >
            Register
          </Button>
            </>
          ) : (
            <Button as="a" colorScheme='red' mr={4} onClick={() =>
            {
              window.localStorage.removeItem("token");
            setIsLogin(false);
          }
            }>
            Logout
          </Button>
          )
        }
      </Box>

    </Flex>
    <Container  maxW="container.xl" color="black" p={2} mt={4}>
    {children}
    </Container>
        
        </>
    )
}

export default Layout