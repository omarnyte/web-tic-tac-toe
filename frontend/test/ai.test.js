import * as ai from '../../public/scripts/ai';

const chai = require('chai');
const assert = chai.assert;

describe('testing ai.js', function() {
  context('isAI', function() {
    it('return true when current player is AI', function() {
      const playersState = {
        "currentPlayerMark": "O",
        "O": "ai",
        "X": "human"
      }

      assert.true(ai.isAi(playersState));
    });
  });

});
