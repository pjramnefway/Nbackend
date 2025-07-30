// middlewares/multerConfig.js
const multer = require('multer');
const path = require('path');

// Map field names to folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = 'uploads/';
    switch (file.fieldname) {
      case 'profilePhoto':
        dest += 'profile_photos';
        break;
      case 'idProof':
        dest += 'gov_id_cards';
        break;
      case 'corporateIdCard':
        dest += 'corporate_id_cards';
        break;
      case 'digitalSignature':
        dest += 'digital_signatures';
        break;
      default:
        dest += 'others';
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDFs are allowed'), false);
  }
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

module.exports = upload;
