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
