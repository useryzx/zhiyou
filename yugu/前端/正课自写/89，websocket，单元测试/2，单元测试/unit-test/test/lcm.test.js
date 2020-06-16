const assert = require('assert');
const lcm = require('../utils/lcm')
describe('开始lcm.js测试', function () {
  it('100,4得到4', function () {
    assert.equal(lcm(100, 4), 4);
  })
})