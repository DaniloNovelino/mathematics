var app = angular.module('app', ['timer']);

app.controller('ctrl', function($scope, $element, $timeout){

  //var defaults
  $scope.disableButton = false;
  $scope.answer        = "?";
  $scope.comment       = "";
  $scope.upHit         = 0;

  var score = function(val1, val2, val3, val4) {
    $scope.correct = val1;
    $scope.wrong   = val2;
    $scope.hits    = val3;
    $scope.upHit   = val4;
  }

  score(0, 0, 0, 0);

  $scope.timerRunning  = false; //countdown

  //texts
  $scope.textPlay = "play";

  //hide id game
  document.getElementById('game').style.display = 'none';

  //hide id end
  document.getElementById('end').style.display = 'none';

  $scope.custom = {
    "timeToComment"                : 1000,
    "timeToNextAlternative"        : 1000,
    "timeToShowAlternativeCurrent" : 2000,
    "msgSuccess"                   : "Great! :D",
    "msgSuccessLow"                : "Good! :)",
    "msgError"                     : "Ops, why? :("
  }

  $scope.defaults = {
    "applyCalc" : function(a, b, c){
      var result;
      switch (c) {
        case "+":
        result = a + b;
        break;
        case "-":
        result = a - b;
        break;
        case "*":
        result = a * b;
        break;
        //case "/":
        //  result = a / b;
        //  break;
      }
      return result;
    },
    "randomNumber" : function(min, max){
      return (Math.floor(Math.random() * (max - min)) + min);
    },
    "randomOperator" : function(){
      //$scope.arrayOperator = ["+","-","*","/"];
      $scope.arrayOperator = ["+","-","*"];
      return $scope.arrayOperator[$scope.defaults.randomNumber(0, 3)];
    },
    "currentAlternative" : function(){
      var arrayAlternative = ["alternativeA", "alternativeB", "alternativeC", "alternativeD"];
      return arrayAlternative[$scope.defaults.randomNumber(0, 4)];
    },
    "callNextOperation" : function(){

      var number1 = $scope.defaults.randomNumber(0, 10);
      var number2 = $scope.defaults.randomNumber(0, 10);

      if(number1 > number2 || number1 == number2){
        $scope.optionA = number1;
        $scope.optionB = number2;
      }else{
        $scope.optionA = number2;
        $scope.optionB = number1;
      }

      $scope.operator = $scope.defaults.randomOperator();

      //current result
      $scope.result = $scope.defaults.applyCalc($scope.optionA, $scope.optionB, $scope.operator);

      var number = [];
      var testNumber;
      var saveNumber = false;

      for(var i = 0; i < 3; i++){
        if($scope.result >= 0 && $scope.result <= 4){
          testNumber = $scope.defaults.randomNumber(0, 5);
        }else{
          var testNumberA = $scope.result + 5;
          var testNumberB = $scope.result - 5;
          testNumber = $scope.defaults.randomNumber(testNumberA, testNumberB);
        }
        save = true;
        if(testNumber == $scope.result){
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

      var result = $scope.defaults.currentAlternative();

      switch (result) {
        case "alternativeA":
        $scope.alternativeA = $scope.result;
        $scope.alternativeB = number[0];
        $scope.alternativeC = number[1];
        $scope.alternativeD = number[2];
        break;
        case "alternativeB":
        $scope.alternativeA = number[0];
        $scope.alternativeB = $scope.result;
        $scope.alternativeC = number[1];
        $scope.alternativeD = number[2];
        break;
        case "alternativeC":
        $scope.alternativeA = number[0];
        $scope.alternativeB = number[1];
        $scope.alternativeC = $scope.result;
        $scope.alternativeD = number[2];
        break;
        case "alternativeD":
        $scope.alternativeA = number[0];
        $scope.alternativeB = number[1];
        $scope.alternativeC = number[2];
        $scope.alternativeD = $scope.result;
        break;
      }

      $scope.alternative = {
        "alternativeA"   : $scope.alternativeA,
        "alternativeB"   : $scope.alternativeB,
        "alternativeC"   : $scope.alternativeC,
        "alternativeD"   : $scope.alternativeD,
        "curAlternative" : $scope.result
      }

      $scope.msgCurrentSuccess = $scope.custom.msgSuccess;

      //show alternative current
      $scope.showAlternativeCurrent = function(){
        $scope.msgCurrentSuccess = $scope.custom.msgSuccessLow;
        for (var i = 0; i < document.getElementsByClassName('alternative').length; i++) {
          if(document.getElementsByClassName('alternative')[i].id == result){
            document.getElementsByClassName('alternative')[i].classList.add("current");
          }
        }
      }
      timeOutAlternativeCur = $timeout($scope.showAlternativeCurrent, $scope.custom.timeToShowAlternativeCurrent);

    },
    //remove class especific
    "removeEspecificClass" : function(classNameGeneric, classNameToRemove){
      var classToRemove = document.getElementsByClassName(classNameGeneric);
      for (var i = 0; i < classToRemove.length; i++) {
        classToRemove[i].classList.remove(classNameToRemove);
      }
    },
    "nextOperation" : function(){
      $scope.answer = "?";
      $scope.defaults.removeEspecificClass('alternative', 'success');
      $scope.defaults.removeEspecificClass('alternative', 'error');
      $scope.defaults.callNextOperation();
      $scope.disableButton = false; //enable button
      console.log("$scope.disableButton", $scope.disableButton);
    },
    "timeOutComment" : function(theComment, time){
      $scope.comment = theComment;
      var apppenComment = function(){ $scope.comment = "" }
      $timeout(apppenComment, time);
    }
  }

  //click button with ng-click play
  $scope.play = function(){

    //custom animation
    document.getElementsByClassName('box-button')[0].classList.add('zoom-out');
    document.getElementsByClassName('desc')[0].classList.add('slide-out');

    //clear score to play again
    setTimeout(function(){
      $scope.defaults.removeEspecificClass('alternative', 'current');
      $scope.defaults.removeEspecificClass('alternative', 'error');
      score(0, 0, 0, 0);
      for (var i = 0; i < document.getElementsByClassName('alternative').length; i++) {
        document.getElementsByClassName('alternative')[i].disabled = false;
      }
    }, 400);

    setTimeout(function(){
      document.getElementById('presentation').style.display = 'none';
      document.getElementById('game').style.display = 'block';
      document.getElementById('end').style.display = 'none';

      $scope.textPlay = "play again";
      document.getElementsByClassName('text-play')[0].classList.add('again');

      document.getElementById('centered').style.height = '260px';

    }, 1000);

    $scope.defaults.nextOperation();

    //start countdown
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  };

  //click button choose alternative
  $scope.chooseAlternative = function(el){
    if(el.target.innerHTML == $scope.alternative.curAlternative){
      $scope.correct++;  //count answer correct
      $scope.hits++; //count hits
      $timeout.cancel(timeOutAlternativeCur);
      $scope.defaults.removeEspecificClass('alternative', 'current'); //remove class current
      el.target.classList.add('success'); //add class success
      $scope.answer = $scope.result; //show result
      $scope.disableButton = true; //disable button
      $scope.defaults.timeOutComment($scope.msgCurrentSuccess, $scope.custom.timeToComment); //msg sucess
      //next operation
      $timeout($scope.defaults.nextOperation, $scope.custom.timeToNextAlternative);
    }else{
      $scope.hits = 0; //reset hit
      $scope.wrong++; //count answer wrong
      el.target.classList.add('error'); //add class error
      el.target.disabled = true; //disable button
      $scope.defaults.timeOutComment($scope.custom.msgError, $scope.custom.timeToComment); //msg error
    }
    if($scope.hits > $scope.upHit)
      $scope.upHit = $scope.hits; console.log($scope.upHit);
  };

  //show on console the time stopped
  $scope.$on('timer-stopped', function (event, data){

    document.getElementById('timeout').style.display = "block";

    document.getElementsByClassName('box-button')[0].classList.remove('zoom-out');
    document.getElementsByClassName('desc')[0].classList.remove('slide-out');

    setTimeout(function(){
      document.getElementById('game').style.display = 'none';
      document.getElementById('end').style.display = 'block';
      document.getElementById('presentation').style.display = 'block';
      document.getElementById('timeout').style.display = "none";
    }, 3500);

    console.log('Timer Stopped - data = ', data);
  });

});
