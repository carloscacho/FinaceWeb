(function () {
  angular.module('appPrincipal')
    .component('valueBox', {
      bindings:{
        grid: '@',
        color: '@',
        value: '@',
        text: '@',
        icon: '@'
      },
      controller: [
        'gridSystem',
        function(gridSystem) {
          this.$onInit = () => {
          this.gridClass = gridSystem.toCssClasses(this.grid)
        }
      }
      ],
      template: `
      <div class="{{$ctrl.gridClass}}">
        <div class="small-box bg-{{$ctrl.color}}">
          <div class="inner">
            <h3>{{$ctrl.value}}</h3>
            <p> {{$ctrl.text}}</p>
          </div>
          <div class="icon">
            <i class="fa {{$ctrl.icon}}"></i>
          </div>
        </div>
      </div>
      `
    })
})()
