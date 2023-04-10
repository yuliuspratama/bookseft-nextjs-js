import { prisma } from "../../../../services/prisma";
import nc from "next-connect"
import validateMethod from "@/middleware/validateMethod";

const getBooksByID = async(req ,res) => {
try {
  const {id} = req.query
    const book = await prisma.book.findUnique({
      where: {id: Number(id)}
    })
  
    res.json({book})
} catch (error) {
  console.log(error)
  // res.status(400).json({message : "Ada yang Error"})
  res.status(400).json({error})
}
}
const deleteBooksByID = async(req ,res) => {
try {
  const {id} = req.query
    const book = await prisma.book.delete({
      where: {id: Number(id)}
    })
  
    res.json({book})
} catch (error) {
  console.log(error)
  // res.status(400).json({message : "Ada yang Error"})
  res.status(400).json({error})
}
}


const updateBooksByID = async(req ,res) => {
try {
  const {id} = req.query
  const {title,author,publisher,year,pages} = req.body
  const book = await prisma.book.update({
    where: {id: Number(id)},
    data: {
      title,
      author,
      publisher,
      year: parseInt(year),
      pages: parseInt(pages),
    },
  })
    res.json({book})
} catch (error) {
  console.log(error)
  // res.status(400).json({message : "Ada yang Error"})
  res.status(400).json({error})
}
}


const handler= nc()
.use(validateMethod(["GET" , "PUT" , "DELETE"]))
.get(getBooksByID)
.put(updateBooksByID)
.delete(deleteBooksByID)

export default handler;