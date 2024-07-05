var initHoverEffects = ()=>{};
var setFirstAndLastElement = ()=>{};


document.addEventListener("DOMContentLoaded", function(){


    setFirstAndLastElement = function(){
        let navBar = document.getElementById("navigationBar");
        let list = [];
        for(let i = 0; i < navBar.children.length; i++){
            list.push(navBar.children[i]);
        }

        for(let i = 0; i < list.length; i++){
            if(["profile", "moveElement"].includes(list[i].id)){
                list.splice(i, 1);
            }
        }

        for(let i = 0; i < list.length; i++){
            if(i == 0){
                list[i].classList.add("firstElement");
            }else if(i == list.length - 1){
                list[i].classList.add("lastElement");
            }
        }
    };

    initClickListenerForMenuButtons = function(){
        let navBar = document.getElementById("navigationBar");
        let list = [];
        for(let i = 0; i < navBar.children.length; i++){
            list.push(navBar.children[i]);
        }

        for(let i = 0; i < list.length; i++){
            if(["profile", "moveElement"].includes(list[i].id)){
                list.splice(i, 1);
            }
        }

        for(let i = 0; i < list.length; i++){
            list[i].addEventListener("click", function(){
                hideMenu();
            });
        }
    };


    initHoverEffects = function(){
        var firstElement = document.querySelector(".firstElement");
        var menu = document.getElementById("btnMenu");
        var profile = document.getElementById("profile");
        firstElement.addEventListener("mouseover", function(){
            menu.classList.add("hoverByFirstElement");
            profile.classList.add("hoverByFirstElement");
        });

        firstElement.addEventListener("mouseout", function(){
            menu.classList.remove("hoverByFirstElement");
            profile.classList.remove("hoverByFirstElement");
        });

        let observer = new MutationObserver(function(mutations){
            mutations.forEach(function(mutation){
                if(mutation.type == "attributes"){
                    if(mutation.attributeName == "selected"){
                        if(firstElement.hasAttribute("selected")){
                            menu.classList.add("selectedByFirstElement");
                            profile.classList.add("selectedByFirstElement");
                        }else{
                            menu.classList.remove("selectedByFirstElement");
                            profile.classList.remove("selectedByFirstElement");
                        }
                    }
                }
            });
        });
        observer.observe(firstElement, {attributes: true});
    }
    
});
