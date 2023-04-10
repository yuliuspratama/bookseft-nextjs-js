import { prisma } from "../../../../services/prisma";
import nc from "next-connect"
import validateMethod from "@/middleware/validateMethod";
import uploader from "@/middleware/uploader";

export const getBooks = async () => {
  const books = await prisma.book.findMany();

  return books;
};

const getBooksResponse = async (req, res) => {
  const books = await getBooks();
  res.json({ books });
};

const upBooks = async(req ,res) => {
  const {title,author,publisher,year,pages} = req.body
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: req.file.path.split("public")[1],
      },
    })

    res.json({book})
  } catch (error) {
    console.log("err",error);
    res.status(4000).json({message : "book sudah ada"})
  }

}


const handler= nc()
.use(validateMethod(["GET" , "POST"]))
.use(uploader("image"))
.get(getBooksResponse)
.post(upBooks)
export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}