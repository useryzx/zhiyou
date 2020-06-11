//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        score:99
    },

    scoreChange(e){
        // console.log(e);

        this.setData({
            score:e.detail
        })
    }

})
