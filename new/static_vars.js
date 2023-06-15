class MyClass {
    constructor() {
        const privateVariable = 'private value'; // Private variable at the constructor scope
        this.publicVariable = 'public value'; // Public property

        this.privilegedMethod = function() {
            // Public Method with access to the constructor scope variables
            console.log(privateVariable);
        };
    }

    // Prototype methods:
    publicMethod() {
        console.log(this.publicVariable);
    }

    // Static properties shared by all instances
    static staticProperty = 'static value';

    static staticMethod() {
        console.log(this.staticProperty);
    }
}

// We can add properties to the class prototype
MyClass.prototype.additionalMethod = function() {
    console.log(this.publicVariable);
};

var myInstance = new MyClass();
myInstance.publicMethod();       // "public value"
myInstance.additionalMethod(); // "public value"
myInstance.privilegedMethod(); // "private value"
MyClass.staticMethod();