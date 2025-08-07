const corporateAdminController = require('../models/corporateAdmin');

const corporateAdmin = async(req,res)=>
{
    try{
        
         const formData = req.body;
         formData.idProof = req.files?.idProof?.[0]?.filename || null;
         formData.profilePicture = req.files?.profilePicture?.[0]?.filename || null;
         formData.authorizationLetter = req.files?.authorizationLetter?.[0]?.filename || null;

         console.log('FormData:',formData)
         const cAdmin = await corporateAdminController.createCorporateAdmin(formData);
         console.log('Created User',cAdmin);
         res.status(200).json({message:'Corporate Admin Created Successfully'})
    }  
    catch(err){
        res.status(500).json({msg:'Error',error:err.message})
    } 
}


const getAllCAdmins = async(req,res)=>
{
    try{
        const admins = await corporateAdminController.getAllCorporateAdmins();
        res.status(200).json({msg:'Fetched corporate admins successfully',success:true,data:admins})
    }
    catch(err){
        res.status(500).json({error:err.message,msg:'database Query error',success:false})
    }
}
module.exports = {corporateAdmin,getAllCAdmins};