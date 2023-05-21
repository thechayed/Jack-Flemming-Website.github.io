var BioContainer = $('.BioContainer');
var BioElem_0 = $('#BioElem_0');
var BioElem_1 = $('#BioElem_1');
// 0 = Landscape, 1 = Portrait
var BioState = 0;
var JustLoaded = true;

document.addEventListener('DOMContentLoaded', function() {
    rearrange();
});

window.addEventListener('resize', function() {
    rearrange();
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