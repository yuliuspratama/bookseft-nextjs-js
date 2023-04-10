import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname.toLowerCase().split("").join("-");
        cb(null,fileName);
    },
});

const uploads = multer({
    storage: storage,
    limits: {fileSize : 10000000},
});

export default function uploader(filedname){
    const handler = (req,res,next)=>{
        const ff = uploads.single(filedname);

        ff(req,res, (err) => {
            if ( err instanceof multer.MulterError) {
                return res.status(400).json({data:null, message: err.message})
            }else if ( err) {
                return res.status(500).json({data:null, message: err.message})
            }
            next()
        })
    }

    return handler
}