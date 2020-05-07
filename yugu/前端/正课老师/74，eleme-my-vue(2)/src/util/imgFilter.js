

String.prototype.insert = function(index,str){
    //"abcdefg"
    let s1 = this.substring(0,index);
    let s2 = this.substr(index);
    return s1 + str +s2;
}



function imgFilter(hash){
    // 7d8a867c870b22bc74c87c348b75528djpeg

    // https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/resize,w_90,h_90,m_fixed

    let url = hash.insert(1,"/");
    url = url.insert(4,"/");
    if(url.endsWith("jpeg")){
        url = url + ".jpeg"
    }else if(url.endsWith("png")){
        url = url + ".png"
    }else if(url.endsWith("jpg")){
        url = url + ".jpg"
    }

    return `https://cube.elemecdn.com/${url}?x-oss-process=image/resize,w_90,h_90,m_fixed`;
}

export default imgFilter;