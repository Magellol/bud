import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import { get, post } from '../requests';

const endpoint = '/hello/world';

describe('Requests', function () {
  afterEach(() => fetchMock.restore());

  describe('get', function () {
    it('Should fetch and return a promise', function () {
      fetchMock.get(endpoint, {
        body: { success: true }
      });

      return get(endpoint)
        .then(result => (
          expect(result).to.be.deep.equal({
            success: true
          })
        ));
    });
  });

  describe('post', function () {
    it('Should post and return a promise', function () {
      fetchMock.post(endpoint, {
        body: { success: true }
      });

      return post(endpoint)
        .then(result => (
          expect(result).to.be.deep.equal({
            success: true
          })
        ));
    });
  });
});
