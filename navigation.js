window.addEventListener('scroll', () => {
    const anchors = document.querySelectorAll('h2');
    const links = document.querySelectorAll('.navigation a');
    const pageProgressBar = document.querySelector(".progress-bar")

    try {
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
    } catch (e) {
        if (e instanceof TypeError) {
            // do nothing
        } else {
          throw e;
        }
    }

    var scrolledPercentage = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight))*100;
    pageProgressBar.style.width = `${scrolledPercentage}%`;
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const footnoteTriggers = document.querySelectorAll('.footnote-trigger');

    footnoteTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            footnoteTriggers.forEach(t => t.classList.remove('active'));
            this.classList.toggle('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.footnote-trigger')) {
            footnoteTriggers.forEach(trigger => {
                trigger.classList.remove('active');
            });
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            footnoteTriggers.forEach(trigger => {
                trigger.classList.remove('active');
            });
        }
    });
});


function switchThemes(){
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    var activeTheme=body.getAttribute('data-theme');
    if (activeTheme=='light'){
        body.setAttribute('data-theme','dark');
        themeToggle.textContent = '☀️ Light';
    }
    else{
        body.setAttribute('data-theme','light');
        themeToggle.textContent = '🌙 Dark';
    }
}