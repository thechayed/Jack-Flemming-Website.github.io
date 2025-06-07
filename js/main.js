// Device dependent properties
const desktopHeadHeight = 64;
const mobileHeadHeight = 128;

const desktopNavFontSize = 1.25;
const mobileNavFontSize = 3.5;

const desktopFontSize = 0.9;
const mobileFontSize = 1.5;

// Get the root element
var root = document.documentElement;

if(isMobile)
{
    root.style.setProperty("--header-height", mobileHeadHeight + "px");
    root.style.setProperty("--nav-font-size", mobileNavFontSize + "px");
    root.style.setProperty("--font-size", mobileFontSize + "px");
}

var content = document.querySelectorAll("content")[0];
var header = document.querySelectorAll("header")[0];
var socialsContainer = document.querySelectorAll("socials")[0];
var headshotElement = document.getElementById("Headshot");
var headerLogo = document.getElementById("Header Logo");

var socialLinkElements = document.querySelectorAll('sociallink');
var galleryElements = document.querySelectorAll('gallery');
var productionElements = document.querySelectorAll('production');
var galleryItemElements = document.querySelectorAll('galleryitem');
var navLinkElements = document.querySelectorAll('a');
var testimonyElements = document.querySelectorAll('testimony');

var posterContainerElements = [];
var focusedPoster;
var previousScrollY;

// Create the Blackout for the poster to dim the rest of the screen
var posterBlackout = document.createElement('blackout');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
    {
        if(!entry.isIntersecting && (entry.target.matches(":hover") | entry.target.matches(":focus")))
            entry.target.blur();
    });
});

// Create the Gallery Items
galleryItemElements.forEach(element =>
{
    // Create the Poster as a Link Element so that the user can select it and copy it's location
    var posterContainer = document.createElement('a');
    element.appendChild(posterContainer);
    posterContainer.setAttribute('class', 'poster-container');
    posterContainer.setAttribute('href', '#Work_'+element.getAttribute('title').replace(/ /g, ''));
    posterContainer.setAttribute('id', 'Work_'+element.getAttribute('title').replace(/ /g, ''));
    posterContainerElements.push(posterContainer);

    // Disable clicking on a poster redirecting the site
    element.addEventListener('click', function(e)
    {
        e.preventDefault();
        focusedPoster = posterContainer;
    })
    // Disable clicking on a poster redirecting the site
    element.addEventListener('touchstart', function(e)
    {
        focusedPoster = posterContainer;
    })

    observer.observe(posterContainer);

    // Create the Poster Clamp to cut off the edges of the Poster
    var posterClamp = document.createElement('div');
    posterContainer.appendChild(posterClamp);
    posterClamp.setAttribute('class', 'poster-clamp');

    
    var posterIMG = document.createElement('img');
    posterClamp.appendChild(posterIMG);
    posterIMG.setAttribute('class', 'poster');
    posterIMG.src = './assets/posters/'+element.getAttribute('title').replace(":", "")+'.jpg';

    var posterDescritionContainer = document.createElement('div');
    posterClamp.appendChild(posterDescritionContainer);
    posterDescritionContainer.setAttribute('class', 'poster-description-container');

    var descriptionTitle = document.createElement('h3');
    posterDescritionContainer.appendChild(descriptionTitle);
    descriptionTitle.setAttribute('class', 'poster-description-title');
    descriptionTitle.textContent = element.getAttribute('title');

    var descriptionProducer = document.createElement('h4');
    posterDescritionContainer.appendChild(descriptionProducer);
    descriptionProducer.setAttribute('class', 'poster-description-producer');
    descriptionProducer.textContent = element.getAttribute('producer');


    var descriptionJobTitle = document.createElement('h5');
    posterDescritionContainer.appendChild(descriptionJobTitle);
    descriptionJobTitle.setAttribute('class', 'poster-description-job-title');
    descriptionJobTitle.textContent = element.getAttribute('job');
});

socialLinkElements.forEach(element =>
{
    var linkElement = document.createElement('a');
    element.appendChild(linkElement);
    linkElement.setAttribute('href', element.getAttribute("href"));
    linkElement.setAttribute('id', element.getAttribute("id") + "_Link");

    var imgElement = document.createElement('img');
    linkElement.appendChild(imgElement);
    imgElement.setAttribute('src', "assets/logos/" + element.getAttribute("id")+"Logo.png")
    imgElement.setAttribute('id', element.getAttribute("id") + "_Logo");
    imgElement.setAttribute('class', "social-logo");
});

// Get the properties of the URL
var currentURL = window.location.href;
var hash = window.location.hash;

// Get the ID of the Element linked in the Hash
var linkedElementID = hash.substring(1);

// Attempt to get the Element that was linked in, then scroll to it
var element = document.getElementById(linkedElementID);
if(element != null)
{
    element.focus({block: "center", inline: "center", flex: "center"});
}

function PosterRenderLoop() {
    posterContainerElements.forEach(element =>
        {
            if(element.matches(":hover") | element.matches(":focus"))
            {
                element.appendChild(posterBlackout);
            }
            if(focusedPoster != null && element.matches(":hover") && focusedPoster != element)
            {
                focusedPoster.blur();
                element.focus();
            }
        })
    window.requestAnimationFrame(PosterRenderLoop);
}
window.requestAnimationFrame(PosterRenderLoop);

// Smooth Scrolling
var scrollPosition = {y: 0};
var autoScroll = false;

var tween = new TWEEN.Tween(scrollPosition, false) 
    .to({y: 0}, 500) 
    .easing(TWEEN.Easing.Cubic.Out) 
    .onUpdate(() => {
        content.scrollTop(scrollPosition.y);
    })
    .start() 

    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(!this.getAttribute('href').includes("Work"))
            {
                scrollPosition.y = content.scrollTop;
                autoScroll = true; 
                e.preventDefault();

                var targetElement = document.querySelector(this.getAttribute('href'));

                tween = new TWEEN.Tween(scrollPosition, false) 
                    .to({y: targetElement.offsetTop}, 500) 
                    .easing(TWEEN.Easing.Cubic.Out) 
                    .onUpdate(() => {
                        content.scroll({top: scrollPosition.y});
                    });
                tween.start();
                
                }
            });
});

var imdbLink = document.getElementById("IMDb_Link");
var instaLink = document.getElementById("Insta_Link");


function ScrollRenderLoop(time) {
    if(autoScroll)
        tween.update(time);

    // if(previousScrollY != Math.round(headshotElement.getBoundingClientRect().top))
    // {
    //     if(focusedPoster != null)
    //         focusedPoster.blur();
    //     document.activeElement.blur();
    //     previousScrollY = Math.round(headshotElement.getBoundingClientRect().top);
    // }

    var hiddenElements = 0;

    headerLogo.style.display = 'block';
    if(Math.abs((headerLogo.offsetHeight / headerLogo.offsetWidth) - (headerLogo.naturalHeight / headerLogo.naturalWidth)) < 0.1)
    {
        headerLogo.style.opacity = '1';
        headerLogo.style.display = 'block';
    }
    else
    {
        headerLogo.style.opacity = '0';
        headerLogo.style.display = 'none';
        hiddenElements++;
    }

    socialsContainer.style.display = 'flex';
    if(socialsContainer.offsetWidth < imdbLink.offsetWidth + instaLink.offsetWidth)
    {
        socialsContainer.style.display = 'none';
        hiddenElements++;
    }
    else
    {
        socialsContainer.style.display = 'flex';
    }

    if(hiddenElements >= 2)
    {
        header.setAttribute('style', 'justify-content: center !important');
    }
    else
    {
        header.setAttribute('style', 'justify-content: space-between !important');
    }
    
    window.requestAnimationFrame(ScrollRenderLoop);
}
window.requestAnimationFrame(ScrollRenderLoop);


var refreshStartY = 0;
var canRefresh = false;
var scrolling = false;
var refresh = false;
const touchMoveDistanceToScrollPercent = 0.25;   
// If touch 
var currentRefreshDistance = 0;
var currentRefreshPercent = 0;

var refreshDiv = document.createElement("div");
var refreshGif = document.createElement("img");


document.addEventListener("touchstart", event =>
{
    if(content.getBoundingClientRect().top === 0)
        canRefresh = true;
    refreshStartY = event.touches[0].pageY;
});

document.addEventListener("touchmove", event =>
{
    if(content.getBoundingClientRect().top != 0)
        canRefresh = false;
    if(content.scrollTop == 0 && !canRefresh)
    {
        canRefresh = true;
    }

    if(canRefresh)
    {
        currentRefreshDistance = clamp(event.touches[0].pageY - refreshStartY, 0, touchMoveDistanceToScrollPercent * document.documentElement.clientHeight);

        if(currentRefreshDistance >= touchMoveDistanceToScrollPercent * document.documentElement.clientHeight)
        {
            refresh = true;
        }
        else
        {
            refresh = false;
        }
    }
    else
    {
        refresh = false;
    }
});

document.addEventListener("touchend", event =>
{
    if(refresh)
    {
        setTimeout(() => location.reload(), 1000);
    }
    currentRefreshDistance = 0;
});

var scrollRefreshIndicator = document.createElement("div");
document.body.appendChild(scrollRefreshIndicator);
scrollRefreshIndicator.style.top = "-100px";
scrollRefreshIndicator.className = "scroll-refresh-indicator";

var scrollRefreshIndicatorSymbolContainer = document.createElement("div");
scrollRefreshIndicator.appendChild(scrollRefreshIndicatorSymbolContainer);
scrollRefreshIndicatorSymbolContainer.className = "scroll-refresh-symbol-container";

var scrollRefreshSymbol = document.createElement("p");
scrollRefreshIndicatorSymbolContainer.appendChild(scrollRefreshSymbol);
scrollRefreshSymbol.className = "scroll-refresh-symbol";
scrollRefreshSymbol.innerText = "𝄞";

function RefreshLoop(time) 
{
    currentRefreshPercent = currentRefreshDistance / (touchMoveDistanceToScrollPercent * document.documentElement.clientHeight);
    if(!refresh)
    {
        var currentRotation = parseFloat(getComputedStyle(root).getPropertyValue("--refresh-indicator-pseudo-rotation").replace("deg", ""));
        scrollRefreshIndicator.style.top = lerp(parseFloat(scrollRefreshIndicator.style.top), -100 + (currentRefreshPercent * 300), 0.75) + "px";
        root.style.setProperty("--refresh-indicator-pseudo-rotation", lerp(currentRotation,  180 + (currentRefreshPercent * 180), 0.75) + "deg");
        scrollRefreshIndicator.classList.remove("scroll-refresh-on-refresh");
    }
    else
    {
        var currentRotation = parseFloat(getComputedStyle(root).getPropertyValue("--refresh-indicator-pseudo-rotation").replace("deg", ""));
        scrollRefreshIndicator.style.top = lerp(parseFloat(scrollRefreshIndicator.style.top), 200, 0.75) + "px";
        root.style.setProperty("--refresh-indicator-pseudo-rotation", lerp(currentRotation,  180 + (currentRefreshPercent * 180), 0.5) + "deg");
        scrollRefreshIndicator.classList.add("scroll-refresh-on-refresh");
    }

    var reelLogo = document.querySelector(".pt-2");
    if(reelLogo != null)
    {
        reelLogo.style.display = "none";
    }
    console.log("foo");

    window.requestAnimationFrame(RefreshLoop);
}
window.requestAnimationFrame(RefreshLoop);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

var isMobile = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  

var reel = document.querySelector("playlist");
var reelScroll = document.querySelector("touch-circle");