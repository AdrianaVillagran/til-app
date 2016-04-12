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
        $('#dropBead').attr("disabled", "disabled");
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

  // search by date form entry
  $('.search').on('click', searchByDate);

  // event listener for all beads button
  $('#allBeads').on('click', getAllBows);

});
//end of document ready


//handles addBow POST call
function addBowSubmit(event) {
  event.preventDefault();
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

// handles all bows by all users GET success. result of GET request is an
//array of bow arrays by all users
function handleBowSuccess(bows) {
    //filters through array of bow arrays
    for(var i = 0; i<bows.length; i++) {
      sortBows(bows[i]);
    }
}

// renders an array of bows
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

// handles event listener for search by date form entry
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
  $bowList.empty();
}

// function to sort through and call function to handle array of bow arrays that
// comes back when search by date entry is submitted
function handleBowDateSuccess(bows) {
    console.log("handleBowDateSuccess is called");
    //filters through array of bow arrays
    for(var i = 0; i<bows.length; i++) {
      sortBowsByDate(bows[i]);
    }

}

// sorts through bows to find those that match by  date and calls function to
// render bows based on how many bows there are
function sortBowsByDate(bows) {
  for(var i = 0; i<bows.length; i++)
  if(bows[i].date === date) {
    if(bows[i].length > 1) {
      sortBows(bows[i]);
    } else {
      renderBow(bows[i]);
    }
  }
}

function getAllBows(event) {
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: handleBowSuccess,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });
}
