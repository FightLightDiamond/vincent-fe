// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
// products of another variant.
interface GUIFactory {
  createButton(): IButton
  createCheckbox(): ICheckbox
}

// Concrete factories produce a family of products that belong
// to a single variant. The factory guarantees that the
// resulting products are compatible. Signatures of the concrete
// factory's methods return an abstract product, while inside
// the method a concrete product is instantiated.
class WinFactory implements GUIFactory {
  createButton(): IButton {
    return new WinButton()
  }

  createCheckbox(): ICheckbox {
    return new WinCheckbox()
  }
}

// Each concrete factory has a corresponding product variant.
class MacFactory implements GUIFactory {
  createButton(): IButton {
    return new MacButton()
  }

  createCheckbox(): ICheckbox {
    return new MacCheckbox()
  }
}

// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
interface IButton {
  paint()
}

// Concrete products are created by corresponding concrete
// factories.
class WinButton implements IButton {
  paint() {
    // Render a button in Windows style.
  }
}

class MacButton implements IButton {
  paint() {
    // Render a button in macOS style.
  }
}

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface ICheckbox {
  paint()
}

class WinCheckbox implements ICheckbox {
  paint() {
    // Render a checkbox in Windows style.
  }
}

class MacCheckbox implements ICheckbox {
  paint() {
    // Render a checkbox in macOS style.
  }
}

// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
class Application {
  private factory: GUIFactory
  private button: IButton

  constructor(factory: GUIFactory) {
    this.factory = factory
  }

  createUI() {
    this.button = this.factory.createButton()
  }

  paint() {
    this.button.paint()
  }
}

const readApplicationConfigFile = () => {
  return {
    OS: "Windows"
  }
}

// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
class ApplicationConfigurator {
  factory

  main() {
    const config = readApplicationConfigFile()
    if (config.OS == "Windows") {
      this.factory = new WinFactory()
    } else if (config.OS == "Mac") {
      this.factory = new MacFactory()
    } else {
      throw new Error("Error! Unknown operating system.")
    }

    let app = new Application(this.factory)
  }
}
