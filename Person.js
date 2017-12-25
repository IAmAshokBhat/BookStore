var Person = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.prototype.getFullName = function() {
        return this.firstName + " " + this.lastName;
    };
};