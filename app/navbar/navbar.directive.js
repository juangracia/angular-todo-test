(function(window, angular) {

    angular.module('navbar')
        .directive('myNavBar', MyNavBar);

    MyNavBar.$inject = [];
    function MyNavBar() {
        return {
            restrict: 'E',
            scope: {
                brand: '=',
                links: '='
            },
            templateUrl: '/app/navbar/navbar.template.html'
        }
    }

})(window, window.angular);
