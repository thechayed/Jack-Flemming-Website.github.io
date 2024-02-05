// Get the root element
var root = document.documentElement;

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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    if(socialsContainer.offsetWidth < imdbLink.offsetWidth + instaLink.offsetWidth - 16)
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

function RefreshLoop(time) 
{
    currentRefreshPercent = currentRefreshDistance / (touchMoveDistanceToScrollPercent * document.documentElement.clientHeight);
    if(!refresh)
    {
        scrollRefreshIndicator.style.top = lerp(parseFloat(scrollRefreshIndicator.style.top), -100 + (currentRefreshPercent * 200), 0.1) + "px";
        root.style.setProperty("--refresh-indicator-pseudo-rotation", lerp(parseFloat(getComputedStyle(root).getPropertyValue("--refresh-indicator-pseudo-rotation").replace("deg"), ""), (currentRefreshPercent * 180), 0.1) + "deg");
        scrollRefreshIndicator.classList.remove("scroll-refresh-on-refresh");
    }
    else
    {
        scrollRefreshIndicator.style.top = "100px";
        scrollRefreshIndicator.classList.add("scroll-refresh-on-refresh");
    }

    window.requestAnimationFrame(RefreshLoop);
}
window.requestAnimationFrame(RefreshLoop);

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }