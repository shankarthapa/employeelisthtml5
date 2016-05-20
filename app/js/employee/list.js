myApp.controller('EmployeeList', ['$scope', 'ngDialog', 'employeeList', '$rootScope', function($scope, ngDialog, employeeList, $rootScope){

  $scope.collection = [];
  employeeList.fetch().then(function(data){
    $scope.employeeList = data;

    $scope.displayed = [].concat($scope.collection);
    for(var e in data){
      var addObj = {
                      fName:data[e].fName,
                      mName:data[e].mName,
                      lName:data[e].lName,
                      cNumber:data[e].cNumber,
                      email:data[e].email,
                    };

      $scope.collection.push(addObj);
    }

  });

  $rootScope.$on('addEmployee', function(evt, arg){
    var isEdit = false;
    for(var obj in $scope.collection){
      if($scope.collection[obj].fName === arg.fName){
        isEdit = true;
        $scope.collection[obj].fName = arg.fName;
        $scope.collection[obj].mName = arg.mName;
        $scope.collection[obj].lName = arg.lName;
        $scope.collection[obj].cNumber = arg.cNumber;
        $scope.collection[obj].email = arg.email;
      }
    }
    if(!isEdit && arg.fName !== '') $scope.collection.push(arg);
  });

  $scope.editEmployee = function(employee){
    $scope.employee = employee;

    ngDialog.open({ 
        template: 'view/employee/createEditEmployee.html', 
        className: 'ngdialog-theme-default',
        plain: false,
        scope : $scope
      });
    
  };

  $scope.deleteEmployee = function(employee){
    for(var obj in $scope.collection){
      if($scope.collection[obj].fName === employee.fName){
        $scope.collection.splice(obj, 1);
        break;
      }
    }
  };


}]);


myApp.filter('customFilter', ['$filter', function($filter) {
      var filterFilter = $filter('filter');
      var standardComparator = function standardComparator(obj, text) {
        text = ('' + text).toLowerCase();
        return ('' + obj).toLowerCase().indexOf(text) > -1;
      };

      return function customFilter(array, expression) {
        function customComparator(actual, expected) {

          var isBeforeActivated = expected.before;
          var isAfterActivated = expected.after;
          var isLower = expected.lower;
          var isHigher = expected.higher;
          var higherLimit;
          var lowerLimit;
          var itemDate;
          var queryDate;

          ///if (myApp.isObject(expected)) {
            //exact match
            if (expected.distinct) {
              if (!actual || actual.toLowerCase() !== expected.distinct.toLowerCase()) {
                return false;
              }

              return true;
            }

            //matchAny
            if (expected.matchAny) {
              if (expected.matchAny.all) {
                return true;
              }

              if (!actual) {
                return false;
              }

              for (var i = 0; i < expected.matchAny.items.length; i++) {
                if (actual.toLowerCase() === expected.matchAny.items[i].toLowerCase()) {
                  return true;
                }
              }

              return false;
            }

            //date range
            if (expected.before || expected.after) {
              try {
                if (isBeforeActivated) {
                  higherLimit = expected.before;

                  itemDate = new Date(actual);
                  queryDate = new Date(higherLimit);

                  if (itemDate > queryDate) {
                    return false;
                  }
                }

                if (isAfterActivated) {
                  lowerLimit = expected.after;


                  itemDate = new Date(actual);
                  queryDate = new Date(lowerLimit);

                  if (itemDate < queryDate) {
                    return false;
                  }
                }

                return true;
              } catch (e) {
                return false;
              }

            } else if (isLower || isHigher) {
              //number range
              if (isLower) {
                higherLimit = expected.lower;

                if (actual > higherLimit) {
                  return false;
                }
              }

              if (isHigher) {
                lowerLimit = expected.higher;
                if (actual < lowerLimit) {
                  return false;
                }
              }

              return true;
            }
            //etc

            ///return true;

          ///}
          return standardComparator(actual, expected);
        }

        var output = filterFilter(array, expression, customComparator);
        return output;
      };
    }]);