window.onload = function () {
    const isSmall = window.matchMedia('only screen and (max-width: 800px)').matches;
    const isVertical = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    const mobileAgent = typeof window.orientation !== 'undefined'
    const isMobile = isSmall || isVertical || mobileAgent;
    const aspRatio = window.innerWidth / window.innerHeight;
    var small = false;
    var a = document.querySelectorAll('a');
    console.log(aspRatio);
    if (aspRatio < 1.25) {
        const sm = document.getElementById('small');
        sm.classList.add('showScreenWarning');
        small = true;
    }
    console.log(isMobile);
    if (isMobile) {
        document.documentElement.style.setProperty("--background-color", '#43e');
        var content = document.getElementById('content');
        content.remove();
        var content = document.getElementById('nav-menu');
        content.remove();
        var mobileMain = document.createElement("main");
        mobileMain.id = "mobile-main";
        mobileMain.innerHTML = "<div class='mobile-div glow-section' id='mobile-div'><a href='#'>Astrogamer54.com</a><h1>we ran into a problem :(</h1><h1>your screensize is too small for this website</h1></div>";
        document.body.appendChild(mobileMain);
        document.body.id = "nav-menu"; // scuffed work around
    }

    if (!isMobile) {
        var prevScrollpos = document.querySelector('#content').scrollTop;
        document.querySelector('#content').addEventListener('scroll', (event) => {
            parallax();
            var currentScrollPos = document.querySelector('#content').scrollTop;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("nav-menu").style.transform = "translate(0%,0%)";
            } else {
                document.getElementById("nav-menu").style.transform = "translate(0%,-100%)";
            }
            prevScrollpos = currentScrollPos;
            if (currentScrollPos > 0) {
                void document.getElementById("scroll-icon").offsetWidth;
                document.getElementById("scroll-icon").classList.remove("ico-appear");
                document.getElementById("scroll-icon").classList.add("scrolled");
            } else {
                void document.getElementById("scroll-icon").offsetWidth;
                document.getElementById("scroll-icon").classList.remove("scrolled");
                document.getElementById("scroll-icon").classList.add("ico-appear");
            }

        });
    }


    if (document.readyState === 'ready' || document.readyState === 'complete') {
        hideSplash();
    } else {
        document.onreadystatechange = function () {
            if (document.readyState == "complete") {
                hideSplash();
            }
        }
    }
    let effectcheck;
    document.getElementById('nav-menu').onmousemove = function clickEvent(e) {
        for (const nav of document.getElementsByClassName("glow-section")) {
            const rect = nav.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            nav.style.setProperty("--mouse-x", `${x}px`);
            nav.style.setProperty("--mouse-y", `${y}px`);
        };
    };
    document.getElementById('nav-menu').onmouseenter = function fade(e) {
        if (!isMobile) {
            var max = 100;
            for (const nav of document.getElementsByClassName("glow-section")) {
                if (!effectcheck) {
                    effectcheck = setInterval(repeatcheck, 1);
                }

                function repeatcheck() {
                    if (max > 0) {
                        max = max - 1
                    } else {
                        clearInterval(effectcheck);
                    }
                    document.documentElement.style.setProperty("--glow-percent", `${100 - max}%`);

                };
            };
        }

    };
    document.getElementById('nav-menu').onmouseleave = function fadebye(e) {
        clearInterval(effectcheck);
        var max = 100;
        effectcheck = null;
    };
    document.getElementById('nav-menu').onclick = function fadee(e) {
        let effectcheck;
        if (isMobile) {
            var max = 100;
            for (const nav of document.getElementsByClassName("glow-section")) {
                if (!effectcheck) {
                    effectcheck = setInterval(repeatcheck, 1);
                };

                function repeatcheck() {
                    if (!(max == 0)) {
                        max = max - 2;
                        console.log(max);
                    } else {
                        console.log(max);
                        clearInterval(effectcheck);
                    };
                    document.documentElement.style.setProperty("--glow-percent", `${100 - max}%`);

                };
            };
        };
        document.addEventListener('contextmenu', event => event.preventDefault());
    };

    function hideSplash() {
        if (small == true) {
            var time = 3000;
        } else {
            var time = 1000;
        }
        setTimeout(() => {
            document.getElementById('splash').classList.add('doneLoading');
            for (const nav of document.getElementsByClassName("nav-links")) {
                nav.classList.add('nav-loaded')
            }
            document.getElementById("title").classList.add("title-loaded");
            const titleLetters = document.getElementsByClassName("title-letter")
            for (const element of titleLetters) {
                element.classList.add("title-letter-loaded");
            }
            setTimeout(() => {
                var splash = document.getElementById('splash');
                splash.remove();
            }, 1000)
            setTimeout(() => {
                const titleLetters = document.getElementsByClassName("title-letter")
                for (const element of titleLetters) {
                    element.classList.remove("title-letter-loaded");
                }
            }, 1200)
            setTimeout(() => {
                const a = document.getElementById('content');
                a.classList.remove('no-scroll');
                const ico = document.getElementById('scroll-icon');
                ico.classList.add('ico-appear');
            }, 2200)
        }, time)

    }
    function staggerTitle() {
        const letters = document.getElementsByClassName('title-letter');
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.transitionDelay = `${i * 50}ms`
        }
    }
    staggerTitle();
    function parallax() {
        var s = document.getElementById("title");
        var yPos = 0 - (document.querySelector('#content').scrollTop) / 20;
        s.style.top = yPos + "%";
    }

    var cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
    });
    a.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    })
};