import { Button, FormControl, FormErrorMessage, FormLabel, Stack, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { delay } from 'framer-motion';
import { registerPost } from '@/fetcher';
import { PATH } from '@/constrats/path';
import { Layout } from '@/components';

function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data) => {
    // registerPost(data)
    console.log(data.passwordConfirmation);
    try{

      const res = await registerPost(data);

      toast({
        title : "Register Berhasil",
        description: "Berhasil Registrasi",
        status : "success",
        duration : 1000,
        isClosable : true,
      })
      delay(1500);
      router.push(PATH.login)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name?.message}>
        <FormLabel>Name</FormLabel>
        <input  type='name' placeholder='Masukkan nama'   {...register("name", { required: "Nama harus terisi" })}/>
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email?.message}>
        <FormLabel>Email</FormLabel>
        <input type='email' placeholder='Masukkan email' {...register("email", { required: "Email harus terisi" })}/>
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

export default RegisterPage