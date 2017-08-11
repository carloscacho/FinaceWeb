(function() {
  angular.module('appPrincipal').component('field', {
    bindings: {
      id:'@',
      label: '@',
      grid: '@',
      placeh: '@',
      type: '@',
      model: '=',
      readonly: '<'
    },
    controller:[
      'gridSystem',
      function(gridSystem) {
        this.$onInit = () => {
        this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses}}">
      <div class="form-group">
        <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
        <input type="{{$ctrl.type}}" name="{{$ctrl.id}}" id="{{$ctrl.id}}"
        placeholder="{{$ctrl.placeh}}" class="form-control"
        ng-model="$ctrl.model" ng-readonly="$ctrl.readonly"/>
      </div>
    </div>
    `
  })
})()
