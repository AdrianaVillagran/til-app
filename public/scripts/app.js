
//Shorthand for document ready function

$(function(){
  console.log('sanity check');

  //compiles handlebars template

  var $beadsList = $('#beadsOfWisdom');
  var source = $('#wisdom-template').html();
  var template = Handlebars.compile(source);

  var beadHtml = template({beads: sampleBeads});
  $beadsList.prepend(beadHtml);



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
