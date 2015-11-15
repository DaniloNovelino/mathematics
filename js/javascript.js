//var tempo = new Number();
// Tempo em segundos
//tempo = 500;

/*function startCountdown(){

	// Se o tempo não for zerado
	if((tempo - 1) >= 0){

		// Pega a parte inteira dos minutos
		var min = parseInt(tempo/60);
		// Calcula os segundos restantes
		var seg = tempo%60;

		// Formata o número menor que dez, ex: 08, 07, ...
		if(min < 10){
			min = "0"+min;
			min = min.substr(0, 2);
		}
		if(seg <=9){
			seg = "0"+seg;
		}

		// Cria a variável para formatar no estilo hora/cronômetro
		//horaImprimivel = '00:' + min + ':' + seg;
		horaImprimivel = seg;
		//JQuery pra setar o valor
		$("#sessao").html(horaImprimivel);

		// Define que a função será executada novamente em 1000ms = 1 segundo
		setTimeout('startCountdown()',1000);

		// diminui o tempo
		tempo--;

	// Quando o contador chegar a zero faz esta ação
	} else {
		$(".account").remove();
		console.log("finish");
	}

}

startCountdown();
*/

modifyNumbers();

var accept = 0; error = 0;

var operator = chooseOperator();
$(".operator").text(operator);

var reply;
$('span').click(function(){

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

	alternatives(currentResult);


	reply = $(this).text();

	if(reply == currentResult){
		$(".info").text("Great!");
		modifyNumbers();
		chooseBg();
		operator = chooseOperator();
		$(".operator").text(operator);
		accept++;
	}else{
		$(".info").text("Oops!");
		error++;
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

function alternatives(currentResult){

	$(".a").text(Math.floor((Math.random() * (currentResult + 5)) + (currentResult - 5)));
	$(".b").text(Math.floor((Math.random() * (currentResult + 5)) + (currentResult - 5)));
	$(".c").text(currentResult);
	$(".d").text(Math.floor((Math.random() * (currentResult + 5)) + (currentResult - 5)));

}

var timespan = countdown(start|callback, end|callback, units, max, digits);