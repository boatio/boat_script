function print(text,type){
    if(type==0){
        document.getElementById("console").innerHTML += text+'<br>';
        console.log(text);
    }else if(type==1){
        document.getElementById("console").innerHTML += text;
    }
    
}