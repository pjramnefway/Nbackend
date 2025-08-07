const express = require('express');
const router = express.Router();
const corporateAdminCotroller = require('../controller/corporateAdminController');
const fileUpload = require('../middleware/fileUpload');

router.post('/get_corporate_admin',  fileUpload.fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
    { name: 'authorizationLetter', maxCount: 1 }
  ]),corporateAdminCotroller.corporateAdmin);

router.get('/getall',corporateAdminCotroller.getAllCAdmins);
  module.exports = router;
