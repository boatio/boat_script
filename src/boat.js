

var Sbigin = []; // "''"
var Sinbig = []; // '""'
var Sbig = [];
var Ssmall = [];
function startcode(code){
    eval(code);
}
function compiler(){
    var Sbigin = []; // "''"
    var Sinbig = []; // '""'
    var Sbig = [];
    var Ssmall = [];

    var state = 0;
    var code = editor.getValue();

    if(true){
        var btcfind = Tfind(code,/(".*?'.*?'.*?")/g,0)
        Sbigin = btcfind[0];
        code = btcfind[1]
        btcfind = Tfind(code,/('.*?".*?".*?')/g,1);
        Sinbig = btcfind[0];
        code = btcfind[1];

        btcfind = Tfind(code,/(".*?")/g,2)
        Sbig = btcfind[0];
        code = btcfind[1];
        btcfind = Tfind(code,/('.*?')/g,3);
        Ssmall = btcfind[0];
        code = btcfind[1];
        delete btcfind;

        

    }
    code = code.split("\n");
    for(var i=0;i<code.length;i++){
        
        if (code[i] == "js::" && state == 0){
            state = 1;

        }
        else if(code[i] == "::js"){
            state = 0;
        }
        else if(code[i].match("for")){
            code[i] = code[i].replace(/for (.*$)/,"for($1){");
            code[i] = code[i].replace("set","var");
            code[i] = code[i].replace(/,/g,";");
        }
        else if(code[i].match("set")){
            code[i] = code[i].replace(/set (.*$)/g,"var $1;");
        }else if(code[i].match("print")){
            if(code[i].match(",line=false")){
                code[i] = code[i].replace(",line=false","");
                code[i] = code[i].replace(/print (.*$)/g,'print($1,1);');    
            }else{  
                code[i] = code[i].replace(/print (.*$)/g,'print($1,0);');  
            }
        }
        else if(code[i].match("end")){
            code[i] = code[i].replace(/end/g,'}');   
        }
        else if(code[i].match("if")){
            code[i] = code[i].replace(/if (.*$)/g,"if($1){");
            code[i] = code[i].replace(/or/g , "||");
            code[i] = code[i].replace(/not/g , "!");
            code[i] = code[i].replace(/and/g,"&&");
        }else if(code[i].match("else if")){
            code[i] = code[i].replace(/if (.*$)/g,"else if($1){");
            code[i] = code[i].replace(/or/g , "||");
            code[i] = code[i].replace(/not/g , "!");
            code[i] = code[i].replace(/and/g,"&&");
        }else if(code[i].match("else")){
            code[i] = code[i].replace(/if (.*$)/g,"else($1){");
            code[i] = code[i].replace(/or/g , "||");
            code[i] = code[i].replace(/not/g , "!");
            code[i] = code[i].replace(/and/g,"&&");
        }else if(code[i].match("function")){
            code[i] = code[i].replace(/function (.*$)/g,"function $1{")
        } 

        if(code[i].match(/fun .*?(.*?).*:.*/g)){
            code[i] = code[i].replace(/fun (.*?):(.*$)/g,"function $1{$2}");
        }   
        
    }


    code = code.join("");
    if(true){
        code = Tback(code,Sbigin,0);
        code = Tback(code,Sinbig,1);
        code = Tback(code,Sbig,2);
        code = Tback(code,Ssmall,3);
    }
    console.log(code);
    startcode(code);
    
}





function extractVars(myRe, str){
    var missingVars = [];
    while ((results = myRe.exec(str)) !== null) {
        missingVars.push(results[1]);
    }
    return missingVars;
}
function Tfind(data,regex,x){
    var vars = extractVars(regex, data);
    if(x==0){
        for(var i=0;i<vars.length;i++){
            data = data.replace(vars[i],"$btc["+i+"]");
        }
    }else if(x==1){
        for(var i=0;i<vars.length;i++){
            data = data.replace(vars[i],"$bts["+i+"]");
        }
    }
    else if(x==2){
        for(var i=0;i<vars.length;i++){
            data = data.replace(vars[i],"$bct["+i+"]");
        }
    }
    else if(x==3){
        for(var i=0;i<vars.length;i++){
            data = data.replace(vars[i],"$bst["+i+"]");
        }
    }

    return [vars,data];
}
function Tback(data,sign,x){
    if(x==0){
        sign.map(function(val,i){
            data = data.replace("$btc["+i+"]",val);
        });
    }
    if(x==1){
        sign.map(function(val,i){
            data = data.replace("$bts["+i+"]",val);
        });
    }
    if(x==2){
        sign.map(function(val,i){
            data = data.replace("$bct["+i+"]",val);
        });
    }
    if(x==3){
        sign.map(function(val,i){
            data = data.replace("$bst["+i+"]",val);
        });
    }
    return data;
    
}

