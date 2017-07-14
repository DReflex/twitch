$(document).ready(function(){

  var streams =["imaqtpie", "imls", "eulcs1", "septiess", "ESL_SC2"];
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
              console.log('online');
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


$("#all").on("click", function(){
  Load(streams);
})

$("#online").on("click", function(){
  Load(streams, "true");
})

$("#offline").on("click", function(){
  Load(streams, "false");
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
