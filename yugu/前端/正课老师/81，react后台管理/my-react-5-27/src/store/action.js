

function setIsLoading(v){
    return {
        type:"SET_IS_LOADING",
        value:v
    }
}

function setUserInfo(v){
    return {
        type:"SET_USER_INFO",
        value:v
    }
}



function setCateList(v){
    return {
        type:"SET_CATE_LIST",
        value:v
    }
}




export {
    setIsLoading,
    setUserInfo,
    setCateList
}

