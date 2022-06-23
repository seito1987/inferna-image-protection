var BP_qtt = 15;
var fruits=["🍏", "🍉", "🍇", "🍌", "🍒", "🧿"];
var loot_table=[
"https://i.imgur.com/NtjgWq6.png",
"https://i.imgur.com/gKJq1I7.png",
"https://i.imgur.com/9VRN4pK.png",
"https://i.imgur.com/yrfIolp.png",
"https://i.imgur.com/mt8Y9F6.png",
"https://i.imgur.com/AK6s0c5.png",
"https://i.imgur.com/P1NupSz.png",
"https://i.imgur.com/mxN1uSH.png",
"https://i.imgur.com/0qW0v3W.png",
"https://i.imgur.com/oliIMal.png"
];
var currentfruit=0;

$(document).ready(function() {
	setInterval(function() { makeTimer(); }, 1000);
	addColumsBP();
});

function addColumsBP() {
	for (var i = 0; i < BP_qtt; i++) {

		$('.row1:after').css("content", "Yes");
		if(currentfruit<loot_table.length) {
			$('.bp_main').append('<div class="col"><div class="num">'+(i+1)+'</div><div class="rows"><div class="row1" data-qtt="10" style="background-image:url('+loot_table[currentfruit]+');"></div><div class="row2" data-qtt="2" style="background-image:url('+loot_table[currentfruit]+');"></div></div></div>');
			currentfruit++;
		} else {
			currentfruit=0;
		}
		// addNumEachCol();
	}

	$('.bp_main').css('opacity', 1);
}

$('.bp_main').on('click', '.row1', function() {
	var icon = $(this).css('background-image');
	$('.overlay').toggleClass('act');
	$('.splash').toggleClass('act');
	$('.opener').css('background-image', icon);
	// var position = $(this).position();
	// var offset = $(this).offset();
// $( "p" ).last().text( "left: " + position.left + ", top: " + position.top );
	// console.log("top: " + position.top, "top: " + offset.top, );
});

$('.overlay').click(function() {
	$(this).toggleClass('act');
	$('.splash').toggleClass('act');
});

function makeTimer() {
	var endTime = new Date("29 April 2022 9:56:00 GMT+01:00");
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;
	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }

	$(".days").html(days + "<span> D</span>");
	$(".hours").html(hours + "<span>:</span>");
	$(".minutes").html(minutes + "<span>:</span>");
	$(".seconds").html(seconds);
}

$(function() {
  var body = $('#starshine'),
      template = $('.template.shine'),
      stars = 30,
      sparkle = 10;

  var size = 'small';
  var createStar = function() {
    template.clone().removeAttr('id').css({
      top: (Math.random() * 90) + '%',
      left: (Math.random() * 90) + '%',
      webkitAnimationDelay: (Math.random() * sparkle) + 's',
      mozAnimationDelay: (Math.random() * sparkle) + 's'
    }).addClass(size).appendTo(body);
  };

  for(var i = 0; i < stars; i++) {
    createStar();
  }
});


// $('.bp_main .col .row1').click(function() {
// 	// var icon = $(this).css('background-image');
// 	console.log('click: ');
// });
