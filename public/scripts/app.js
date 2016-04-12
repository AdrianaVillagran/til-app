// global variables
var $bowList,
    bowTemplate,
    $newBowForm,
    $updateForm,
    date;

$(function(){
  console.log('sanity check');

  //function to see if there is a user logged in
  $.ajax({
    method: 'GET',
    url: '/loggedin',
    success: function(json) {
      if(parseInt(json) === 0) {
        console.log("!user");
        // following functions change the homepage if the user is not logged in
        $('#addBow').attr("disabled", "disabled");
      }
    },
    error: function(err) {
      console.log("error checking for logged in user");
    }
  });

  //formats datetimepicker button on newBowForm
  $('#datetimepicker1').datetimepicker({
      format: 'MM-DD-YYYY'
  });

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


  //addBow click event
  $('#addBow').on('submit', addBowSubmit);

  //delete-bow click event
  $bowList.on('click', '.delete-bow', deleteBow);

  // edit-bow click event
  $bowList.on('click', '.edit-bow', updateBow);

  $('.search').on('click', searchByDate);

});
//end of document ready


//handles addBow POST call
function addBowSubmit(event) {
  event.preventDefault();
  var username = $('#username').val();
  var date = $('#date').val();
  var formattedDate = date.replace(/[/]/g, '');
  console.log(formattedDate);

  var newBowInput = {  date: $('#date').val(),
                  username: $('#username').val(),
                  beadOfWisdom: $('#beadOfWisdom').val(),
                  topic: $('#topic').val(),
                  resourceUrl: $('#resourceUrl').val(),
                  description: $('#description').val()
                };
  console.log(newBowInput);
  $.ajax ({
    method: 'POST',
    url: "/api/users/" + username + "/bows",
    data: $newBowForm.serialize(),
    success: renderBow,
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

  // resets addBow form
  $newBowForm[0].reset();
}

// handles bow GET success. result of GET request is an array of bow arrays by all users
function handleBowSuccess(bows) {

    //filters through array of bow arrays
    for(var i = 0; i<bows.length; i++) {
      sortBows(bows[i]);
    }
}

// renders bow by bow
function sortBows(bows) {
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

  var updateInput = $('#update-' + bowId + " form").serialize();
  console.log(updateInput);
  $.ajax({
    method:'PUT',
    url: '/api/users/' + username + '/bows/' + bowId,
    data: updateInput,
    success: handleUpdatedBow,
    error: function(err) { console.log('there was an error updating bow', err); }
  });


}

//renders updated bow to view
function handleUpdatedBow(json) {
  var bowId = json._id;
  // removes bow from the page
  $('[data-bow-id=' + bowId + ']').remove();
  // re-renders it with most current data
  renderBow(json);
}

function handleBowDateSuccess(bows) {
    console.log("handleBowDateSuccess is called");
    //filters through array of bow arrays
    for(var i = 0; i<bows.length; i++) {
      sortBowsByDate(bows[i]);
    }

}

// renders bow by bow
function sortBowsByDate(bows) {
  for(var i = 0; i<bows.length; i++)
  if(bows[i].date === date) {
    if(bows[i].length > 1) {
      sortBows(bows[i]);
    } else{
      renderBow(bows[i]);
    }
  }
}

function searchByDate(event) {
  event.preventDefault();
  console.log('search button clicked');
  date = $('#search').val();
  console.log(date);
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: handleBowDateSuccess,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });

  $('#search-form')[0].reset();


}
