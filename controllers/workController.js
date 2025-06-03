const workmodel = require('../models/work.model');
const cloudinary = require('cloudinary').v2;

exports.work = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    const file = req.files.image;


    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (error) return res.status(500).json({ message: 'Cloudinary upload failed', error });

      const { name, location, details, date } = req.body;
      const workdata = new workmodel({
        workName: name,
        workLocation: location,
        workDetails: details,
        workDate: date,
        imageUrl: result.secure_url
      });

      await workdata.save();
      res.json({ message: 'Data saved successfully' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}


exports.getwork = async(req,res)=>{
    try{
        let allworks = await workmodel.find();
        return res.json({data:allworks})
    }
    catch(error){
        return res.json({message:"error"})
    }

}


exports.upwork = async(req,res)=>{

    let enquiryid= req.params.id;
    let {name,location,image,date,details}=req.body
    let updateobj={
        workName:name,
        workLocation: location,
        workDetails: details,
        workDate: date,
        imageUrl: image,

    }

    let updateres = await workmodel.updateOne({_id:enquiryid},updateobj);
    return res.json({message:"update sucessfully !"})

}
exports.delwork = async(req,res)=>{

    let enquiryid= req.params.id;
    let deletres = await workmodel.deleteOne({_id:enquiryid});
    return res.json({message:"the selected data is delete"})

}