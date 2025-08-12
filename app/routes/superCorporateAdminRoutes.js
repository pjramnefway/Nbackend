const express = require('express');
const router = express.Router();
const superCorporateAdminController = require('../controller/superCorporateAdminController');
const upload = require('../middleware/upload')

router.post('/add', upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'corporateIdCard', maxCount: 1 },
    { name: 'digitalSignature', maxCount: 1 },
  ]),superCorporateAdminController.createSuperAdmin);

  //get all
  router.get('/',superCorporateAdminController.getSuperCorporateAdmins);
  //get by id single user
  router.get('/:id',superCorporateAdminController.getById);
  //update by id 
  router.put('/:id',superCorporateAdminController.update);
  //delete 
  router.delete('/super-corporate-admin/:id',superCorporateAdminController.remove);
  




  module.exports = router;