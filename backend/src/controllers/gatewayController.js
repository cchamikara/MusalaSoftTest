const Gateway = require('../models/gatewayModel');
const { DEVICE_LIMIT } = require('../config/config');

/**
 * Create new gateway
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.create = async (req, res) => {
  const deviceCount = (req.body.devices || []).length;
  if (deviceCount <= DEVICE_LIMIT) {
    const gateway = new Gateway(req.body);
    await gateway.save();

    res.json(gateway);
  } else {
    throw new Error(
      `You got ${deviceCount} devices but only ${DEVICE_LIMIT} devices allowed for a gateway`,
    );
  }
};

/**
 * List all the gateways
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.list = async (req, res) => {
  const gateways = await Gateway.find();

  res.json(gateways);
};

/**
 * Get gateway by Id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.view = async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);

  res.json(gateway);
};

/**
 * Remove gateway by id
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.removeGateway = async (req, res) => {
  await Gateway.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

/**
 * Add new device to a given gateway
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.addDevice = async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);
  if ((gateway.devices || []).length < DEVICE_LIMIT) {
    gateway.devices.push(req.body);
    await gateway.save();
    res.json(gateway);
  } else {
    throw new Error(
      `Peripheral device limit ${DEVICE_LIMIT} is exceeded for the gateway`,
    );
  }
};

/**
 * Remove device for a given gateway id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.removeDevice = async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);
  const { id: deviceId } = req.body;
  const device = gateway.devices.id(deviceId);
  if (device) {
    device.remove();
    await gateway.save();
    res.json(gateway);
  } else {
    throw new Error('Device id does not exist');
  }
};
