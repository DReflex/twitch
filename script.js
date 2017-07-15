$(document).ready(function(){

  var streams =["imaqtpie", "imls", "eulcs1", "septiess", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  function Load (channels, bool){
    $("#results").empty();
    channels.forEach(function(channel){
      var channelURL = "https://api.twitch.tv/kraken/channels/" + channel;
      var streamURL = "https://api.twitch.tv/kraken/streams/" + channel;
      var status =" ";


      $.ajax({
      dataType:"json",
      url: channelURL,
      method : "GET",
      headers:{
        "Client-ID": "m2s1poxqgevvpxlm42lq0z07uzsqo0"
      },
      success: function(user){
        $.ajax({
          dataType:"json",
          url:streamURL,
          method : "GET",
          headers: {
            "Client-ID": "m2s1poxqgevvpxlm42lq0z07uzsqo0"
          },
          success: function(stream){
            var uStatus = user.status;
            var sStatus = stream.status;
            var image = '<img src="' + user.logo + '" alt="logo" class="img img-responsive">'
            if(stream["stream"]!==null){
            status = "online";
            }
            if(stream["stream"]==null){
              uStatus = "user is offline";
              status = "offline";

            }

            if(user.logo == null){
              image = '<img src="http://professorantoniocesar.com.br/site/wp-content/uploads/2016/05/icon-user-574x480.png" alt"logo" class="img img-responsive">'
            }
            if(user.status == 404 || user.status == 422){
              image = '<img src="http://blog.archive.org/wp-content/uploads/2013/10/nomore404_l.png" alt"logo" class="img img-responsive">'
            }
            $("#results").append('<div class= "'+ status + '">'+ image +'<br><p>'+ uStatus+ '</p><br><a  href="' + stream.url + '" target = "_blank"><p>'+ channel +'</p></a><hr></div>')
            if(bool == "true"){
              $(".offline").remove();
            }
            else if (bool == "false") {
              $(".online").remove();
            }
          }
        })
      }

      })

    })
  }

//fix scroll
var fix = $("#fix").height();
var title = $(".title").height();
var offset = fix + title;
function scroll (){
  var scroll_Top = $(window).scrollTop();

  if( scroll_Top >= offset){
    $("#fix").css({position: "fixed",
                   top: "20px",
                   right:"0px",
                   opacity: ".5"
                 });
  }
  else{
    $("#fix").css({position: "relative",
                   top: "",
                   right:"",
                   opacity: "1"
                 });
  }

}
$(window).scroll(scroll);

$("#all").on("click", function(){
  Load(streams);
  $("#all").css("background-color", "rgb(64, 196, 57)");
  $("#online, #offline").css("background-color", "rgb(154, 12, 12)");
})

$("#online").on("click", function(){
  Load(streams, "true");
  $("#online").css("background-color", "rgb(64, 196, 57)");
  $("#all, offline").css("background-color", "rgb(154, 12, 12)");
;})

$("#offline").on("click", function(){
  Load(streams, "false");
  $("#offline").css("background-color", "rgb(64, 196, 57)");
  $("#online, #all").css("background-color", "rgb(154, 12, 12)")
})
var match=[];
$("#search").keyup(function(){
  var expresion = RegExp($('#search').val());

   match =[];
  streams.map(function(names){
    if (names.match(expresion)){
      match.push(names);
    }
  });

});
$("#go").on("click", function(){

Load(match);
});




})
