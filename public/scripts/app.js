
//Shorthand for document ready function
var sampleBeads = [{
                      username: "Sample User",
                      beadOfWisdom: "Apparently, de-extinction is possible!",
                      date: "Apr. 7, 2016",
                      description:"Stewart Brand an environmentalist and founder of The WELL andthe Global Business Network, says that we now have technology that is advanced enough to bring back extinct creatures like dodo birds, passenger pidgeons, and even wooly mammoths.",
                      resourceName: "TED Radio Hour",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "natural history"
                    },
                    {
                      username: "Sample User 2",
                      beadOfWisdom: "My dog can read my mind!",
                      date: "Apr. 8, 2016",
                      description:"Fun facty fact stuff",
                      resourceName: "TED Radio Hour",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "science"
                    }];
$(function(){
  console.log('sanity check');

  //compiles handlebars template

  var $beadsList = $('#beadsOfWisdom');
  var source = $('#wisdom-template').html();
  var template = Handlebars.compile(source);

  var beadHtml = template({beads: sampleBeads});
  $beadsList.prepend(beadHtml);



  //navbar sign up button opens signunModal
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
