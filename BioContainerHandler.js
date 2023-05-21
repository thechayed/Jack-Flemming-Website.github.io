// 0 = Landscape, 1 = Portrait
var BioState = 0;
var JustLoaded = true;
var disableScrollLock = false;
var lastTimeOut = 0;

document.addEventListener('DOMContentLoaded', function() {
    rearrange();
    
    var navItems = document.getElementsByClassName("navItem");
    for(var i = 0; i < navItems.length; i++){
        console.log(navItems[i])
        
        navItems[i].addEventListener('click', function() {
            disableScrollLock = true;  
            lastTimeOut = Date.now();
            
            // Add a delay if needed before re-enabling the scroll lock
            setTimeout(function() {
                if(Date.now() - lastTimeOut >= 10000){
                    disableScrollLock = false;
                }
            }, 10000); // Delay in milliseconds (adjust as needed)
        });
    }
});

window.addEventListener('resize', function() {
    rearrange();
});

window.addEventListener('orientationchange', function() {
    rearrange();
});

window.addEventListener('scroll', function() {
    if(disableScrollLock == false){
        window.scroll(0, window.scrollY);
    }
});


//Rearrange elements on resize
function rearrange(){
    // Calculate aspect ratio
    var aspectRatio = window.innerWidth / window.innerHeight;
    
    BioContainer = document.getElementsByClassName("BioContainer")[0];
    BioElem_0 = document.getElementById("BioElem_0");
    BioElem_1 = document.getElementById("BioElem_1");
    
    // If aspect ratio is greater than 16:9
    if(aspectRatio > 1 && (BioState === 1 || JustLoaded === true)) {
        BioContainer.removeChild(BioElem_0);
        BioContainer.removeChild(BioElem_1);
        
        BioContainer.appendChild(BioElem_0);
        BioContainer.appendChild(BioElem_1);

        BioState = 0;
    }
    // If aspect ratio is less than 16:9
    if(aspectRatio < 1 && (BioState === 0 || JustLoaded === true)) {
        BioContainer.removeChild(BioElem_0);
        BioContainer.removeChild(BioElem_1);
        
        BioContainer.appendChild(BioElem_1);
        BioContainer.appendChild(BioElem_0);

        BioState = 1;
    }
    
    JustLoaded = false;
}