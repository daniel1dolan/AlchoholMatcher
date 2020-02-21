$(function() {
  var loading = $("#loadbar").hide();
  $(document)
    .ajaxStart(function() {
      loading.show();
    })
    .ajaxStop(function() {
      loading.hide();
    });

  class QTaker {
    constructor(drinkTree, innerTree) {
      this.age = false;
      this.drinkTree = drinkTree;
      this.innerTree = innerTree;
    }
    // finCheck() {
    //   if (this.innerTree > 0) {
    // do fetch
    //   }
    // }
  }

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
      },
      next: "question[1]"
    },
    {
      name: "Beer",
      qs: {
        length: 4,
        heading: "What type of beer would you like?",
        1: "1",
        2: "2",
        3: "3",
        4: "4"
      }
    },
    {
      name: "Wine",
      qs: {
        length: 4,
        heading: "What color of wine would you like a recommendation for?",
        1: "1",
        2: "2",
        3: "3",
        4: "4"
      }
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
      }
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
    // if (choice != true){
    //   Non_Alcoholic()
    // }
    nextQ(questions[0]);
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
        console.log(choice);
        $("#loadbar").show();
        $("#quiz").fadeOut();
        setTimeout(function() {
          $("#answer").html($(this).checking(choice));
          $("#quiz").show();
          $("#loadbar").fadeOut();
          /* something else */
        }, 1500);
        qBase.innerTree = choice;
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
          return `<li>${array.strDrink}<a href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">Drink Information</a><img width="300px" src=${array.strDrinkThumb}></li>`;
        });
        console.log(drinkslist);
        let drinknow = document.querySelector("#results");
        drinknow.innerHTML = drinkslist.join("");
      });
  };
});
