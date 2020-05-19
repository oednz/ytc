$(document).ready(function() {

  var get_video_id = function(form_input) {
    var regex = /watch\?v=([a-zA-Z0-9\-_]{11})/,
    video_id = form_input.val().match(regex)[1];

    return video_id;
  },

  //generate_embed = function(video_id, start, end) {
  generate_embed = function(video_id) {
    var width = 560,
        height = 315,
        //embed_url = "<iframe width=\""+width+"\" height=\""+height+"\" src=\"https\:\/\/www.youtube.com/embed/"+video_id+"\" frameborder=\"0\" allowfullscreen></iframe>";
        embed_url = "<iframe width=\""+width+"\" height=\""+height+"\" src=\"https\:\/\/www.youtube.com/embed/"+video_id+"\" frameborder=\"0\" allowfullscreen></iframe>";

    return embed_url;
  },

  generate_cropped_url = function(video_id, start, end) {

    //var url = "http://youtube.googleapis.com/v/"+video_id+"?start="+start+"&end="+end+"&version=3";
    //var url = "http://youtube.com/embed/"+video_id+"?start="+start+"&end="+end+"&autoplay=true";
    var url = "https://youtube.com/watch?v="+video_id+"&t="+start+"&e="+end+"&showinfo=0&rel=0&controls=1&html5=1&autohide=1&fs=1";
    

    return url;
  },

  convert_to_seconds = function(video_time) {
    if(matches = video_time.match(/(\d*):(\d*)/)) {
      time_in_seconds = parseInt(matches[1] * 60) + parseInt(matches[2]);
    }
    else {
      time_in_seconds = video_time;
    }
    return time_in_seconds;
  },

  regex = /watch\?v=([a-zA-Z0-9\-_]{11})/;

  $('.youtube-url input').blur(function() {
    var $url_input = $(this);

    if($url_input.val() != "" && $url_input.val() != $url_input.current_value) {
      $url_input.current_value = $url_input.val();
      $('.youtube-video-container').empty();

      video_id = get_video_id($url_input),
      embed_url = generate_embed(video_id);

      $('.youtube-video-container').prepend(embed_url);
    }
  });

  $('.youtube-video-cropper').submit(function(e) {
    if($('.youtube-video-start').val() != "" && $('.youtube-video-end').val() != "") {

      var start_time = $('.youtube-video-start').val(),
          end_time = $('.youtube-video-end').val(),
          cropped_url = generate_cropped_url(video_id, convert_to_seconds(start_time), convert_to_seconds(end_time));

       $('.cropped-urls').css('display', 'block');
      $('.cropped-urls').prepend('<div class=cropped-urls-flat>'+cropped_url+'</div>');
    }
    e.preventDefault();
  });

  $('.clear-cropped-urls').click(function(e) {
    $('.cropped-urls').remove();

    e.preventDefault();
  });

//Change text of caopy button
$('button').click(function () { 
    var text = 'Click to copy';
    // save $(this) so jQuery doesn't have to execute again
    var $this = $(this).find('span');
    if ($this.text() === text) {
        $this.text('COPIED! Now go to your Thinkling Space and paste');
    } else {
        $this.text(text)
    }
});
  
    
//Clipboard begin
(function(){
    new Clipboard('#copy-button');
})();

//Clipboard end
  
  
  
});
