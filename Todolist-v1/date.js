exports.getDate = function(){
    const date = new Date();
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long" 
    };
    return date.toLocaleString("en-US", option);
}
exports.getDay = function getDay(){
    const date = new Date();
    const option = {
        weekday: "long",
    };
    return date.toLocaleString("en-US", option);
}


