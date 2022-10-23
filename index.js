window.onload = function () {
    window.onscroll = function () {
        console.log("a");
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav-menu").style.transform = translate('0%', '0%');
        } else {
            document.getElementById("nav-menu").style.top = translate('0%', '100%');
        }
        prevScrollpos = currentScrollPos;
    
    };  
    let clearcheck;
    var prevScrollpos = window.pageYOffset;
    document.getElementById('nav-menu').onmousemove = function clickEvent(e) {
        for (const nav of document.getElementsByClassName("nav-section")) {
            const rect = nav.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            nav.style.setProperty("--mouse-x", `${x}px`);
            nav.style.setProperty("--mouse-y", `${y}px`);
        };

    };
    document.getElementById('nav-menu').onmouseenter = function fade(e) {
        var max = 100;
        for (const nav of document.getElementsByClassName("nav-section")) {
            if (!clearcheck) {
                clearcheck = setInterval(repeatcheck, 1);
            }
            function repeatcheck() {
                if (max > 0) {
                    max = max - 1
                } else {
                    clearInterval(clearcheck);
                    console.log('a');
                }
                document.documentElement.style.setProperty("--glow-percent", `${100 - max}%`);
                console.log(max);

            };
        };
    };
    document.getElementById('nav-menu').onmouseleave = function fade(e) {
        clearInterval(clearcheck);
        var max = 100;
        clearcheck = null;
    };
    document.addEventListener('contextmenu', event => event.preventDefault());
};
