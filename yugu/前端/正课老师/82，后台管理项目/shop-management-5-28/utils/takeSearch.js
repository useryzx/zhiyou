// takeSearch

module.exports = function(params,searchArr){
    const searchObj = {};
    searchArr.forEach(el => {
        if(params[el]!=undefined){
            searchObj[el] = params[el];
        }
    });

    return searchObj;
}