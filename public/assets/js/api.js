$(document).ready(function(){
    let allDrinks = [];

    function getAllDrinks(){
        $.get("/api/drinks")
        .then((data)=> {
            allDrinks = data.sort(()=> Math.random()- 0.5);
          console.log(data)
            appendDrinks()
        })
    }

    function appendDrinks(){
        for(let i = 0; i< allDrinks.length; i++){
            $(".menu-container").append(`<div class="col-lg-6 menu-item filter-${allDrinks[i].category}" id="${i}">
            <img src="${allDrinks[i].thumbnail}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="#">${allDrinks[i].name} - ${allDrinks[i].category}</a><span></span>
            </div>
            <div class="menu-ingredients">
              ${allDrinks[i].recipe}
            </div>
          </div>`)
        }
        var menuIsotope = $('.menu-container').isotope({
            itemSelector: '.menu-item',
            layoutMode: 'fitRows'
          });
      
          $('#menu-flters li').on('click', function() {
            $("#menu-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');
      
            menuIsotope.isotope({
              filter: $(this).data('filter')
            });
            AOS.init({
                duration: 1000,
                once: true
              });
          });
    }

getAllDrinks()


})