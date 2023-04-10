import InfoCard from '@/components/InfoCard';
import { getAllBooks } from '@/fetcher';
import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import { useEffect, useState } from "react";


function HomePage() {
  const [books, setBooks] = useState([]);
  console.log(books)
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);


  return (
    <>
    <SimpleGrid column={2} spacing={2} justifyContent={'normal'}>
    {books?.books?.map((book) => (
    <InfoCard key={`${book.id}`} {...book}/> 
    ))}
    </SimpleGrid>
    </>
  );
}

export default HomePage