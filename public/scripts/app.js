var allBows = [],
    $bowList,
    bowTemplate;


$(function(){
  console.log('sanity check');

  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: handleSuccess,
    error: handleError
  });

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

function handleSuccess(json) {
  allBows = json;
  $bowList = $('#beadsOfWisdom');
  var bowSource = $('#wisdom-template').html();
  bowTemplate = Handlebars.compile(bowSource);

  var bowHtml = bowTemplate({beads: allBows});
  $bowList.prepend(bowHtml);
}

function handleError(err) {
  console.log("There was an error getting bows:", err);
}
