const express = require('express');
const multer = require('multer');
const carController = require('../controller/carController');
// const authenticateAdmin = require('../middlewares/authMiddleware');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

router.post('/', upload.single('image'), carController.createcar);
// router.post('/', carController.createcar);
router.get('/', carController.getcars);
router.get('/:id', carController.getcarById);
router.put('/:id', upload.single('image'), carController.updatecar);
router.delete('/:id', carController.deletecar);

module.exports = router;
