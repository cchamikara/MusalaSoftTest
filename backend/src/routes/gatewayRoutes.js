const express = require('express');
const catchErrors = require('express-catch-errors');
const {
  addDevice,
  create,
  list,
  removeGateway,
  removeDevice,
  view,
} = require('../controllers/gatewayController');

const router = express.Router();

router.route('/').get(catchErrors(list)).post(catchErrors(create));

router.route('/:id').get(catchErrors(view)).delete(catchErrors(removeGateway));

router
  .route('/:id/device')
  .put(catchErrors(addDevice))
  .delete(catchErrors(removeDevice));

module.exports = router;
