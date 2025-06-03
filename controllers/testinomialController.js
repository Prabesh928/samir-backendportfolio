const testomodel = require('../models/testinomial.model');
const cloudinary = require('cloudinary').v2;

exports.testinomial=async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const file = req.files.image;

    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Cloudinary upload failed', error });
      }

      const { name, post, text } = req.body;

      let testo = new testomodel({
        name: name,
        post: post,
        text: text,
        photoUrl: result.secure_url,
      });

      try {
        await testo.save();
        return res.json({ message: "Data saved successfully" });
      } catch (saveError) {
        return res.status(500).json({ message: "Error saving data", error: saveError });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
}

exports.uptestinomial= async(req,res)=>{

    let enquiryid= req.params.id;
    let{name,post,text,photo} =req.body
    let updateobj={
        name:name,
        text: text,
        post: post,
        photoUrl: photo

    }

    let updateres = await testomodel.updateOne({_id:enquiryid},updateobj);
    return res.json({message:"update sucessfully !"})

}

exports.deltestinomial= async(req,res)=>{

    let enquiryid= req.params.id;
    let deletres = await testomodel.deleteOne({_id:enquiryid});
    return res.json({message:"the selected data is delete"})

}


exports.gettestinomial= async(req,res)=>{
    try{
        let allworks = await testomodel.find();
        return res.json({data:allworks})
    }
    catch(error){
        return res.json({message:"error"})
    }

}