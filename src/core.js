var editor = ace.edit("editor");


editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/text");


editor.setOptions({
    fontSize: "20pt"
});
document.getElementById("terminal").style.height = "400px";
function selectorclick(){
    var count = document.getElementById("seletor").value;
    if(count == "1"){
        document.getElementById("terminal").style.height = "300px";
    }else if(count == "2"){
        document.getElementById("terminal").style.height = "400px";
    }else if(count == "3"){
        document.getElementById("terminal").style.height = "500px";
    }else if(count == "4"){
        document.getElementById("terminal").style.height = "700px";
    }
}