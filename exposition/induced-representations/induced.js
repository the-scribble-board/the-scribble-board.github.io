function chooseFormulation() {
    var choice=document.getElementById("language").value;
    var options=["actions","homomorphisms","modules"];

    for (var i of options){
        if (i==choice){
            document.getElementById(i).classList.remove("hide");
            document.getElementById("nav-"+i).classList.remove("hide");
        }
        else {
            document.getElementById(i).classList.add("hide");
            document.getElementById("nav-"+i).classList.add("hide");
        }
    }
}

window.addEventListener('scroll', () => {
    var choice=document.getElementById("language").value;
    var options=["actions","homomorphisms","modules"];

    var i = options.findIndex((element) => choice==element);
    var anchors = document.getElementsByClassName('h2-'+i);
    
    const links = document.querySelectorAll('.navigation-'+ choice+' a');

    if (typeof(anchors) != 'undefined' && anchors != null && typeof(links) != 'undefined' && links != null) {
        let scrollTop = window.scrollY;
    
        // highlight the last scrolled-to: set everything inactive first
        links.forEach((link, index) => {
            link.classList.remove('highlight');
        });
    
        // then iterate backwards, on the first match highlight it and break
        for (var i = anchors.length-1; i >= 0; i--) {
            if (scrollTop > anchors[i].offsetTop-250) {
                links[i].classList.add('highlight');
                break;
            }
        }
    }
});

window.addEventListener("DOMContentLoaded", chooseFormulation());