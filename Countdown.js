'use strict';
(function (angular) {

    
    /**
     * @ngdoc directive
     * @name hsWechat.directives.directive:CountDownDirective
     *
     * @restrict A
     *
     * @description
     * CountDownDirective
     * @example
     *  <div motion='xxx()'></div>
     */
    CountDownDirective.$inject = [];
    function CountDownDirective(){
        return {
            restrict: 'A',
            replace:false,
            controller: ['$scope','$element','$attrs' ,'SharedState','$interval', function ($scope,$element,$attrs,SharedState,$interval) {
                var curr = new Date();
                var start = new Date($attrs.startDate);
                var diffSecond = Math.floor((start.getTime() - curr.getTime()) / 1000);

                if (diffSecond < 0) {
                    $element[0].style.display = 'none';
                    return ;
                }

                var diff = $scope[$attrs.countdown] = {
                        date: 0,
                        hour: 0,
                        minute: 0,
                        second: 0,
                        dateStr: '00',
                        hourStr: '00',
                        minuteStr: '00',
                        secondStr: '00'
                    };  //倒计时

                function countTime() {
                    if (diffSecond > 0) {
                        diff.date =  Math.floor(diffSecond / (60 * 60 * 24));
                        diff.hour = Math.floor(diffSecond / (60 * 60)) - (diff.date * 24);
                        diff.minute = Math.floor(diffSecond / 60) - (diff.date * 24 * 60) - (diff.hour * 60);
                        diff.second = Math.floor(diffSecond) - (diff.date * 24 * 60 * 60) - (diff.hour * 60 * 60) - (diff.minute * 60);
                    }
                    diffSecond--;
                    diff.dateStr = diff.date < 10 ? '0'+diff.date : diff.date+'';
                    diff.hourStr = diff.hour < 10 ? '0'+diff.hour : diff.hour+'';
                    diff.minuteStr = diff.minute < 10 ? '0'+diff.minute : diff.minute+'';
                    diff.secondStr = diff.second < 10 ? '0'+diff.second : diff.second+'';
                }
                //弹窗-倒计时
                $interval(countTime, 1000);
                countTime();
            }],
            link: function(scope, element, attrs, ngModel) {
            }
        };
    }
    angular.module('jf.plugins.countdown', []).directive('countdown', CountDownDirective);
})(angular);