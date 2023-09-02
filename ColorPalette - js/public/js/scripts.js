const form= document.querySelector("#color-form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    getColors()
    
})

function getColors(){
    const query = form.elements.input_description.value;
    console.log('scripts', query)
    fetch ("/palette", {
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
            query:query
        })
    })
    .then((response)=>response.json())
    .then(data=>{
        console.log("LINE22", data)
        const colors = data.colors;
        const container = document.querySelector(".container");
        createColorBoxes(colors, container)
    })
}

function createColorBoxes(colors, container){
    container.innerHTML="";
        for (const color of colors){
            // Assigns color to element div
            const div = document.createElement("div");
            div.classList.add('color');
            div.style.backgroundColor=color;
            div.style.width=`calc(100%/${colors.length})`

            // Copies to clipboard the name of the color
            div.addEventListener("click", function(){
                navigator.clipboard.writeText(color)
            })

            // Names the block with the color code
            const span=document.createElement("span");
            span.innerText=color;
            div.appendChild(span)
            container.appendChild(div);

        }
  
}