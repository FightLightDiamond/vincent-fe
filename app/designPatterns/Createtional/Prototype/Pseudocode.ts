// Base prototype.
abstract class Shape {
  X: number
  Y: number
  color: string

// The prototype constructor. A fresh object is initialized
// with values from the existing object.
  protected constructor(source?: Shape) {
    if(source) {
      this.X = source.X
      this.Y = source.Y
      this.color = source.color
    }
  }


// The clone operation returns one of the Shape subclasses.
  abstract clone(): Shape
}

// Concrete prototype. The cloning method creates a new object
// and passes it to the constructor. Until the constructor is
// finished, it has a reference to a fresh clone. Therefore,
// nobody has access to a partly-built clone. This keeps the
// cloning result consistent.
class Rectangle extends Shape {
  width: number
  height: number

  constructor(source?: Rectangle) {
    // A parent constructor call is needed to copy private
    // fields defined in the parent class.
    if(source) {
      super(source)
      this.width = source.width
      this.height = source.height
    }
  }

  clone(): Shape {
    return new Rectangle(this)
  }
}

class Circle extends Shape {
  radius: number

  constructor(source?: Circle) {
    if(source) {
      super(source)
      this.radius = source.radius
    }
  }

  clone(): Shape {
    return new Circle(this)
  }
}

// Somewhere in the client code.
class Application {
  shapes: Shape[]

  constructor() {
    const circle: Circle = new Circle()
    circle.X = 10
    circle.Y = 10
    circle.radius = 20

    this.shapes.push(circle)

    const anotherCircle: Shape = circle.clone()
    this.shapes.push(anotherCircle)
    // The `anotherCircle` variable contains an exact copy
    // of the `circle` object.

    const rectangle: Rectangle = new Rectangle()
    rectangle.width = 10
    rectangle.height = 20
    this.shapes.push(rectangle)
  }

  businessLogic() {
    // Prototype rocks because it lets you produce a copy of
    // an object without knowing anything about its type.

    const shapesCopy = []

    // For instance, we don't know the exact elements in the
    // shapes array. All we know is that they are all
    // shapes. But thanks to polymorphism, when we call the
    // `clone` method on a shape the program checks its real
    // class and runs the appropriate clone method defined
    // in that class. That's why we get proper clones
    // instead of a set of simple Shape objects.
    this.shapes.map((s) => {
      shapesCopy.push(s.clone())
    })

    // The `shapesCopy` array contains exact copies of the
    // `shape` array's children.
  }
}
