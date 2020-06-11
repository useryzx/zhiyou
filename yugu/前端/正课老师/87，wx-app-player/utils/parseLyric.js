export default function(lyric){
    if(!lyric){
        return [
            {
                time:10000,
                txt:"本歌曲没有歌词"
            }
        ]
    }


    let reg1 = /(\[\d\d:\d\d\.\d{1,4}\]){1,}(.*)/g;
    let r1 = null;
    let arr = [];

    while(r1 = reg1.exec(lyric)){
        // console.log(r1);
        let reg2 = /\[(\d\d):(\d\d\.\d{1,4})\]/g;
        let r2 = null;
        while(r2 = reg2.exec(r1[0])){
            let time = r2[1]*60+r2[2]*1;
            arr.push({
                time:time,
                txt:r1[2]||"---"
            });
        }
    }

    arr.sort((e1,e2)=>{
        if(e1.time>e2.time){
            return 1;
        }else if(e1.time<e2.time){
            return -1;
        }else{
            return 0;
        }
    });

    console.log(arr);

    return arr;
}