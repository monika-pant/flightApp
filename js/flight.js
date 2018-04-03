$(function () {




//app initialization
    var eFormsApp = angular.module('eForms', ['ngRoute']);
    eFormsApp.factory('myService', function ($http) {
        var savedData = {};
        
        function fetchFlight(query) {
            var url = "data/data.json";
            return $http.get(url);
        }
        function get() {
            return savedData;
        }

        return {
            fetchFlight: fetchFlight,
            get: get
        }

    });
    // configure our routes
    eFormsApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider

//                 route for the home page
                .when('/', {
                    templateUrl: 'home.html',
                    controller: 'mainController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    });

    eFormsApp.controller('mainController', ['$scope', 'myService', '$rootScope', function ($scope, myService, $rootScope) {
            /****calling plugins once DOM rendered****/
            $('.datepicker').datetimepicker({
                format: 'DD/MM/YYYY',
                showClose: true,
                focusOnShow: false
            });
            $("#ex2").slider({});

            // Why?
            $rootScope.$emit('postOneway');
            
            // Change made
            $scope.flightDataFetched = []
            $scope.$on('showFlightsContainer',function(event, args){
                console.log('$on => inside emit')
                myService.fetchFlight(args)
                    .then(function(res) {
                        if(res.data != null || typeof res.data != 'undefined')
                            $scope.flightDataFetched = res.data;
                    });;
                $scope.showContainer = args.flight.showFlights;
            })

        }]);


    eFormsApp.controller('form1r', ['$scope', '$http', '$location', 'myService', '$rootScope', function ($scope, $http, $location, myService, $rootScope) {

            $scope.postOneway = function (event, formvalid) {
                event.preventDefault();
                var dataF = {
                    "flight": {
                        "origin": $scope.oCity1,
                        "destination": $scope.dCity1,
                        "departure": $scope.departDt1,
                        "arrival": $scope.arrtDt1,
                        "passenger": $scope.passenderCount1,
                        // add this flag
                        "showFlights": true
                    }};
                // $rootScope.hidecontainer = true;
                $scope.$emit('showFlightsContainer', dataF);
                //$scope.jsonData = [];
                
            };
        }]);

 });
