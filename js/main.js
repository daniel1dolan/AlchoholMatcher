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

  let nextQ = Qans => {
    let qNum = $("#qid");
    qNum.text += 1;
    $("#heading").text(Qans["heading"]);
    $("#q1").text(Qans["q1"]);
    $("#q2").text(Qans["q2"]);
    $("#q3").text(Qans["q3"]);
    $("#q4").text(Qans["q4"]);
  };
});
