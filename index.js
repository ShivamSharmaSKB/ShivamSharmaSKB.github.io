const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



let photoArray = [];



const count = 10;
const apiKey = '4llvgCmiZMDmISqUVYjPYNcLGvrTCj2Wrbus1m_Y7o0'; 
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

    let ready = false;
    let imagesLoaded = 0;
    let totalImages = 0;

    function imageLoaded () {
        imagesLoaded++;
        console.log(imagesLoaded);
        if (imagesLoaded === totalImages) {
            ready = true;
            loader.hidden = true;
           
        }
    }
    function displayPhoto () {
        imagesLoaded = 0;
        totalImages = photoArray.length;
        
        photoArray.forEach((photo) => {
        const item = document.createElement('a');
            item.setAttribute('href', photo.links.html);
            item.setAttribute('target', '_blank');
    
    const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.atl_discription);


    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);

    }); 
}





async function getPhotos (){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    } catch(error) {

    }
}

window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10000 && ready) {
   ready = false;
    getPhotos();

 }
});
getPhotos(); 
