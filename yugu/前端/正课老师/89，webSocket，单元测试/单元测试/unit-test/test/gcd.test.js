
const gcd = require("../utils/gcd");
const assert = require("assert");

describe("开始gcd.js测试",function(){
    describe("开始gcd函数测试",function(){

        // 通过it添加测试用例
        it("m=319,n=377时，应该返回29",function(){
            assert.equal(gcd(319,377),29);
        });

        it("m=100,n=100时，应该返回100",function(){
            assert.equal(gcd(100,100),100);
        });

        it("m=100,n=50时，应该返回50",function(){
            assert.equal(gcd(100,50),50);
        });

        it("m=37,n=51时，应该返回1",function(){
            assert.equal(gcd(37,51),1);
        });


        it("m=10.8,n=6.6时，应该抛出异常",function(){
            assert.throws(function(){
                gcd(10.8,6.6);
            });
        });


    });


    // describe("开始.....测试",function(){

    // });
});