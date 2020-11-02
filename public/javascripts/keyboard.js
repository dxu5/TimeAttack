export default class KeyboardState {
  constructor() {
    //Holds the current state of a given key
    this.keyStates = {};
    //Holds callback functions for a keycode
    this.keyMap = {};
  }

  addMapping(keyCode, callback) {
    this.keyMap[keyCode] = callback;
  }

  handleEvent(event) {
    const keyCode = event.keyCode;

    if (this.keyMap[keyCode] === undefined) {
      return;
    }

    event.preventDefault();
    const keyState = event.type === "keydown" ? 1 : 0;

    if (this.keyStates[keyCode] === keyState) {
      return;
    }

    this.keyStates[keyCode] = keyState;

    this.keyMap[keyCode](keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
