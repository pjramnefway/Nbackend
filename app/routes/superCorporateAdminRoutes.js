const express = require('express');
const router = express.Router();
const superCorporateAdminController = require('../controller/superCorporateAdminController');
const upload = require('../middleware/upload')

router.post('/add-super-admin', upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'corporateIdCard', maxCount: 1 },
    { name: 'digitalSignature', maxCount: 1 },
  ]),superCorporateAdminController.createSuperAdmin);


  router.get('/super_corporate_admin',superCorporateAdminController.getSuperCoporateAdmin);
  router.get('/:id',superCorporateAdminController.getById);
  router.put('/:id',superCorporateAdminController.update);
  router.delete('/super-corporate-admin/:id',superCorporateAdminController.remove);
  




  module.exports = router;