var myApp = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngDialog']);

myApp.controller('MainController', ['$scope', 'ngDialog', function($scope, ngDialog){

	$scope.createNewEmployee = function(){
		ngDialog.open({ template: 'view/employee/createEditEmployee.html', className: 'ngdialog-theme-default' });
	};


}]);

myApp.factory('employeeList', ['$timeout', '$http',function($timeout, $http){
	var jsonPath = 'service/employeeList.json';
	var employeeList = {
		fetch: function(callback){
			return $timeout(function(){
				return $http.get(jsonPath).then(function(response){
					return response.data;
				});
			}, 30);
		}
	};

	return employeeList;
}]);