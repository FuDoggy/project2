$(document).ready(function(){
    let allDrinks = [];
    let filteredDrinks = []


function getDrinks(drink){
  $.get(`/api/${drink}`)
  .then((data)=> {
      allDrinks = data.sort(()=> Math.random()- 0.5);
      filteredDrinks = [...allDrinks];
    console.log(data)
      appendDrinks()
  })
}

$("#Search").on("input", function() {
  const val = $(this).val().trim()
  console.log(val)
  filteredDrinks = allDrinks.filter(function(drink) {
    const pattern = new RegExp(val, "gi");
    return pattern.test(drink.name) || pattern.test(drink.recipe)
  })
  console.log(filteredDrinks)
  appendDrinks()
})

    function appendDrinks(){
      $(".menu-container").html("") 
     
      
      for(let i = 0; i< filteredDrinks.length; i++){
          $(".menu-container").append(`<div class="col-lg-6 menu-item filter-${filteredDrinks[i].category}" id="${i}">
            <img src="${filteredDrinks[i].thumbnail}" class="menu-img" alt="">
            <div class="menu-content">

              <a href="#">${allDrinks[i].name}</a><span></span>

            </div>
            <div class="menu-ingredients">
              ${filteredDrinks[i].recipe}
            </div>
          `)
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
          $(".menu-container").attr("style", "height:620px !important")
    }

getDrinks('drinks')
$(".drinkTab").on("click", function(){
  getDrinks($(this).attr("id"))
})

})