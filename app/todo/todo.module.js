(function(window, angular) {

    angular.module('todo', [
        'ui.router',
        'navbar'
    ])
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

})(window, window.angular);
