
var app = angular.module('bloggerApp', ['ngRoute']);

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

/* REST WEB API FUNCTIONS */
function getAllBlogs($http) {
    return $http.get('/api/blogs/');
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
   console.log("im in the home controller.");
    var vm = this;
    vm.title = "Ben Schaeffer's Blog";
    vm.message = "Welcome to my blog!!!";
    console.log("leaving home controller");
});

app.controller('ListController', function ListController($http) {
   console.log("im in the list controller.");
    var vm = this;
    vm.title = "Blog List";

    getAllBlogs($http, data)
        .then(
        function(data) {
            vm.blogs = data;
            vm.message = "Blog data found!";
        },
        function (e) {
            vm.message = "Could not get list of blogs :(";
        });
});

app.controller('AddController', [ '$http', '$routeParams', '$state', function AddController($http, $routeParams) {
    var vm = this;
    vm.blog = {};
    vm.title = "Blog Add";
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;

        addBlog($http, data)
            .then(
            function (data) {
                vm.message = "Blog data added ;^)";
                $state.go('blog-list');
            }),
            function (e) {
                vm.message = "ERROR blog not added :^( " + userForm.blogTitle.text + " " + userForm.blogText.text;
            };    
        
    }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Edit Controller";

    getBlogsById($http, vm.id)
        .then(
            function (data) {
                vm.blog = data;
                vm.message = "Blog data found bb!!"
            }),
            function (e) {
                vm.message = "ERROR BlogID: " + vm.id + "not found";
            };    

    vm.sumbit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogText.value;
        data.blogText = userForm.blogText.value;
        
        updateBlogById($http, vm.id, data)
            .then(
                function (data) {
                    vm.message = "Blog data updated";
                    $state.go('blog-list');
                }),
                function (e) {
                    vm.message = "Could not update blog with that " + vm.id + " id and this " + 
                    userForm.blogTitle.text + " title which states " + userForm.blogText.text;
                };      
    }
}]);

app.controller('DeleteController', [ '$http', '$routerParams', '$state', function DeleteController($http, $routerParams) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Blog Delete";

    getBlogsById($http, vm.id)
    .then(
        function (data) {
            vm.blog = data;
            vm.message = "Blog data found bb!!"
        }),
        function (e) {
            vm.message = "ERROR BlogID: " + vm.id + "not found";
        };
    vm.sumbit = function(data) {
        var data = {};
        deleteBlog($http, vm.id)
            .then(
                function (data) {
                    vm.message = "Blog data DELETED. It's gone; never coming back.";
                    $state.go('blog-list');
                }),
                function (e) {
                    vm.message = "Could not delete this " + vm.id + " pesky blog!";
                };
    }
    vm.cancel = function() {
        $state.go('blog-list');
    }
}]);