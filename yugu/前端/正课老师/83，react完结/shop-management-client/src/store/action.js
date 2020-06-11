

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

function setGoodList(v){
    return {
        type:"SET_GOOD_LIST",
        value:v
    }
}

function setUserList(v){
    return {
        type:"SET_USER_LIST",
        value:v
    }
}

function setSwiperList(v){
    return {
        type:"SET_SWIPER_LIST",
        value:v
    }
}

function setOrderList(v){
    return {
        type:"SET_ORDER_LIST",
        value:v
    }
}



export {
    setIsLoading,
    setUserInfo,
    setCateList,
    setGoodList,
    setUserList,
    setSwiperList,
    setOrderList
}

