/* eslint-env jest */
/* eslint-disable no-underscore-dangle */

const { expect } = require('chai');

const request = require('supertest');
const { gatewayObj, serialNumber } = require('./__mock__/gateway');

let gatewayId = '';
let deviceId = '';

describe('Gateway creation', () => {
  it('creating a new gateway with 10 devices', (done) => {
    request('http://localhost:3000')
      .post('/api/gateways')
      .send(gatewayObj)
      .then((res) => {
        const { body } = res;
        gatewayId = body._id;
        deviceId = body.devices[0]._id;
        expect(body.serialNumber).to.equal(serialNumber);
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('serialNumber');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('ip');
        expect(body).to.contain.property('devices');
        done();
      })
      .catch((err) => done(err));
  });

  it('creating a new gateway with 11 devices should return an error', (done) => {
    const newGateway = gatewayObj;
    newGateway.devices.push({
      uid: 11,
      vendor: 'device 11',
      status: 'online',
    });

    request('http://localhost:3000')
      .post('/api/gateways')
      .send(newGateway)
      .then((res) => {
        expect(res.statusCode).to.equal(500);
        done();
      })
      .catch((err) => done(err));
  });

  it('adding device to existing gateway', (done) => {
    const newDevice = {
      uid: 10,
      vendor: 'device 10',
    };

    request('http://localhost:3000')
      .put(`/api/gateways/${gatewayId}/device`)
      .send(newDevice)
      .then((res) => {
        const { body } = res;
        expect(body._id).to.equal(gatewayId);
        done();
      })
      .catch((err) => done(err));
  });

  it('adding 11th device to existing gateway, should return an error', (done) => {
    const newDevice = {
      uid: 11,
      vendor: 'device 11',
    };

    request('http://localhost:3000')
      .put(`/api/gateways/${gatewayId}/device`)
      .send(newDevice)
      .then((res) => {
        expect(res.statusCode).to.equal(500);
        done();
      })
      .catch((err) => done(err));
  });

  it('removing device from a gateway', (done) => {
    request('http://localhost:3000')
      .delete(`/api/gateways/${gatewayId}/device`)
      .send({
        id: deviceId,
      })
      .then((res) => {
        const { body } = res;
        expect(res.statusCode).to.equal(200);
        expect(body._id).to.equal(gatewayId);
        done();
      })
      .catch((err) => done(err));
  });
});
