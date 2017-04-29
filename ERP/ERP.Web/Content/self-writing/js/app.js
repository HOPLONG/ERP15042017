
var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngMask', 'ngRoute', 'smart-table', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngMaterial', 'debounce']);



function ErrorSystem(errorString) {
    new PNotify({
        title: 'Thất bại',
        text: errorString,
        addclass: 'bg-danger'
    });
}

function SuccessSystem(errorString) {
    new PNotify({
        title: 'Thành Công',
        text: errorString,
        addclass: 'bg-danger'
    });
}


