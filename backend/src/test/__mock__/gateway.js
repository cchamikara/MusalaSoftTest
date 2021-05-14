const { v4: uuid } = require('uuid');

const serialNumber = uuid();

const gatewayObj = {
  serialNumber,
  name: 'Gateway unit test',
  ip: '172.16.254.1',
  devices: [
    {
      uid: 1,
      vendor: 'apple',
      status: 'online',
    },
    {
      uid: 2,
      vendor: 'google',
      status: 'online',
    },
    {
      uid: 3,
      vendor: 'ibm',
    },
    {
      uid: 4,
      vendor: 'apple',
      status: 'online',
    },
    {
      uid: 5,
      vendor: 'google',
      status: 'online',
    },
    {
      uid: 6,
      vendor: 'ibm',
    },
    {
      uid: 7,
      vendor: 'google',
      status: 'online',
    },
    {
      uid: 8,
      vendor: 'ibm',
    },
    {
      uid: 9,
      vendor: 'ibm',
    },
  ],
};

module.exports = { gatewayObj, serialNumber };
