const express = require("express");
const router = express.Router()
const schema = require("./models/Schema")
const multer = require("multer")
const path=require("path")
const fs = require("fs")


const Storage=multer.diskStorage({
    destination:(req,file,callback)=>{

        callback(null,"./Files/")
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now()+path.extname(file.originalname))
    }

});

const upload = multer({
    storage:Storage
})

router.post("/",upload.single("Files"),async(req,res)=>{
    const postdata =  new schema({
        originalname:req.file.originalname,
        mimetype:req.file.mimetype,
        filename:req.file.filename,
        path:req.file.path,
        size:req.file.size,
        name : req.body.name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        checkbox:req.body.checkbox
        
        
})
await postdata.save()
res.json(postdata)

})
router.get("/",async(req,res)=>{
    const getdata=await schema.find()
    res.json(getdata)
    
})

router.get("/:id",async(req,res)=>{
    const getdata=await schema.findById(req.params.id)
    res.json(getdata)
    
})

router.post("/update/:id",upload.single("Files"),async(req,res)=>{
    const delprevfile = await schema.findById(req.params.id)
    fs.unlink(delprevfile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("file removed ");
        }
    }));

    const updates= await schema.findByIdAndUpdate(req.params.id)
    updates.originalname=req.file.originalname
    updates.mimetype=req.file.mimetype
    updates.filename=req.file.filename
    updates.path=req.file.path
    updates.size=req.file.size
    updates.name=req.body.name;
    updates.email=req.body.email
    updates.phoneNumber=req.body.phoneNumber
    updates.password=req.body.password
    updates.confirmPassword=req.body.confirmPassword
    updates.checkbox=req.body.checkbox
   

     updates.save();
    res.json(updates)  
})

router.delete("/:id",async(req,res)=>{
    const deldata =  await schema.findById(req.params.id)

    fs.unlink(deldata.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Removed");
        }
    }));
     await schema.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})

module.exports = router;




