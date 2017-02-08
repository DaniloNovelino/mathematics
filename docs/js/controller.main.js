(function() {
    'use strict';

    app.controller('mainCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $timeout, $firebaseArray) {

        var refUsers = new Firebase("https://ranking-mathematics-2.firebaseio.com/users");
        $scope.users = $firebaseArray(refUsers);

        $scope.openSidebarBottom = false;
        $scope.filter = '';
        $scope.alertCountdown = 10;
        $scope.showAlertRanking = false;

        var success,
            error,
            hit,
            boxAlert,
            alternative,
            skip,
            maxNumber,
            counter,
            mytimeout,
            counterAlternative,
            point,
            vm = this;

        var _reset = function() {

                success = 0;
                error = 0;
                hit = 0;
                alternative = 0;
                skip = 0;
                maxNumber = 0;
                counter = 30;
                counterAlternative = 0;
                point = 0;

                $scope.alternatives = [];
                $scope.success = success;
                $scope.error = error;
                $scope.hit = hit;
                $scope.counter = counter;
                $scope.counterAlternative = counterAlternative;
                $scope.point = point;
                $scope.yourName = "";
                $scope.currentUser = "";

            },

            _loadAlternative = function() {

                //counter alternatives
                counterAlternative++;
                $scope.counterAlternative = counterAlternative;

                var alternativeA = _randomNumber(0, maxNumber),
                    alternativeB = _randomNumber(0, maxNumber);

                if (alternativeA < alternativeB) {
                    $scope.alternativeA = alternativeB;
                    $scope.alternativeB = alternativeA;
                } else {
                    $scope.alternativeA = alternativeA;
                    $scope.alternativeB = alternativeB;
                }

                $scope.operation = _arrayOperation();

                $scope.result = _result($scope.alternativeA, $scope.alternativeB, $scope.operation);
            },

            _saveAlternative = function() {

                $scope.alternatives[alternative] = {
                    alternativeA: $scope.alternativeA,
                    alternativeB: $scope.alternativeB,
                    operation: $scope.operation,
                    result: {
                        correctAnswer: $scope.result,
                        myAnswer: $scope.answer,
                        message: $scope.alternativeMessage
                    }
                };

                $scope.data = {
                    alternatives: $scope.alternatives,
                    countSuccess: $scope.success,
                    countError: $scope.error,
                    countHit: $scope.hit,
                    user: {}
                }

                alternative++;
            },

            _saveUser = function() {

                $scope.data.user = {
                    name: $scope.user,
                    level: $scope.level,
                    points: $scope.point,
                    image: "https://api.adorable.io/avatars/120/" + $scope.user
                }

            },

            _randomNumber = function(min, max) {
                var number = (Math.floor(Math.random() * ((max + 1) - min)) + min);
                return number > 0 ? number : 0;
            },

            _arrayOperation = function() {
                var operators = ["+", "-", "x"];
                return operators[_randomNumber(0, operators.length - 1)]
            },

            _result = function(alternativeA, alternativeB, operation) {
                var result;

                switch (operation) {
                    case "+":
                        result = alternativeA + alternativeB;
                        break;
                    case "-":
                        result = alternativeA - alternativeB;
                        break;
                    case "x":
                        result = alternativeA * alternativeB;
                        break;
                }
                return result;
            },

            _showMessage = function(flag, message) {
                var alertMessage = document.createElement("div"),
                    iconMessage;
                alertMessage.className = "animated fadeInRight mdl-snackbar box-alert__message box-alert__message--" + message;

                if (flag) {
                    iconMessage = "<div class='mdl-snackbar__action'><i class='material-icons color-success color-success--text'>done</i></div>";
                } else {
                    iconMessage = "<div class='mdl-snackbar__action'><i class='material-icons color-error color-error--text'>error_outline</i></div>";
                }
                alertMessage.innerHTML = "<div class='mdl-snackbar__text'>" + message + "</div>" + iconMessage;

                angular.element(boxAlert).prepend(alertMessage);

                _removeElement(alertMessage, 10000, "fadeOutRight");
            },

            _removeElement = function(element, time, classname) {
                setTimeout(function() {
                    setTimeout(function() {
                        element.remove();
                    }, time * 10 / 100);
                    if (classname != undefined)
                        element.classList.add(classname);
                }, time);
            },

            _onTimeout = function() {
                if ($scope.counter > 0) {
                    $scope.counter--;
                    mytimeout = $timeout(_onTimeout, 1000);
                } else if ($scope.counter == 0) {
                    //stop game
                    $scope.stopGame();
                } else {
                    $scope.counter = counter;
                }
            };

        init();

        function init() {
            $scope.level = "normal";
            $scope.play = false;
            $scope.stop = false;

            //create element box-alert
            boxAlert = document.createElement("div");
            boxAlert.className = "box-alert";
            angular.element(document.body).append(boxAlert);

            //play game
            $scope.playGame = function(level) {

                //reset
                _reset();

                $scope.play = true;
                $scope.stop = false;

                //start countdown
                mytimeout = $timeout(_onTimeout, 1000);

                if (level == "easy") {
                    maxNumber = 3;
                    skip = 5;
                } else if (level == "normal") {
                    maxNumber = 5;
                    skip = 3;
                } else if (level == "hard") {
                    maxNumber = 10;
                    skip = 0;
                } else {
                    maxNumber = 20;
                    skip = 0;
                }

                $scope.skip = skip;
                $scope.level = level;

                //loading alternatives
                _loadAlternative();
            }

            //show new alternative
            $scope.showAnswer = function(answer) {
                if (answer != "") {
                    if (answer == $scope.result) {
                        success++;
                        hit++;

                        if (hit == 10) {
                            _showMessage(true, "awesome");
                            point = point + 2;
                        } else if (hit == 20) {
                            _showMessage(true, "unbelievable");
                            point = point + 3;
                        } else {
                            _showMessage(true, "success");
                            point = point + 1;
                        }

                        $scope.alternativeMessage = "success";
                    } else {
                        point--;
                        error++;
                        hit = 0;
                        _showMessage(false, "error");
                        $scope.alternativeMessage = "error";
                    }

                    $scope.hit = hit;
                    $scope.success = success;
                    $scope.error = error;
                    $scope.point = point;

                    _saveAlternative();
                    _loadAlternative();

                    $scope.answer = "";
                }
            }

            //skip alternative
            $scope.fnSkip = function() {
                _loadAlternative();
                skip--;
                $scope.skip = skip;
            }

            $scope.stopGame = function() {
                $scope.stop = true;
                $scope.play = false;
            }

            $scope.saveUser = function(yourName) {
                $scope.stop = false;

                if (yourName != undefined && $scope.data != undefined) {

                    $scope.showAlertRanking = true;

                    $scope.user = yourName;
                    $scope.currentUser = yourName;
                    _saveUser();

                    //save database in firebase
                    $scope.users.$add($scope.data);

                    _showMessage(true, "user save");
                } else {
                    _showMessage(false, "user not save");
                }
            }

            $scope.openSidebar = function(position, flag) {
                if (position == 'bottom') {
                    if (flag == undefined) {
                        $scope.openSidebarBottom = !$scope.openSidebarBottom;
                    } else {
                        $scope.openSidebarBottom = flag;
                    }
                }
                $scope.showAlertRanking = false;
            }

        }

    }

}());