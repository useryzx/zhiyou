const gcd = require("../utils/gcd");
const assert = require("assert");
describe("开始gcd.js测试", function () {
    describe("开始gcd函数测试", function () {
        it("m=319,n=377时，应该返回29", function () {
            assert.equal(gcd(319, 377), 29);
        });
        it("m=100,n=100时，应该返回100", function () {
            assert.equal(gcd(100, 100), 100);
        });
        it("m=100.5,n=50.5时，应该抛出异常", function () {
            assert.throws(gcd(100.5, 50.5));
        });
        
    });
});