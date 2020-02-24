$(function() {
  var loading = $("#loadbar").hide();
  $(document)
    .ajaxStart(function() {
      loading.show();
    })
    .ajaxStop(function() {
      loading.hide();
    });

  $("#results").hide();

  $(".navbar").css("margin-bottom", "0");

  class QTaker {
    constructor(drinkTree, innerTree) {
      this.age = false;
      this.drinkTree = drinkTree;
      this.innerTree = innerTree;
    }
    finCheck() {
      console.log("finwork");
      if (parseInt(this.innerTree) > 0) {
        let fetchParam = questions[this.drinkTree]["qs"][this.innerTree];
        console.log(fetchParam);
        $("#results").show();
        $(".navbar").css("margin-bottom", "20px");
        switch (this.drinkTree) {
          case "1":
            //Beer API
            let drinksforall = [];

            fetch(`https://api.punkapi.com/v2/beers?food=${fetchParam}`)
              .then(response => {
                return response.json();
              })
              .then(drinkArray => {
                console.log(drinkArray);
                drinksforall = [...drinksforall, ...drinkArray];
              })
              .then(() => {
                let drinkslist = drinksforall.map(array => {
                  //   let drinkMulti = array.strDrink.join("-");
                  //   console.log(drinkMulti);
                  return `<div class="card" style="width: 18rem;"><img class="card-img-top align-middle" style="height: auto; width: 100%" src=${array.image_url}><div class="card-body align-middle"><p class="card-text">${array.tagline}</p></div></div>`;
                });
                console.log(drinkslist);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = drinkslist.join("");
                $("#quizholder").hide();
                $("#pageDisplay").hide();
              });
            break;
          case "2":
            //Wine API
            `WineAPI${fetchParam}`;

            fetch(
              `https://api.spoonacular.com/food/wine/pairing?apiKey=8c68b07724d1450abd164de9a4455132&food=${fetchParam}`
            )
              .then(response => {
                return response.json();
              })
              .then(array => {
                let newDis = `<div class="card" style="width: 500px;"><img class="card-img-top" src=${array.productMatches[0].imageUrl}><div class="card-body"><p class="card-text">${array.pairingText}</p></div></div>`;
                console.log(newDis);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = newDis;
                $("#quizholder").hide();
                $("#pageDisplay").hide();
              });
            break;
          case "3":
            // Liquor API
            let drinksforLiquor = [];
            fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fetchParam}`
            )
              .then(response => {
                return response.json();
              })
              .then(drinkArray => {
                console.log(drinkArray);
                drinksforLiquor = [...drinksforLiquor, ...drinkArray.drinks];
              })
              .then(() => {
                let drinkslist = drinksforLiquor.map(array => {
                  console.log(drinksforLiquor);
                  return `<div class="card" style="width: 18rem;"><img class="card-img-top" width="180px" src=${array.strDrinkThumb}><a class="card-body" href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">${array.strDrink}</a></div>`;
                });
                console.log(drinkslist);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = drinkslist.join("");
                $("#quizholder").hide();
                $("#pageDisplay").hide();
                // case "4":
                //   pass
              });
            break;
        }
      }
    }
  }
  let randomNum = () => {
    console.log(Math.ceil(Math.random() * 3));
  };

  randomNum();

  const qBase = new QTaker(0, 0);

  let questions = [
    {
      name: "Aged",
      qs: {
        length: 4,
        heading: "What sort of libation are you looking for?",
        1: "Beer",
        2: "Wine",
        3: "Cocktail",
        4: "Suprise me!"
      }
    },
    {
      name: "Beer",
      qs: {
        length: 5,
        heading:
          "What type of food would you like your beer to pair well with?",
        1: "American",
        2: "Mexican",
        3: "Asian",
        4: "Italian",
        5: "Random"
      },
      image: "images/beer-vintage.jpeg"
    },
    {
      name: "Wine",
      qs: {
        length: 7,
        heading:
          "What type of food would you like your wine to pair well with?",
        1: "French",
        2: "Mexican",
        3: "Asian",
        4: "Italian",
        5: "Spanish",
        6: "Argentinian",
        7: "Random"
      },
      image: "images/wine-vintage.jpeg"
    },
    {
      name: "Cocktails",
      qs: {
        length: 7,
        heading: "What type of liquor would you prefer?",
        1: "Gin",
        2: "Vodka",
        3: "Rum",
        4: "Whiskey",
        5: "Tequila",
        6: "Brandy",
        7: "Random"
      },
      image: "images/monkey-liquor.jpeg"
    }
  ];

  $("label.btn").on("click", function() {
    var choice = $(this)
      .find("input:radio")
      .val();
    console.log(choice);
    $("#loadbar").show();
    $("#quiz").fadeOut();
    setTimeout(function() {
      $("#answer").html($(this).checking(choice));
      $("#quiz").show();
      $("#loadbar").fadeOut();
      /* something else */
    }, 1500);
    qBase.Age = choice;
    if (choice == "false") {
      Non_Alcoholic();
      $("#quiz").hide();
      $("#results").show();
      $(".navbar").css("margin-bottom", "20px");
    } else {
      nextQ(questions[0]);
    }
  });

  $ans = 3;

  $.fn.checking = function() {
    console.log(qBase);
    // if (qBase.innerTree > 0){
    //fetch request
    // }
  };

  let nextQ = Qans => {
    // let qNum = $("#qid");
    // qNum.text() = qNum.text().parseint() + 1;
    // console.log(qNum.text);
    $("#heading").text(Qans["qs"]["heading"]);
    let quiz = $("#quiz");
    console.log(quiz);
    quiz.empty();
    console.log(Qans);
    if (Qans["name"] != "Aged") {
      quiz.append(`<img width="300px" src=${Qans["image"]}></img>`);
    }
    for (let i = 1; i <= Qans["qs"]["length"]; i++) {
      quiz.append(`<label
        id="q${i}"
        class="element-animation1 btn btn-lg btn-primary btn-block"
        ><span class="btn-label"
          ><i class="glyphicon glyphicon-chevron-right"></i
        ></span>
        <input type="radio" name="q_answer" value="${i}" />${Qans["qs"][i]}</label
      >`);
    }
    if (qBase.drinkTree < 1) {
      $("label.btn").on("click", function() {
        var choice = $(this)
          .find("input:radio")
          .val();
        console.log(choice);
        $("#loadbar").show();
        $("#quiz").fadeOut();
        setTimeout(function() {
          $("#answer").html($(this).checking(choice));
          $("#quiz").show();
          $("#loadbar").fadeOut();
          /* something else */
        }, 1500);
        qBase.drinkTree = choice;
        nextQ(questions[qBase.drinkTree]);
      });
    } else {
      $("label.btn").on("click", function() {
        var choice = $(this)
          .find("input:radio")
          .val();
        console.log("the choice:", choice);
        $("#loadbar").show();
        $("#quiz").fadeOut();
        setTimeout(function() {
          $("#answer").html($(this).checking(choice));
          $("#quiz").show();
          $("#loadbar").fadeOut();
          /* something else */
        }, 1500);
        qBase.innerTree = choice;
        qBase.finCheck();
      });
    }
  };

  let Non_Alcoholic = () => {
    let drinksforall = [];

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
    )
      .then(response => {
        return response.json();
      })
      .then(drinkArray => {
        console.log(drinkArray);
        drinksforall = [...drinksforall, ...drinkArray.drinks];
      })
      .then(() => {
        let drinkslist = drinksforall.map(array => {
          //   let drinkMulti = array.strDrink.join("-");
          //   console.log(drinkMulti);
          return `<div class="card" style="width: 18rem;"><img class="card-img-top" width="200px" src=${array.strDrinkThumb}><a class="card-body" href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">${array.strDrink}</a></div>`;
        });
        console.log(drinkslist);
        let drinknow = document.querySelector("#results-row");
        drinknow.innerHTML = drinkslist.join("");
        $("#results").show();
        $("#quizholder").hide();
        $("#pageDisplay").hide();
      });
  };

  $("#restartButton").on("click", function() {
    location.reload();
  });
});
