function artistsFilter(artists){
    return artists.map(function(el){
        return el.name;
    }).join();
}

export default artistsFilter;