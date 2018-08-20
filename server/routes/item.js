const router = require('express').Router()
const images = require('../helpers/image.js')
const { addItem, removeItem, updateItem, getAllitem, getOneItem } = require('../controllers/item-controller')


router.get('/:id', getOneItem)
router.get('/', getAllitem)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', removeItem)

router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router