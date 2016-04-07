(function(window, angular) {

    angular.module('navbar', []);

})(window, window.angular);

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

(function(window, angular) {

    angular.module('todo')
        .directive('myTodo', MyTodo);

    MyTodo.$inject = ['$state'];
    function MyTodo($state) {
        return {
            restric: 'EA',
            scope: {
                todo: '='
            },
            link: MyTodoCompile,
            templateUrl: function(element, attributes) {
                var type = !attributes.edit ? 'view' : 'edit';
                return '/app/todo/todo.template.' + type + '.html';
            }
        };

        function MyTodoCompile(scope, element, attrs) {
            scope.edit = function edit(todoObj) {
                $state.go('edit', { id: todoObj.id, todoObj: todoObj });
            };
            scope.close = function close(todoObj) {
                $state.go('list', { todoObj: todoObj });
            };
        }
    }

})(window, window.angular);

(function(window, angular) {

	angular.module('todo')
		.config(TodoConfiguration);

	TodoConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

	function TodoConfiguration($stateProvider, $urlRouterProvider) {
		// Para cualquier URL incorrecta
		$urlRouterProvider.otherwise("/");

		// Definimos los estados (y la ruta que tendra cada uno)
		$stateProvider
            .state('list', {
                url: "/",
                params: {
                    todoObj: null
                },
                templateUrl: "/app/todo/todo.view.list.html",
                controller: 'TodoListController'
            })
            .state('edit', {
                url: "/edit/:id",
                params: {
                    todoObj: null
                },
                templateUrl: "/app/todo/todo.view.edit.html",
                controller: 'TodoController'
            });
	}

})(window, window.angular);
