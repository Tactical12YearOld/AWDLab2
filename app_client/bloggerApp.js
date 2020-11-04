
var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

/* ROUTER PROVIDER */
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
                    })
        .when('/blog-list', {
            templateUrl: 'pages/blog-list.html',
            contorller: 'ListController',
            conrollerAs: 'vm'
                    })
        .when('/blogAdd', {
            templateUrl: 'pages/blogAdd.html',
            controller: 'AddController',
            controllerAs: 'vm'
                    })
        .when('/blogEdit/:id', {
            templateUrl: 'pages/blogEdit.html',
            controller: 'EditController',
            controllerAs: 'vm'
                    })
        .when('/blogDelete/:id', {
            templateUrl: 'pages/blogDelete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
                    })
        .otherwise({redirectTo: '/'});
});

/* STATE PROVIDER */
app.config(function($stateProvider){
    $stateProvider
        .state('blog-list', {
            url: '/blog-list',
            templateUrl: 'pages/blog-list.html',
            controller : 'ListController'
        });
});

/* REST WEB API FUNCTIONS */
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function getBlogsById($http, id) {
    return $http.get('api/blogs/' + id);
}

function updateBlogById($http, id, data) {
    return $http.put('api/blogs/' + id, data);
}

function addBlog($http, data) {
    return $http.post('api/blogs/', data);
}

function deleteBlog($http, id) {
    return $http.delete('api/blogs/' + id);
}

/* CONTROLLERS */
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.title = "Ben Schaeffer's Blog";
    vm.message = "Welcome to my blog!!!";
});

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.title = "Blog List";

    getAllBlogs($http)
        .success(function(data) {
            vm.blogs = data;
            vm.message = "Blog data found!";
        })
        .error(function (e) {
            vm.message = "Could not get list of blogs :(";
        });
});

app.contorller('AddController', [ '$http', '$routeParams', '$state', function AddController($http, $routeParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.title = "Blog Add";
    vm.sumbit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;

        addBlog($http, data)
            .success(function(data) {
                vm.message = "Blog data added ;^)";
                $state.go('blog-list');
            })
            .error(function (e) {
                vm.message = "Could not add blog " + userForm.blogTitle.text + " " + userForm.blogText.text;
            });
    }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Edit Controller";

    getBlogsById($http, vm.id)
        .success(function(data) {
            vm.blog = data;
            vm.message = "Blog data found";
        })
        .error(function (e) {
            vm.message = "Could not get blog with id of " + vm.id;
        });

    vm.sumbit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogText.value;
        data.blogText = userForm.blogText.value;
        
        updateBlogById($http, vm.id, data)
            .success(function(data) {
                vm.message = "Blog data updated";
                $state.go('blog-list');
            })
            .error(function (e) {
                vm.message = "Could not update blog with that " + vm.id + " id and this " + 
                userForm.blogTitle.text + " title which states " + userForm.blogText.text;
            });
    }
}]);

app.controller('DeleteController', [ '$http', '$routerParams', '$state', function DeleteController($http, $routerParams, $state) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Blog Delete";

    getBlogsById($http, vm.id)
        .success(function(data) {
            vm.blog = data;
            vm.message = "Blog data found";
        })
        .error(function (e) {
            vm.message = "Could not delete blog given this " + vm.id + " ID";
        });
    vm.sumbit = function() {
        var data = {};
        deleteBlog($http, vm.id)
            .success(function(data) {
                vm.message = "Blog data DELETED. It's gone; never coming back.";
                $state.go('blog-list');
            })
            .error(function() {
                vm.message = "Could not delete this " + vm.id + " pesky blog!";
            });
    }
    
    vm.cancel = function() {
        $state.go('blog-list');
    }
}]);