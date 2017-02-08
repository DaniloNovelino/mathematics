(function() {
    'use strict';

    //return the first place
    app.directive('firstPlace', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'tmpls/first-place.html',
            link: function(scope, elem, attrs) {
                scope.levelname = attrs.levelname;
            }
        };
    });

}());