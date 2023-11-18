document.addEventListener("DOMContentLoaded", init);

const BASEURL = "https://beheer.hairdesignbritney.be/api/";
const IMAGEURL = "https://beheer.hairdesignbritney.be";

function init(){
    fillHero();
    fillAboutUs();
    fillServices();
    fillReviews();
    fillContact();
}

/*async function fillHero() {
    const response = await fetch(BASEURL + "hero?populate=*");
    const heroDataJson = await response.json();
    const heroData = heroDataJson.data.attributes;
    const heroslider = $('#heroslider'); // Select the hero slider div using jQuery
    const images = heroData.heroimages.data;

    // Clear the existing content of heroslider
    heroslider.trigger('destroy.owl.carousel');

    images.forEach(image => {
        const heroHTML = `
            <div class="item bg-img" data-overlay-dark="1" data-background="${IMAGEURL + image.attributes.url}">
                <div class="v-middle caption mt-30">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="o-hidden">
                                    <h1 class="herotitle">${heroData.title}</h1>
                                    <a href="#" class="butn butn-dark mt-30" data-scroll-nav="5"> <span>Contact</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        heroslider.trigger('add.owl.carousel', [jQuery(heroHTML)]);
    });

    // Initialize the Owl Carousel
    heroslider.owlCarousel({
        items: 1, // Number of items to display at a time
        loop: true,
        nav: true,
        dots: true,
    });
}*/

async function fillHero(){
    $(document).ready(function () {
        $('#heroslider').owlCarousel({
            loop: true,
            nav: true,
            dots: true,
        });
    });

    const response = await fetch(BASEURL + "hero?populate=*");
    const heroDataJson = await response.json();
    const heroData = heroDataJson.data.attributes;
    const heroslider = $('#heroslider');
    const images = heroData.heroimages.data;

    images.forEach(image => {
        console.log(IMAGEURL + image.attributes.url)
        const newHeroHTML = `
        <div class="item bg-img" data-overlay-dark="1" style="background-image: url(${IMAGEURL + image.attributes.url});">
            <div class="v-middle caption mt-30" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="o-hidden">
                                <h1 class="herotitle">${heroData.title}</h1>
                                <a href="#" class="butn butn-dark mt-30" data-scroll-nav="5"> <span>Contact</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        heroslider.trigger('add.owl.carousel', [jQuery(newHeroHTML)]);
    })

    heroslider.trigger('refresh.owl.carousel');

}



async function fillAboutUs(){
    const response = await fetch(BASEURL + "about-us?populate=*");
    const aboutUsDataJson = await response.json();
    const aboutUsData = aboutUsDataJson.data.attributes;
    const title = document.querySelector('#aboutustitle');
    const subtitle = document.querySelector('#aboutussubtitle');
    const paragraph = document.querySelector('#aboutusparagraph');
    const aboutimage = document.querySelector('#aboutimg');
    title.innerHTML = aboutUsData.Title;
    subtitle.innerHTML = aboutUsData.Subtitle;
    paragraph.innerHTML = '<p>' + aboutUsData.aboutusparagraph + '</p>';
    const imgurl = aboutUsData.aboutusphoto?.data?.attributes.url;
    if(imgurl != undefined){
        aboutimage.innerHTML = `<div class="img"> <img src="${IMAGEURL + imgurl}" alt=""> </div>`;
    }else{
        paragraph.classList.remove("col-md-9")
        paragraph.classList.add("col-md-12");
    }
}

async function fillServices(){
    
    fillServiceText();
    const response = await fetch(BASEURL + "services?populate=*");
    const servicesDataJson = await response.json();
    const servicesData = servicesDataJson.data;
    const services = document.querySelector('#services');
    services.innerHTML = "";
    servicesData.forEach(service => {
        services.innerHTML += `
        <div class="col-md-4">
            <div class="item">
                <div class="position-re o-hidden"> <img src="${IMAGEURL + service.attributes.serviceimage.data.attributes.url}" alt=""> </div>
                <div id="service${service.id}"class="con serviceitem" data-toggle="modal" data-target="#serviceModal">
                    <h5>${service.attributes.title}<i class="ti-arrow-right"></i></h5>
                    <h7>${service.attributes.subtitle}</h7>
                </div>
            </div>
        </div>
    `;
    });

    $(document).ready(function () {
        $("#reviewcarousel").owlCarousel({
            loop: true, 
            nav: true, 
            dots: true, 
        });
    });

    document.querySelectorAll('.serviceitem').forEach(item => {
        item.addEventListener('click', fillServiceModal);
    });
}

async function fillServiceText(){
    const response = await fetch(BASEURL + "service-text?populate=*");
    const serviceTextDataJson = await response.json();
    const serviceTextData = serviceTextDataJson.data.attributes;
    const title = document.querySelector('#servicetitle');
    const subtitle = document.querySelector('#servicesubtitle');
    title.innerHTML = serviceTextData.title;
    subtitle.innerHTML = serviceTextData.subtitle;
}

async function fillReviews() {

    $(document).ready(function () {
        $('#reviewcarousel').owlCarousel({
            loop: true,
            nav: true,
            dots: true,
        });
    });
    

    await fillReviewsText();
    const response = await fetch(BASEURL + "review-text?populate=*");
    const reviewTextDataJson = await response.json();
    const reviewTextData = reviewTextDataJson.data.attributes.reviews;
    const reviewcarousel = $('#reviewcarousel'); 

    reviewTextData.data.forEach(review => {
        const newReviewHTML = `
            <div class="item-box"> 
                <span class="quote">
                    <img src="img/quot.png" alt="">
                </span>
                <p>${review.attributes.reviewtext}</p>
                <div class="info">
                    <div class="author-img">
                        <img src="img/team/t3.png" alt="">
                    </div>
                    <div class="cont">
                        <h6>${review.attributes.name}</h6>
                        <span>${review.attributes.subtitle}</span>
                    </div>
                </div>
            </div>
        `;

        reviewcarousel.trigger('add.owl.carousel', [jQuery(newReviewHTML)]);
    });

    reviewcarousel.trigger('refresh.owl.carousel');
}


async function fillReviewsText(){
    const reponse = await fetch(BASEURL + "review-text?populate=*");
    const reviewTextDataJson = await reponse.json();
    const reviewTextData = reviewTextDataJson.data.attributes;
    const title = document.querySelector('#reviewtitle');
    const subtitle = document.querySelector('#reviewtext');
    title.innerHTML = reviewTextData.Title;
    subtitle.innerHTML = reviewTextData.paragraphtext;
}

async function fillContact(){
    const response = await fetch(BASEURL + "contact-text");
    const contactDataJson = await response.json();
    const contactData = contactDataJson.data.attributes;
    const title = document.querySelector('#contacttitle');
    const subtitle = document.querySelector('#contactsubtitle');
    const phone = document.querySelector('#contactphone');
    const address = document.querySelector('#contactaddress');
    const email = document.querySelector('#contactemail');
    const footerphone = document.querySelector('#footerphone');
    const footeraddress = document.querySelector('#footeraddress');
    const footeremail = document.querySelector('#footermail');

    title.innerHTML = contactData.title;
    subtitle.innerHTML = contactData.subtitle;
    phone.innerHTML = contactData.phone;
    address.innerHTML = contactData.address;
    email.innerHTML = contactData.email;
    footerphone.innerHTML = contactData.phone;
    footeraddress.innerHTML = contactData.address;
    footeremail.innerHTML = contactData.email;
}

async function fillServiceModal(e){
    e.preventDefault();
    serviceId = e.target.closest('.serviceitem').id.substring(7);
    const response = await fetch(BASEURL + "services/" + serviceId + "?populate=*");
    const serviceDataJson = await response.json();
    const serviceData = serviceDataJson.data.attributes;
    const title = document.querySelector('#serviceModalTitle')
    const subtitle = document.querySelector('#pricessubtitle')
    const description = document.querySelector('#pricesdescription')
    const priceTable = document.querySelector('#pricestable')
    const image = document.querySelector('#serviceModalImage')
    title.innerHTML = serviceData.title;
    subtitle.innerHTML = serviceData.subtitle;
    description.innerHTML = serviceData.description;
    image.src = IMAGEURL + serviceData.serviceimage.data.attributes.url;
    const prices = serviceData.prices.data;
    priceTable.innerHTML = "";
    prices.forEach(service => {
        priceTable.innerHTML += `
        <tr>
            <td>${service.attributes.type}</td>
            <td>${service.attributes.price}</td>
        </tr>
        `;
    });    
}

