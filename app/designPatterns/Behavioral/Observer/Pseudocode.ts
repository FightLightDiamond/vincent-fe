// The creator class declares the factory method that must
// return an object of a product class. The creator's subclasses
// usually provide the implementation of this method.
abstract class Dialog {
  // The creator may also provide some default implementation
// of the factory method.
  abstract createButton(): Button

// Note that, despite its name, the creator's primary
// responsibility isn't creating products. It usually
// contains some core business logic that relies on product
// objects returned by the factory method. Subclasses can
// indirectly change that business logic by overriding the
// factory method and returning a different type of product
// from it.
  render() {
    // Call the factory method to create a product object.
    const okButton: Button = this.createButton()
// Now use the product.
    okButton.onClick(() => {
      console.log('Click')
    })
    okButton.render()
  }

}

// Concrete creators override the factory method to change the
// resulting product's type.
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }

}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton()
  }
}

// The product interface declares the operations that all
// concrete products must implement.
interface Button {
  render()
  onClick(f)
}

// Concrete products provide various implementations of the
// product interface.
class WindowsButton implements Button {
  render() {}
// Render a button in Windows style.
  onClick(f) {}
}


// Bind a native OS click event.

class HTMLButton implements Button {
  render() {}
  // Return an HTML representation of a button.
  onClick(f) {}
}

// Config
const getConfig = () => {
  return {
    OS: 'Windows'
  }
}

// Bind a web browser click event.
class Application {
  dialog: Dialog

// The application picks a creator's type depending on the
// current configuration or environment settings.
  initialize() {
    let config = getConfig()
    if (config.OS == "Windows") {
      this.dialog = new WindowsDialog()
    } else if (config.OS == "Web")  {
      this.dialog = new WebDialog()
    } else
    throw new Error("Error! Unknown operating system.")
  }


// The client code works with an instance of a concrete
// creator, albeit through its base interface. As long as
// the client keeps working with the creator via the base
// interface, you can pass it any creator's subclass.
  main() {
    this.initialize()
    this.dialog.render()
  }
}


