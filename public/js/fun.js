var items = 1;
function Click() {
    div = document.getElementById("items");
    button = document.getElementById("add");
    pp = document.getElementById("hid");

    items++;

    newitem = "Факультет " + items + ":<br>";
    arr = pp.innerHTML.split(' ');

    for ( var x = 0 ; x < arr.length-1 ;x++) {
        newitem += arr[x] + "<br>";
        newitem += "<input type=\"text\" name=" + arr[x] + items + "\" size=\"40\"><br>";
    }

    newnode = document.createElement("span");

    newnode.innerHTML=newitem;
    div.insertBefore(newnode,button);
}
