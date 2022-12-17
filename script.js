
let create=document.querySelector(".create");
let main=document.querySelector(".main");
let colorsDiv=document.querySelectorAll(".color");
let arr=[];
let url=`https://random-flat-colors.vercel.app/api/random?count=5`;
let colors=[];
fetch(url).then(response =>(response.json())).then((data)=>{
    colors=data.colors;
    for(let i=0;i<colorsDiv.length;i++){
        colorsDiv[i].style.backgroundColor=colors[i];
        colorsDiv[i].style.accentColor=colors[i];
    } 
});

document.querySelectorAll(".color").forEach((color)=>{
    color.addEventListener("click",(event)=>{
        diselectAlll();
        color.style.border="2px solid black";
        filterBGCreatives(color.style.backgroundColor);
        
    });
    
})
let filteredArr=[];
function filterBGCreatives(bgcolor){
    
    filteredArr=arr.filter((obj)=>{
        return obj["backgroundColor"]==bgcolor;
    });
    document.querySelector(".creatives").innerHTML="";
    show(filteredArr);
    filteredArr=[];
    

}

function diselectAlll(){
    document.querySelectorAll(".color").forEach((color)=>{
        color.style.border="1px solid black";
    });
}

function filteredCreatives(text){
    filteredArr=arr.filter((obj)=>{
        return (obj["title"].includes(text)) || (obj["subtitle"].includes(text));
    });
    show(filteredArr);
}
document.getElementById("search").addEventListener("keyup",function(){
    let text=document.getElementById("search");
    if(text==""){
        show(arr);
    }else{
        filteredCreatives(text.value);
        //text.value="";

    }
});

function resize() {
    if(screen.width<830){
        if(create.style.display=="flex"){
            main.style.width="0%";
            main.style.display="none";
            
            create.style.width="100%";
        }else{
            main.style.display="flex";
            main.style.width="100%";
            create.style.width="0%";
        }
    }else{
        if(create.style.display=="flex"){
            main.style.display="flex";
            main.style.width="65%";
            create.style.width="100%";
        }else{
            main.style.display="flex";
            main.style.width="35%";
            create.style.width="0%";
        }
    }
}
window.addEventListener("resize", resize);

document.getElementById("add").addEventListener("click",function(){
    //alert("hii");
    create.style.display="flex";
    resize();
    if(screen.width<830){
        create.style.width="100%";
    }else{
        create.style.width="35%";
    }
    
    document.getElementById("add").disabled=true;
    let coloursDiv=document.querySelectorAll(".colour");

    for(let i=0;i<coloursDiv.length;i++){
        coloursDiv[i].style.backgroundColor=colors[i];
    } 
});

document.getElementById("close").addEventListener("click",function(){
    
    create.style.display="none";
    main.style.display="flex";
    create.style.width="0vw";
    document.getElementById("add").disabled=false;

});
let selectedColor="";
document.querySelectorAll(".colour").forEach((colour)=>{
    colour.addEventListener("click",(event)=>{
        diselectAll();
        selectedColor=event.target.style.backgroundColor;
        //alert(selectedColor);
        event.target.style.border=`2px solid black`;
        
    });
});

document.querySelectorAll(".colour").forEach((colour)=>{
    colour.addEventListener("mouseover",(event)=>{
        event.target.style.border=`2px solid black`;
    });
});
document.querySelectorAll(".colour").forEach((colour)=>{
    colour.addEventListener("mouseleave",(event)=>{
        if(selectedColor!=event.target.style.backgroundColor)
            event.target.style.border=`1px solid black`;
    });
});

function diselectAll(){
    let allColor=document.querySelectorAll(".colour");
    for(let i=0;i<5;i++){
        allColor[i].style.border="1px solid black";
    }
}


document.getElementById("done").addEventListener("click",function(){
    if(!isValid()){
        return;
    }



    create.style.display="none";
    create.style.width="0vw";
    resize();
    
    document.getElementById("add").disabled=false;
    
    let title=document.getElementById("title").value;
    let subtitle=document.getElementById("subtitle").value;
    let obj={
        "title":title,
        "subtitle":subtitle,
        "backgroundColor":selectedColor
    }
    arr.push(obj);
    show(arr);
    document.getElementById("title").value="";
    document.getElementById("subtitle").value="";
    diselectAll();
    selectedColor="";
    let curr=document.querySelector(".progress").style.width;
    //alert(arr.length/5);
    document.querySelector(".progress").style.width=parseFloat((arr.length)*100/5)+"%";
    document.querySelector(`label[for="progress"]`).innerHTML=arr.length+"/5 Creatives";
    if(arr.length==5){
        document.getElementById("add").disabled=true;
    }
});

function show(arr){
    let creatives=document.querySelector(".creatives");
    creatives.innerHTML="";
    for(let i=0;i<arr.length;i++){
        let creative=document.createElement("div");
        creative.className="creative";
        creative.style.backgroundColor=arr[i]["backgroundColor"];
        let titleDiv=document.createElement("div");
        let subtitleDiv=document.createElement("div");
        titleDiv.innerText=arr[i]["title"];
        subtitleDiv.innerText=arr[i]["subtitle"];
        creative.style.width="500px";
        creative.appendChild(titleDiv);
        creative.appendChild(subtitleDiv);
        creatives.appendChild(creative);
    }
    
}

function isValid(){
    let title=document.getElementById("title").value;
    let subtitle=document.getElementById("subtitle").value;
    if(title==""){
        alert(`Title cannot be Empty`);
        return false;
    }else if(subtitle==""){
        alert(`Subtitle cannot be Empty`);
        return false;
    }else if(selectedColor==""){
        alert(`Please select background color`);
        return false;
    }
    return true;
}


