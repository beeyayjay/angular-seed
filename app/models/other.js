(function() {
    "use strict";

    angular.module('angularSeed').factory('OtherModel', function() {
        function OtherModel() {
            this.title = "Another View";
            this.paragraphs = [
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                "Aenean massa.",
                "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
            ];
        }

        return OtherModel;
    });
})();
