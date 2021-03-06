var center_divs = document.getElementsByClassName("centered_div");

for(var i = 0;i < center_divs.length;i++){
    center_divs[i].style.position = "absolute";
    center_divs[i].style.top = window.innerHeight / 2 - center_divs[i].clientHeight / 2;
    center_divs[i].style.left = window.innerWidth / 2 - center_divs[i].clientWidth / 2;
}

function makeDragable(id){
                    var menu = document.getElementById(id);
                    var menu_header = document.getElementById(menu.id + "_header");
                    menu_header.onmousedown = function(event){
                        document.onmousemove = mouseMove;
                    }
                    function mouseMove(event){
                        menu.style.top = event.clientY - (menu_header.clientHeight / 2);
                        menu.style.left = event.clientX - (menu_header.clientWidth / 2);
                    }
                    document.onmouseup = function(event){
                        document.onmousemove = null;
                    }
}

function AddWindow(windowObject){
    var windowSlot = document.getElementById("static_windows");
    var content = "";
    content += "<div id='"+windowObject.id+"' class='static_window' style='width:"+windowObject.width+";height:"+windowObject.height+";'>";
    content += "<div id='"+windowObject.id+"_header' class='static_window_header'>"
    content += "<div class='static_window_icon'>"
    content += "<img src='images/icons/close.ico' style='width:24px;height:24px;;position:absolute;right:0;top:0px;' onclick=\"document.getElementById('"+windowObject.id+"').style.visibility = 'hidden'\">"
    content += "<img src='"+windowObject.icon_dir+"' style='width:24px;height:24px;'>"
    content += "</div>"
    content += "</div>"
    content += "<div id='"+windowObject.id+"_body' class='"
    if(windowObject.center == true){
        content += "center"
    }
    content += "'>"
    if(windowObject.center_elements == true){
        content += "<div><center>"
    }
    for(var i = 0;i < windowObject.content.length;i++){
        if(windowObject.content[i].tag == "input"){
            content += "<input name='"+windowObject.content[i].name+"' type='"+windowObject.content[i].type+"'>"
        }
        if(windowObject.content[i].tag == "button"){
            content += "<button name='"+windowObject.content[i].name+"' onclick='"+windowObject.content[i].onclick+"'>"
            content += windowObject.content[i].content
            content += "</button>"
        }
        if(windowObject.content[i].tag == "script"){
            content += "<script>"+windowObject.content[i].content+"</script>"
        }
        if(windowObject.content[i].tag == "br"){
            content += "<br>"
        }
        if(windowObject.content[i].tag == "label"){
            content += "<label>"+windowObject.content[i].content+"</label>"
        }
    }
    if(windowObject.center_elements == true){
        content += "</center></div>"
    }
    content +="</div>"
    windowSlot.innerHTML += content;
    makeDragable(windowObject.id)
}

AddWindow(premadeWindowObjects.FileAddWindow);