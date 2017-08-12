(function() {
  angular.module('appPrincipal').component('paginator', {
    binding:{
      url: '@',
      pages: '@',
    },
    controller: [
      '$location',
      function($location) {
        this.$onInit = function() {
            const pages = parseInt(this.pages) || 1
            this.pagesArray = Array(pages).fill(0).map((e,i) => i + 1)
        }

        this.current = parseInt($location.search().page) || 1
        this.needPagination = this.pages > 1
        this.hasPrev = this.current > 1
        this.hasNext = this.current < this.pages

        this.isCurrent = function(i) {
          return this.current == i

        }
      }
    ],
    template: `
    <ul ng-if="$ctrl.needPagination" class="pagination">
      <li ng-disabled="$ctrl.hasPrev">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1}}"> Anterior </a>
      </li>

      <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
        <a href="{{ $ctrl.url }}?page={{ index }}">{{index}}</a>
      </li>

      <li ng-disabled="$ctrl.hasNext">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1}}"> Próximo </a>
      </li>
      </ul>

    `
  })
})()
