var content = document.querySelectorAll("content")[0];
var socialLinkElements = document.querySelectorAll('sociallink');
var galleryElements = document.querySelectorAll('gallery');
var productionElements = document.querySelectorAll('production');
var galleryItemElements = document.querySelectorAll('galleryitem');
var navLinkElements = document.querySelectorAll('a');
var testimonyElements = document.querySelectorAll('testimony');
var posterContainerElements = [];
var focusedPoster;

// Create the Blackout for the poster to dim the rest of the screen
var posterBlackout = document.createElement('blackout');

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

    var descriptionTitle = document.createElement('p');
    posterDescritionContainer.appendChild(descriptionTitle);
    descriptionTitle.setAttribute('class', 'poster-description-title');
    descriptionTitle.textContent = element.getAttribute('title');

    var descriptionProducer = document.createElement('p');
    posterDescritionContainer.appendChild(descriptionProducer);
    descriptionProducer.setAttribute('class', 'poster-description-producer');
    descriptionProducer.textContent = element.getAttribute('producer');


    var descriptionJobTitle = document.createElement('p');
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
                    })
                    .start() 
                }
            });
});

function ScrollRenderLoop(time) {
    window.requestAnimationFrame(ScrollRenderLoop);
    if(autoScroll)
        tween.update(time);
}
window.requestAnimationFrame(ScrollRenderLoop);


content.addEventListener('scroll', function(event) {
    document.activeElement.blur();
  });
  