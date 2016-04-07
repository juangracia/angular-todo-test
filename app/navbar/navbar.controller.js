(function(window, angular) {

    angular.module('navbar')
        .controller('NavBarController', NavBarController);

    NavBarController.$inject = ['$scope'];
    function NavBarController($scope) {
        $scope.brand = 'Tincho';
        $scope.links = [
            {
                title: 'Mi listado',
                href: '#',
                isActive: false
            },
            {
                title: 'Editar listado',
                href: '#/edit',
                isActive: true
            },
            {
                title: 'Dummy link',
                href: '#',
                isActive: false
            }
        ];
    }

})(window, window.angular);
