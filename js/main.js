$(function() {
  var loading = $("#loadbar").hide();
  $(document)
    .ajaxStart(function() {
      loading.show();
    })
    .ajaxStop(function() {
      loading.hide();
    });

  $("label.btn").on("click", function() {
    var choice = $(this)
      .find("input:radio")
      .val();
    $("#loadbar").show();
    $("#quiz").fadeOut();
    setTimeout(function() {
      $("#answer").html($(this).checking(choice));
      $("#quiz").show();
      $("#loadbar").fadeOut();
      /* something else */
    }, 1500);
  });

  $ans = 3;

  $.fn.checking = function(ck) {
    if (ck != $ans) return "INCORRECT";
    else return "CORRECT";
  };

  let questions = [
    {
      name: "Cocktails",
      qs: {
        length: 7,
        heading: "What type of liquor would you prefer?",
        q1: "Gin",
        q2: "Vodka",
        q3: "Rum",
        q4: "Whiskey",
        q5: "Tequila",
        q6: "Brandy",
        q7: "Random"
      }
    },
    {
      name: "Beer",
      qs: {}
    },
    {
      name: "Wine"
    }
  ];

  let nextQ = Qans => {
    let qNum = $("#qid");
    qNum.text += 1;
    $("#heading").text(Qans["heading"]);
    let quiz = $("#quiz");
    for (let i = 1; i < Qans[length]; i++) {
      quiz.append(`<label
        id="q${i}"
        class="element-animation1 btn btn-lg btn-primary btn-block"
        ><span class="btn-label"
          ><i class="glyphicon glyphicon-chevron-right"></i
        ></span>
        <input type="radio" name="q_answer" value="${i}" />${Qans[i]}</label
      >`);
    }
  };
});
