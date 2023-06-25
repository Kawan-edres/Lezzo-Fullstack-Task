const express = require('express');
const router = express.Router();
const { createStore, getAllStores, getSingleStore, deleteStore, updateStore } = require('../controllers/stores');

router.route('/').get(getAllStores).post(createStore);
router.route('/:storeId').get(getSingleStore).delete(deleteStore).put(updateStore);

module.exports = router;
