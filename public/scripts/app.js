// global variables
var $bowList,
    bowTemplate,
    $newBowForm;


$(function(){
  console.log('sanity check');

  var bowSource = $('#wisdom-template').html();
  $bowList = $('#beadsOfWisdom');
  bowTemplate = Handlebars.compile(bowSource);
  $newBowForm = $('#addBow form');

  //GET call for bows data
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: handleBowSuccess,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });

  $('#addBow').on('submit', addBowSubmit);
  $('.delete-bow').on('click', deleteBow);

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

  //delete album click event
  $('#beadsOfWisdom').on('click', '.delete-bow', deleteBow);

});


//
function addBowSubmit(event) {
  event.preventDefault();

  $.ajax ({
    method: 'POST',
    url: "/api/bows",
    data: $newBowForm.serialize(),
    success: newBowSuccess,
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

  $newBowForm[0].reset();
}

//handles bow success
function handleBowSuccess(bows) {
    bows.forEach(function(bow) {
      renderBow(bow);
    });
}

// this function takes a single album and renders it to the page
function renderBow(bow) {
  var bowHtml = bowTemplate(bow);
  $bowList.prepend(bowHtml);
}

//handles Deleted album success
function deleteBow(event){
  event.preventDefault();

  var bowId = $(this).closest('.bow').data('bow-id');
  console.log(bowId);
  $('div[data-bow-id=' + bowId + ']').remove();
  $.ajax ({
    method: 'DELETE',
    url: '/api/bows/' + bowId,
    success: function(json) {
      console.log("album successfully deleted");
    },
    error: function(err) {
      console.log("the album was not successfully deleted", err);
    }
  });
}
