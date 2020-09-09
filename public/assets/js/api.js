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

    function getAllRumDrinks(){
      $.get("/api/rum")
      .then((data)=> {
          allDrinks = data.sort(()=> Math.random()- 0.5);
        console.log(data)
          appendDrinks()
      })
  }

  function getAllVodkaDrinks(){
    $.get("/api/vodka")
    .then((data)=> {
        allDrinks = data.sort(()=> Math.random()- 0.5);
      console.log(data)
        appendDrinks()
    })
}

function getAllWhiskeyDrinks(){
  $.get("/api/whiskey")
  .then((data)=> {
      allDrinks = data.sort(()=> Math.random()- 0.5);
    console.log(data)
      appendDrinks()
  })
}

function getAllTequilaDrinks(){
  $.get("/api/tequila")
  .then((data)=> {
      allDrinks = data.sort(()=> Math.random()- 0.5);
    console.log(data)
      appendDrinks()
  })
}

function getAllGinDrinks(){
  $.get("/api/gin")
  .then((data)=> {
      allDrinks = data.sort(()=> Math.random()- 0.5);
    console.log(data)
      appendDrinks()
  })
}

    function appendDrinks(){
      $(".menu-container").html("") 
     
      
      for(let i = 0; i< allDrinks.length; i++){
          $(".menu-container").append(`<div class="col-lg-6 menu-item filter-${allDrinks[i].category}" id="${i}">
            <img src="${allDrinks[i].thumbnail}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="#">${allDrinks[i].name}</a><span></span>
            </div>
            <div class="menu-ingredients">
              ${allDrinks[i].recipe}
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

getAllDrinks()
$("#vodka").on("click", function(){
  getAllVodkaDrinks()
})
$("#all_drinks").on("click", function(){
  getAllDrinks()
})
$("#rum").on("click", function(){
  getAllRumDrinks()
})
$("#whiskey").on("click", function(){
  getAllWhiskeyDrinks()
})
$("#tequila").on("click", function(){
  getAllTequilaDrinks()
})
$("#gin").on("click", function(){
  getAllGinDrinks()
})


})