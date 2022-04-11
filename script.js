function currentWidth () {
    return $(window).width()
}

//Cart open/close
const cartOpener = document.querySelector(".test");
const theCart =document.querySelector(".dropdown-content");

cartOpener.addEventListener("click", () => {
    const visible= theCart.getAttribute("data-visible");
    if(visible==="true") theCart.setAttribute("data-visible",false);
    else theCart.setAttribute("data-visible",true);
  });

//Adding items to cart
let quantity=Number(document.getElementById("value").innerHTML);
const plus=document.getElementById("plus");
const minus=document.getElementById("minus");
const addButton=document.getElementById("addtocart");
const price=Number(document.getElementById("product-price").innerHTML);
const empty=document.getElementById("emptycart");
const sthInCart= document.getElementById("sth-in-cart");
const remove=document.getElementById("trash");

plus.addEventListener("click", () => {
    document.getElementById("value").innerHTML=quantity+1;
    quantity=Number(document.getElementById("value").innerHTML);
});
minus.addEventListener("click", () => {
    if(quantity>0) {
        document.getElementById("value").innerHTML=quantity-1;
        quantity=Number(document.getElementById("value").innerHTML);
    }
});
addButton.addEventListener("click", () => {
    if(quantity>0) {
        document.getElementById("product-quantity").innerHTML=quantity;
        document.getElementById("product-all-costs").innerHTML=(quantity*price).toFixed(2);

        let emptyCart= empty.getAttribute("data-visible");
        if(emptyCart==="true") {
            empty.setAttribute("data-visible",false);
            sthInCart.setAttribute("data-visible",true);
        }
    }
});
remove.addEventListener("click", () => {
    let emptyCart= empty.getAttribute("data-visible");
        if(emptyCart==="false") {
            empty.setAttribute("data-visible",true);
            sthInCart.setAttribute("data-visible",false);
        }
});

//Gallery 
function resetModal() {
    $(".modal-sm-photo").removeAttr("current").removeClass("selected-photo");
    $(".modal-sm-photo").first().attr("current",'1').addClass("selected-photo");
    $("#main-photo-modal").find("img").attr("src",$(".modal-sm-photo").first().find("img").attr("src"));
}

function defaultSet() {
    currentGallery = $("#default-gallery");
    lgphoto = currentGallery.find("#main-photo").find("img");
    photos = currentGallery.find(".sm-photos").children();
    selectedPhoto = currentGallery.find(".selected-photo");
    firstslide = currentGallery.find(".sm-photos").children().first();
    lastslide = currentGallery.find(".sm-photos").children().last();
}

function modalSet() {
    currentGallery = $("#modal-gallery");
    lgphoto = currentGallery.find("#main-photo-modal").find("img");
    firstslide = currentGallery.find(".sm-photos").children().first();
    lastslide = currentGallery.find(".sm-photos").children().last();
    photos = currentGallery.find(".sm-photos").children();
    selectedPhoto = currentGallery.find(".selected-photo");
}

function smPhotoClickChanger() {
    Array.from(photos).forEach(function(photos) {
        photos.addEventListener('click', () => {
            currentGallery.find(".sm-photos").children().removeClass("selected-photo").removeAttr("current");
            photos.classList.add("selected-photo");
            photos.setAttribute("current",'1');
            selectedPhoto =currentGallery.find(".selected-photo");
            lgphoto.first().attr("src",selectedPhoto.find("img").attr("src"));
        });
    });
}

function closeModal() {
    visible= $('#modal-gallery').attr("data-visible");
    if(visible==="true")  $('#modal-gallery').attr("data-visible",false);

    defaultSet();
    smPhotoClickChanger();
    resetModal();
}

function openModal() {
    if(currentWidth()>768) {
        visible= $('#modal-gallery').attr("data-visible");
        if(visible==="false") $('#modal-gallery').attr("data-visible",true);
        else $('#modal-gallery').attr("data-visible",false);

        modalSet();
        smPhotoClickChanger(); 
    }
}

let visible, lgphoto, firstslide, lastslide, photos, selectedPhoto, currentGallery =null;

defaultSet();
smPhotoClickChanger();
$("#main-photo").click(openModal);
$('#close-button').click(closeModal);
$(window).resize(()=> {
    if(currentWidth()<=768 && $('#modal-gallery').attr("data-visible")==="true") 
        closeModal();
});

//Gallery buttons 
$(document).ready(() => {
    $(".sm-photos:first").children().first().attr("current",'1');
    $(".sm-photos:last").children().first().attr("current",'1');
})

function setPic(slide) {
    photos.removeAttr("current").removeClass("selected-photo");
    lgphoto.fadeOut(150);
    setTimeout(()=> {
        lgphoto.first().attr("src",slide.children().attr("src"));
        lgphoto.fadeIn(150);
    }, 150);
    $(slide).attr("current",'1').addClass('selected-photo');
};

$(".next").click(()=> {
    let current = null;
    photos.each(function() {
        if($(this).attr('current')=='1') 
            current = $(this);
    });
    if(current!=null) {
        if(current.next().length!=0) 
            setPic(current.next());
        else 
            setPic(firstslide);
    }
});

$(".previous").click(()=> {
    let current = null;
    photos.each(function() {
        if($(this).attr('current')=='1') 
            current = $(this);
    });
    if(current!=null) {
        if(current.prev().length!=0) 
            setPic(current.prev());
        else 
            setPic(lastslide);
      }
});

//Side navigation 
const nav= document.getElementById("nav");
const navBg =document.getElementById("nav-bg");
const navOpener = document.querySelector(".navbar-toggle");
const navCloser =document.getElementById("close-nav");

navOpener.addEventListener("click", () => {
    const visible= nav.getAttribute("data-visible");
    if(visible==="false") {
        nav.classList.remove("navbar-nav");
        nav.setAttribute("data-visible",true);
        navBg.setAttribute("data-visible",true);
    }
});

$(document).ready(()=> {
    if(currentWidth()<=768)
        nav.classList.add("navbar-side");
        navBg.classList.add("nav-side-bg");
});
$(window).resize(()=> {
    if(currentWidth()<=768) {
        nav.classList.add("navbar-side");
        navBg.classList.add("nav-side-bg");
        nav.classList.remove("navbar-nav");
    }
    else {
        nav.classList.remove("navbar-side");
        navBg.classList.remove("nav-side-bg");
        nav.classList.add("navbar-nav");
    }
});

navCloser.addEventListener("click", () => {
    const visible= nav.getAttribute("data-visible");
    if(visible==="true") {
        nav.classList.add("navbar-nav");
        nav.setAttribute("data-visible",false);
        navBg.setAttribute("data-visible",false);
    }
});
