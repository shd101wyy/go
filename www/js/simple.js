
class Simple {
  constructor() {
    this.state = {}
    this.$el = null
  }
}



class Button extends Simple {
  constructor() {
    super()
  }

  render() {
    return `
      <div class="button"> </div>
    `
  }
}

class Page extends Page {
  constructor() {
    super()
  }

  render() {
    return `
    <Button> </Button>
    `
  }
}
