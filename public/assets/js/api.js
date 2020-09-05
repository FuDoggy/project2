$(document).ready(function(){
    let allDrinks = [];

    function getAllDrinks(){
        $.get("/api/drinks")
        .then((data)=> {
            allDrinks = data;
            appendDrinks()
        })
    }

    function appendDrinks(){
        for(let i = 0; i< 10; i++){
            $(".menu-container").append(`<div class="col-lg-6 menu-item filter-${allDrinks[i].drinks[0].strAlcoholic}">
            <img src="${allDrinks[i].drinks[0].strDrinkThumb}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="#">${allDrinks[i].drinks[0].strDrink}</a><span></span>
            </div>
            <div class="menu-ingredients">
              ${allDrinks[i].drinks[0].strIngredient1} ,${allDrinks[i].drinks[0].strIngredient2}, ${allDrinks[i].drinks[0].strIngredient3 || ""}
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