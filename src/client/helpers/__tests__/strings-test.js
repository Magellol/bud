import { expect } from 'chai';
import { ucfirst } from '../strings';

describe('Strings', function () {
  describe('ucfirst', function () {
    it('Should throw an error when the argument is not a string', function () {
      expect(() => ucfirst(false)).to.throw(
        Error,
        'ucfirst() can only work with strings directly. ' +
        'Received "boolean" instead.'
      );
    });

    it('Should return a uppercases first character', function () {
      const result = ucfirst('salut, ca va?');
      expect(result).to.be.equal('Salut, ca va?');
    });
  });
});
