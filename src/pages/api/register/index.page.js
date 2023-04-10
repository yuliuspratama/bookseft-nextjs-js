import nc from "next-connect" 
import bcrypt from "bcrypt"
import validateMethod from "@/middleware/validateMethod";
import { registerSchema } from "../../../../schema";
// import errorHandler from "@/middleware/errorHandler";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../services/prisma";


const register  = async(req,res) => {
    // const { name, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    try {
     const validateRes = await registerSchema.validateAsync(req.body);
     const userExits = await prisma.user.findUnique({
      where: {email : validateRes.email},
     })
     if (userExits) return res.status(400).json({data : "Email alredy taken"})

     validateRes.password = await bcrypt.hash(validateRes.password, 12);
     const user = await prisma.user.create({
      data: validateRes
     })

     const {password , ...result} = user;
     const token = jwt.sign({id : result.id, email: result.email}, process.env.JWT_SECRET,{
      expiresIn: "2h",
     })

     res.status(201).json({data: {...result}, token})
    }
    catch (err) {
      res.status(400).json({ message: err });
    }
}

const handler = nc()
    .use(validateMethod(["POST"]))
    .post(register)

export default handler