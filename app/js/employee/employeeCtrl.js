myApp.controller('EmployeeCtrl', ['$scope', 'ngDialog', '$rootScope' ,function($scope, ngDialog, $rootScope){

	
	$scope.saveData = function(){
		var addEmployeeObj = {
								fName: $scope.employee.fName,
								mName: $scope.employee.mName,
								lName: $scope.employee.lName,
								cNumber: $scope.employee.cNumber,
								email: $scope.employee.email,
							};
		$rootScope.$broadcast('addEmployee', addEmployeeObj);
		ngDialog.close();
	};

	
}]);