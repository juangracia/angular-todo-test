(function(window, angular) {

	angular.module('todo')
		.controller('TodoController', TodoController)
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['$scope', '$state', '$stateParams'];
	function TodoListController($scope, $state, $stateParams) {
        $scope.todoList = [
            {
                id: 1,
                title: 'My first todo',
                description: 'Desc - My first todo',
                done: true
            },
            {
                id: 2,
                title: 'My second todo',
                description: 'Desc - My second todo',
                done: false
            }
        ];

        if (!!$stateParams.todoObj) {
            debugger;
            for (var i = 0; i < $scope.todoList.length; i++) {
                if ($scope.todoList[i].id === $stateParams.todoObj.id) {
                    $scope.todoList[i] = $stateParams.todoObj;
                    break;
                }
            }
        }
	}

	TodoController.$inject = ['$scope', '$state', '$stateParams'];
	function TodoController($scope, $state, $stateParams) {
        if (!$stateParams.todoObj) {
            $state.go('list');
        }
        $scope.todo = $stateParams.todoObj;
	}

})(window, window.angular);
