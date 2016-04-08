// global variables
var allBows = [],
    $bowList,
    bowTemplate;


$(function(){
  console.log('sanity check');

  //GET call for bows data
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: function(json) {
      allBows = json;
      renderBows();
    },
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });

  $('#addBow').on('submit', addBowSubmit);

  //navbar sign up button opens signupModal
  $('.sign-up').on('click', function(event){
    event.preventDefault();
    console.log('sign up button clicked!');
    $('#signupModal').modal();
  });

  //navbar login  button opens loginModal
  $('.login').on('click', function(event){
    event.preventDefault();
    console.log('login button clicked!');
    $('#loginModal').modal();
  });

});

//renders bows to the view
function renderBows(bows) {
  var bowSource = $('#wisdom-template').html();
  $bowList = $('#beadsOfWisdom');
  bowTemplate = Handlebars.compile(bowSource);

  var bowHtml = bowTemplate({beads: allBows});
  $bowList.prepend(bowHtml);
}

//
function addBowSubmit(event) {
  event.preventDefault();
  console.log($('#addBow form').serialize());
  $.ajax ({
    method: 'POST',
    url: "/api/bows",
    data: $('#addBow form').serialize(),
    success: function(json) {
      console.log("Success adding bow! Here's what you added:", json);
    },
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

}
