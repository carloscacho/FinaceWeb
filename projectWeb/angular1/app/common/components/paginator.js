(function(){
    angular.module('appPrincipal')
    .component('paginator', {
        bindings: {
            url: '@',
            pages: '@'
        },
        controller: [
            '$location',
            function($location) {
                this.$onInit = function() {
                    this.numpages = parseInt(this.pages) || 1
                    this.arrayPages = Array(this.numpages).fill(0).map((e, i) => i + 1);
          
                    this.current = parseInt($location.search().page) || 1
   
                    this.needPagination = this.pages > 1
                    
                    this.hasPrev = this.current > 1
                    
                    this.hasNext = this.current < parseInt(this.pages)
    
                    this.isCurrent = function(i) {
                       return this.current == i
                    }
                    
                }


            }
        ],
        template: `
            <ul ng-if="$ctrl.needPagination" class="pagination pull-right no-margin">

                <li ng-if="$ctrl.hasPrev" class="paginate_button previous">
                    <a href="{{ $ctrl.url }}?page={{$ctrl.current - 1}}" >Anterior</a>
                </li>

                <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.arrayPages">
                    <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
                </li>


                <li ng-if="$ctrl.hasNext" class="paginate_button next">
                    <a href="{{ $ctrl.url }}?page={{$ctrl.current + 1}}" >Próximo</a>
                </li>
            </ul>
        `
    })
})()