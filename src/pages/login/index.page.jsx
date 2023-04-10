import { Button ,FormControl, FormErrorMessage, FormLabel, Stack, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { delay } from 'framer-motion';
import { loginPost } from '@/fetcher';
import { Layout } from '@/components';

function LoginPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useRouter()

  const onSubmit = async (data) => {
    // registerPost(data)
    // console.log(data.passwordConfirmation);
    try{
      console.log(data)
      const res = await loginPost(data);
      window.localStorage.setItem("token" , res.token)
      console.log(res)

      toast({
        title : "Login Berhasil",
        description: "Berhasil Login",
        status : "success",
        duration : 1000,
        isClosable : true,
      })
      delay(1500);
      navigate.push("/")
    } catch(e) {
      toast({
        title : e.message,
        description: "Coba Lagi",
        status : "error",
        duration : 1000,
        isClosable : true,
      })
    }
  }
  return (
    <Layout>
      <VStack >
      <form onSubmit={handleSubmit(onSubmit)} >
        <FormControl isInvalid={errors.email?.message}>
          <FormLabel>Email</FormLabel>
          <input name='email' type='email' placeholder='Masukkan Email' {...register("email", { required: "Email harus terisi" })} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password?.message}>
          <FormLabel>Password</FormLabel>
          <input type='password' placeholder='Masukkan password' {...register("password", { required: "Password harus terisi" })}/>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit'> Submit</Button>
      </form>
      </VStack>
      </Layout>
  )
}

export default LoginPage