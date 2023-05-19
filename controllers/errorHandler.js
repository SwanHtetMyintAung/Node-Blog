function errorHandler(path , type ){
    if(type == "required"){
        return `${path} Cannot Be Empty`
    }else if(type == 11000){
        return `Name "${path.name || path.email}" already exist!`
    }
}
module.exports = errorHandler;