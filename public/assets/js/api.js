$(document).ready(function(){
    let allDrinks = [];
    let filteredDrinks = [];
    let nonalc = [];

window.addEventListener("click", function(){
  $("#drinkDetailModal").modal("hide");
});

function getDrinks(drink){
  $.get(`/api/${drink}`)
  .then((data)=> {
      allDrinks = data.sort(()=> Math.random()- 0.5);
      filteredDrinks = [...allDrinks];
    console.log(data)
      appendDrinks()
  })
}

function getNonAlcoholicDrinks(){
  $.get(`/api/non-alcoholic`)
  .then((data)=> {
      console.log(data);
      nonalc = data.sort(()=> Math.random() - 0.5);
      appendNonalc()
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

function appendNonalc(){
  //do some stuff and add nonAlc to the section
  for(let i = 1; i< 6; i++){
    $(`#tabhead${i}`).text(nonalc[i].name);
    $(`#tab-${i}`).append(`
    <div class="row">
                  <div class="col-lg-8 details order-2 order-lg-1">
                    <h3>${nonalc[i].name}</h3>
                    <p class="font-italic">${nonalc[i].recipe}</p>
                    <p>${nonalc[i].instructions}</p>
                  </div>
                  <div class="col-lg-4 text-center order-1 order-lg-2">
                    <img src="${nonalc[i].thumbnail}" alt="non alcoholic drink image" class="img-fluid">
                  </div>
                </div>
    `)
  }
}


$(".menu-container").on("click", ".popup", function(e){
  e.stopPropagation();
  $("#drinkDetailModal").modal("show");

})
    function appendDrinks(){
      $(".menu-container").html("") 
     
      
      for(let i = 0; i< 8; i++){
        $(".menu-container").append(`<div class="col-lg-6 menu-item" id="${i}">
        <div class="flip-card">
        <div class="flip-card-inner">
        <div class="flip-front">
        <img src="${filteredDrinks[i].thumbnail}" class="menu-img" alt="">
        <div>${filteredDrinks[i].name}</div>
        <div class="menu-ingredients" style="margin-top: 5px">
          ${filteredDrinks[i].recipe}
        </div>
        </div>
          <div class="flip-back">
          <img src="${filteredDrinks[i].thumbnail}" class="menu-img" alt="">
          <div class="menu-ingredients">
            <div>${filteredDrinks[i].recipe}</div>
            <br>
            <div>${filteredDrinks[i].instructions}</div>
          </div>
          </div>
        </div>
        </div>
        </div>
      `)
    }



        
        // var menuIsotope = $('.menu-container').isotope({
        //     itemSelector: '.menu-item',
        //     layoutMode: 'fitRows'
        //   });
      
        //   $('#menu-flters li').on('click', function() {
        //     $("#menu-flters li").removeClass('filter-active');
        //     $(this).addClass('filter-active');
      
        //     menuIsotope.isotope({
        //       filter: $(this).data('filter')
        //     });
        //     AOS.init({
        //         duration: 1000,
        //         once: true
        //       });
        //   });
          $(".menu-container").attr("style", "height:650px !important")
    }

getDrinks('drinks')
getNonAlcoholicDrinks('drinks')
$(".drinkTab").on("click", function(){
  getDrinks($(this).attr("id"))
})

// upon submitting a user recipe, get the drinks again so that the user recipe is immediately searchable
$("#recipe-form").on("submit", function(event) {
  event.preventDefault();
  // set a timeout so that the drink can be added to the database before getting the drinks
  setTimeout(function() {
    getDrinks("drinks");
  }, 1000)
  // clear the search form
  $("#Search").val("");
});

})

 