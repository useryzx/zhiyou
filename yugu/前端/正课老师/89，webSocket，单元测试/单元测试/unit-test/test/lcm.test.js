
const lcm = require("../utils/lcm.js");
const assert = require("assert");

describe("开始lcm.js测试",function(){

    it("4和6的最小公倍数是12",function(){
        assert.equal(lcm(4,6),12);
    });

    

});