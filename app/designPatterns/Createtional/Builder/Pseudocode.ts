// Using the Builder pattern makes sense only when your products
// are quite complex and require extensive configuration. The
// following two products are related, although they don't have
// a common interface.
class Car {

}
// A car can have a GPS, trip computer and some number of
// seats. Different models of cars (sports car, SUV,
// cabriolet) might have different features installed or
// enabled.

class Manual {

}
// Each car should have a user manual that corresponds to
// the car's configuration and describes all its features.


// The builder interface specifies methods for creating the
// different parts of the product objects.
interface Builder {
 reset()
 setSeats(seat)
 setEngine(engine)
 setTripComputer(tripComputer)
 setGPS(gps)
}

// The concrete builder classes follow the builder interface and
// provide specific implementations of the building steps. Your
// program may have several variations of builders, each
// implemented differently.
class CarBuilder implements Builder {
  private car:Car
  // A fresh builder instance should contain a blank product
// object which it uses in further assembly.
  constructor() {
    this.reset()
  }

// The reset method clears the object being built.
 reset() {
   this.car = new Car()
 }

// All production steps work with the same product instance.
 setSeats(seat) {
   // Set the number of seats in the car.
 }

 setEngine(engine) {
   // Install a given engine.
 }

 setTripComputer(tripComputer) {
   // Install a trip computer.
 }

 setGPS(gps) {
   // Install a global positioning system.
 }

 getProduct():Car {
   const product = this.car
   this.reset()
   return product
 }
}

// Concrete builders are supposed to provide their own
// methods for retrieving results. That's because various
// types of builders may create entirely different products
// that don't all follow the same interface. Therefore such
// methods can't be declared in the builder interface (at
// least not in a statically-typed programming language).
//
// Usually, after returning the end result to the client, a
// builder instance is expected to be ready to start
// producing another product. That's why it's a usual
// practice to call the reset method at the end of the
// `getProduct` method body. However, this behavior isn't
// mandatory, and you can make your builder wait for an
// explicit reset call from the client code before disposing
// of the previous result.

// Unlike other creational patterns, builder lets you construct
// products that don't follow the common interface.
class CarManualBuilder implements Builder {
  private manual:Manual

  constructor() {
    this.reset()
  }

 reset() {
   this.manual = new Manual()
 }

 setSeats() {
   // Document car seat features.
 }

 setEngine() {
   // Add engine instructions.
 }

 setTripComputer() {
   // Add trip computer instructions.
 }

 setGPS() {
   // Add GPS instructions.
 }

 getProduct():Manual {
   // Return the manual and reset the builder.
   return new Manual()
 }
}

class SportEngine {

}

// The director is only responsible for executing the building
// steps in a particular sequence. It's helpful when producing
// products according to a specific order or configuration.
// Strictly speaking, the director class is optional, since the
// client can control builders directly.
class Director {
  private builder:Builder

// The director works with any builder instance that the
// client code passes to it. This way, the client code may
// alter the final type of the newly assembled product.
 setBuilder(builder:Builder) {
   this.builder = builder
 }

// The director can construct several product variations
// using the same building steps.
 constructSportsCar(builder: Builder) {
   builder.reset()
   builder.setSeats(2)
   builder.setEngine(new SportEngine())
   builder.setTripComputer(true)
   builder.setGPS(true)
 }

 constructSUV(builder: Builder) {
   builder.reset()
   builder.setSeats(3)
   builder.setEngine(new SportEngine())
   builder.setTripComputer(false)
   builder.setGPS(false)
 }
}

// The client code creates a builder object, passes it to the
// director and then initiates the construction process. The end
// result is retrieved from the builder object.
class Application {
  makeCar() {
    // Create Director
    const director = new Director()
    // Create builder
    const builder: CarBuilder = new CarBuilder()
    director.constructSportsCar(builder)
    const car: Car = builder.getProduct()

    const builder2: CarManualBuilder = new CarManualBuilder()
    director.constructSportsCar(builder)

// The final product is often retrieved from a builder
// object since the director isn't aware of and not
// dependent on concrete builders and products.
    const manual: Manual = builder2.getProduct()
  }
}

