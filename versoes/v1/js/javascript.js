$('.p1').addClass('zoomInDown');
setTimeout(function(){
	$('.p2 .a').addClass('bounceInUp');
},100);
setTimeout(function(){
	$('.p2 .b').addClass('bounceInUp');
},150);
setTimeout(function(){
	$('.p2 .c').addClass('bounceInUp');
},200);
setTimeout(function(){
	$('.p2 .d').addClass('bounceInUp');
},250);
setTimeout(function(){
	$('.alternative').removeClass('bounceInUp');
},1500);

var currentResult = modifyNumbers();
var accept = 0; error = 0; parcial = 0; parcialDefault = 5; awesome = 0;
var reply;
var timeOut;
var textHits;

$('span').click(function(){

	clearTimeout(timeOut);

	reply = $(this).text();

	if(reply == currentResult){
		$(this).addClass("success");
		textInfo('+1','fadeInUp','more',800,'fadeOutUp');
		$('.results').text(currentResult);
		if($('.info').hasClass('current-enable')){
			textInfo('Good!','pulse','info', 1000);
		}else{
			if(awesome > 14){
				textInfo('Awesooooooome!','tada','info', 1000);
				awesome = 0;
			}else{
				textInfo('Greeeat!','tada','info', 1000);
			}
		}
		accept++;
		parcial++;
		awesome++;
		var refresh = setTimeout(function(){
			$('span').removeClass("danger success");
			$('.alternative').removeClass("current");
			$('.results').text('?');
			currentResult = modifyNumbers();
			chooseBg();
			if(parcial >= parcialDefault){
				textHits = parcial + ' hits!';
				textInfo(textHits,'flip','parcial',4000);
				parcialDefault += parcialDefault;
			}
		},(1000));
	}else{
		textInfo('Ooops!','shake','info',1000);
		$(this).addClass("danger");
		error++;
		if(parcial >= parcialDefault){
			textInfo('0 hits! :(','flip','parcial',4000);
		}
		parcial = 0;
		parcialDefault = parcialDefault;
	}

	$(".accept").text(accept);
	$(".error").text(error);

});

function modifyNumbers(){

	var nb1 = Math.floor((Math.random() * 10) + 1);
	var nb2 = Math.floor((Math.random() * 10) + 1);

	if(nb1 > nb2 || nb1 == nb2){
		$(".number1").text(nb1);
		$(".number2").text(nb2);
	}else{
		$(".number1").text(nb2);
		$(".number2").text(nb1);
	}

	var operator = chooseOperator();
	$(".operator").text(operator);

	var currentResult;

	switch(operator){
		case "+" :
			currentResult = parseInt($(".number1").text()) + parseInt($(".number2").text());
			break;
		case "-" :
			currentResult = parseInt($(".number1").text()) - parseInt($(".number2").text());
			break;
		case "x" :
			currentResult = parseInt($(".number1").text()) * parseInt($(".number2").text());
			break;
		/*case "/" :
			currentResult = $(".number1").text() / $(".number2").text();
			break;*/
	}

	chooseNumber();

	function chooseNumber(){

		var number = [];
		var testNumber;
		var saveNumber = false;

		for(var i = 0; i < 3; i++){

			if(currentResult >= 0 && currentResult <= 4){
				testNumber = Math.floor((Math.random() * 5) + 0);
			}else{
				testNumber = Math.floor((Math.random() * (currentResult + 5)) + (currentResult - 5));
			}

			save = true;

			if(testNumber == currentResult){

				save = false;
				i--;

			}else{

				for(var j = 0; j < 3; j++){
					if(number[j] == testNumber){
						save = false;
						i--;
					}
				}

			}

			if(save == true){
				number[i] = testNumber;
			}

		}

		var alternatives = [".a", ".b", ".c", ".d"];

		var alternative = alternatives[Math.floor((Math.random() * 4) + 0)];

		$(alternative).text(currentResult);
		timeOut = setTimeout(function(){
			$('.info').addClass('current-enable');
			$(alternative).addClass("current");
		},(3000));

		switch(alternative){
			case ".a":
				$(".b").text(number[0]);
				$(".c").text(number[1]);
				$(".d").text(number[2]);
				break;
			case ".b":
				$(".a").text(number[0]);
				$(".c").text(number[1]);
				$(".d").text(number[2]);
				break;
			case ".c":
				$(".a").text(number[0]);
				$(".b").text(number[1]);
				$(".d").text(number[2]);
				break;
			case ".d":
				$(".a").text(number[0]);
				$(".b").text(number[1]);
				$(".c").text(number[2]);
				break;
		}

	}

	return currentResult;

}

function chooseOperator(){
	/*var arrayOperator = ["+","-","x","/"];*/
	var arrayOperator = ["+","-","x"];
	/*return arrayOperator[Math.floor((Math.random() * 4) + 0)];*/
	return arrayOperator[Math.floor((Math.random() * 3) + 0)];
}

function chooseBg(){
	var bg = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6","#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"]
	$('body').css('background-color',bg[Math.floor((Math.random() * 21) + 0)]);
}

function textInfo(text, animation, nameClass, duration, exit){
	var nameClasses = nameClass + ' animated';
	var nameClassesFade = nameClass + ' animated fadeOutDown';
	var nameClassesFadeExit = nameClass + ' animated ' + exit;
	$('.' + nameClass).attr('class',nameClasses);
	$('.' + nameClass).text(text).addClass(animation);
	if(duration != 'infinite'){
		setTimeout(function(){
			if(exit == undefined){
				$('.' + nameClass).attr('class',nameClassesFade);
			}else{
				$('.' + nameClass).attr('class',nameClassesFadeExit);
			}
		}, duration);
	}else{
		setTimeout(function(){
			$('.' + nameClass).attr('class',nameClasses);
		}, 1000);
	}

}

chooseBg();
