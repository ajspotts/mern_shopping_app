const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc  GET ALL items
// @access Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route GET api/items/:id
// @desc  GET An item
// @access Public

router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
});

// @route POST api/items
// @desc  Create An item
// @access Private

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save()
    .then(item => res.json(item));
});

// @route PUT api/items
// @desc  Update An item
// @access Private

router.put('/:id', auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => res.json(item))
    .catch(err => res.status(404).json({success: false}));
})

// @route DELETE api/items/:id
// @desc  Delete An item
// @access Private

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})


module.exports = router;
