'use strict';

var theModule = angular.module('SinglePageMath', [
      'ngResource'
    ]);

function CountController($scope, $resource, $location){
    console.log("MathController() created.");
    $scope.number1
    $scope.number2
    $scope.operation
    $scope.answer
    $scope.answers =[];

   $scope.operations = [
        {symbol:"+", name:"add"},
        {symbol:"-", name:"subtract"},
        {symbol:"*", name:"multiply"},
        {symbol:"/", name:"divide"},
        {symbol:"%", name:"modulo"},
        {symbol:"^", name:"exponent"}
    ];

$scope.outstandingReqs  = 0;
     $scope.compute = this.compute = function(op, n1, n2){
        //console.log("MathController.doCompute() called.");
        if(!n1 || !n2 || !op){
            return false;
        }

        var operation = op;//$scope.operation.name;
        var number1=n1;
        var number2=n2;
        var url = "http://localhost:9091/"+operation+"/"+number1+"/"+number2;
        $scope.outstandingReqs = $scope.outstandingReqs + 1;

        $.ajax({
            url: url,
        })
        .done(function( data ) {
            $scope.outstandingReqs = $scope.outstandingReqs - 1;
            $scope.answers.push(data);
            $scope.elapsedTime = new Date().getTime() - startTm
            if ($scope.outstandingReqs < 1 )
                $scope.$apply()
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            alert( "ERROR:" + jqXHR.statusText + ":" + jqXHR.status+":" + jqXHR.responseText )
        });

      return false;
    }//compute

    var startTm = new Date().getTime()
    $scope.doCompute = function( ){
        //console.log("MathController.doCompute() called.");
        if(!$scope.number1 || !$scope.number2 || !$scope.operation){
            return false;
        }
        $scope.compute($scope.operation, $scope.number1, $scope.number2)
        return this;
    };

    var ops = ["add","multiply"];
  ///// fillup the answers list
  for(var i=0; i!= 5000;++i){
    $scope.compute ( ops[i%2], Math.random() * 100, Math.random() * 100  )
  }
}
CountController.$inject = ["$scope", "$resource", "$location"];

theModule.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: "CountController"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
