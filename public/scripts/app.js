// global variables
var $bowList,
    bowTemplate,
    $newBowForm,
    $updateForm;


$(function(){
  console.log('sanity check');

  // $('#datetimepicker1').datetimepicker({
  //     format: 'MM/DD/YYYY'
  // });

  // compiles Handlebars
  var bowSource = $('#wisdom-template').html();
  $bowList = $('#beadsOfWisdom');
  bowTemplate = Handlebars.compile(bowSource);

  $newBowForm = $('#addBow form');
  $updateForm = $('#beadsOfWisdom .update-form');

  //GET call for bows data
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: handleBowSuccess,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });

  // //navbar sign up button opens signupModal
  // $('.sign-up').on('click', function(event){
  //   event.preventDefault();
  //   console.log('sign up button clicked!');
  //   $('#signupModal').modal();
  // });
  //
  // //navbar login  button opens loginModal
  // $('.login').on('click', function(event){
  //   event.preventDefault();
  //   console.log('login button clicked!');
  //   $('#loginModal').modal();
  // });


  //addBow click event
  $('#addBow').on('submit', addBowSubmit);

  //delete bow click event
  $bowList.on('click', '.delete-bow', deleteBow);

  // update bow click event
  $bowList.on('click', '.edit-bow', updateBow);

});


//handles addBow POST call
function addBowSubmit(event) {
  event.preventDefault();

  //hard-coding userId until I find a way to isolate it
  userId = "5707f38945f4c26d3aa09a7c";

  $.ajax ({
    method: 'POST',
    url: "/api/users/" + userId + '/bows',
    data: $newBowForm.serialize(),
    success: renderBow,
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

  // resets addBow form
  $newBowForm[0].reset();
}

//handles bow GET success
function handleBowSuccess(bows) {
    bows.forEach(function(bow) {
      renderBow(bow);
    });
}

// takes a single bow and renders it to the top of the page
function renderBow(bow) {
  var bowHtml = bowTemplate(bow);
  $bowList.prepend(bowHtml);
}

//handles Deleted bow success
function deleteBow(event){
  event.preventDefault();

  var bowId = $(this).closest('.bow').data('bow-id');
  console.log(bowId);
  $('div[data-bow-id=' + bowId + ']').remove();
  userId = "5707f38945f4c26d3aa09a7c";
  $.ajax ({
    method: 'DELETE',
    url: '/api/users/' + userId + "/bows/" + bowId,
    success: function(json) {
      console.log("bow successfully deleted");
    },
    error: function(err) {
      console.log("the bow was not successfully deleted", err);
    }
  });
}

//handles update bow success
function updateBow(event) {
  event.preventDefault();

  console.log('edit bow button clicked!');
  var bowId = $(this).closest('.bow').data('bow-id');
  console.log(bowId);

  // doesnt' work but keep trying ;)
  $('#date-' + bowId).datetimepicker({
      format: 'MM/DD/YYYY'
  });

  var updateInput = $('#update-' + bowId + " form").serialize();
  console.log(updateInput);
  $.ajax({
    method:'PUT',
    url: '/api/bows/' + bowId,
    data: updateInput,
    success: handleUpdatedBow,
    error: function(err) { console.log('there was an error updating bow', err); }
  });
  //$('#update-' + bowId + " form")[0].reset();

}

//renders updated bow to view
function handleUpdatedBow(json) {
  var bowId = json._id;
  // removes bow from the page
  $('[data-bow-id=' + bowId + ']').remove();
  // re-renders it with most current data
  renderBow(json);
}
