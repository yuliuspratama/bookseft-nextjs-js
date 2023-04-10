import nc from "next-connect" 
import bcrypt from "bcrypt"
import validateMethod from "@/middleware/validateMethod";
import { registerSchema } from "../../../../schema";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../services/prisma";


const login  = async(req,res) => {
    try {
    const {email,password} = req.body
    const user = await prisma.user.findUnique({ where: {email}})

    if(!user){
        return res.status(400).json({message : " invalid Credentials"})
    }

    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(400).json({message : " invalid Credentials"})
    }
    const token = jwt.sign({userID: user.id }, process.env.JWT_SECRET)
    res.json({token})
    }
    catch (err) {
      res.status(400).json({ message: err });
    }
}

const handler = nc()
    .use(validateMethod(["POST"]))
    .post(login)

export default handler