angular.module('starter.controllers', [])

.controller('groupScheduleCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.updateSchedule = function () {
        if ($scope.data.ScheduleDate == 'undefined') {
            $scope.data.ScheduleDate = new Date();
        }

        var date = $scope.data.ScheduleDate;

        var day = date.getDate();
        var monthIndex = date.getMonth()+1;
        var year = date.getFullYear();

        var dateString = year + '-' + monthIndex + '-' + day; // 2015-05-27
        var groupId = $scope.data.SelectedGroup.StudentGroupId;
        var dailyScheduleUrl = 'http://wiki.nayanova.edu/api.php?action=dailySchedule&date=' + dateString + '&groupIds=' + groupId;

        $http.get(dailyScheduleUrl).
            then(function (response) {
                $scope.Schedule = response.data[0];                
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }
        );
    }    
    

    // groupScheduleCtrl
    $http.get('http://wiki.nayanova.edu/api.php?action=list&listtype=mainStudentGroups').
        then(function (response) {
            $scope.ScheduleDate = new Date();
            $scope.GroupList = response.data;
            if ($scope.GroupList.length > 0) {
                $scope.data.ScheduleDate = new Date();
                $scope.data.SelectedGroup = $scope.GroupList[0];
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    );

    $scope.data = {};

    $scope.weekCount = 18;    
    $scope.getNumber = function (num) {
        return new Array(num);
    }
    // groupScheduleCtrl    
}])

.controller('teacherScheduleCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.updateSchedule = function () {
        if ($scope.data.ScheduleWeek == 'undefined') {
            $scope.data.ScheduleWeek = 1;
        }

        var week = $scope.data.ScheduleWeek;
        var teacherId = $scope.data.SelectedTeacher.TeacherId;

        var weekScheduleUrl = 'http://wiki.nayanova.edu/api.php?action=TeacherWeekSchedule&teacherId=' + teacherId + '&week=' + week;

        $http.get(weekScheduleUrl).
            then(function (response) {
                $scope.Schedule = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }
        );
    }

    // teacherScheduleCtrl
    $http.get('http://wiki.nayanova.edu/api.php?action=list&listtype=teachers').
        then(function (response) {
            $scope.data.ScheduleWeek = 1;
            $scope.TeacherList = response.data;
            if ($scope.TeacherList.length > 0) {
                $scope.data.SelectedTeacher = $scope.TeacherList[0];
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    );

    $scope.data = {};
    // teacherScheduleCtrl
}])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
