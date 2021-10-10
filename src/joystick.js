import React from 'react';

export class Joystick extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      moving: false,
      posX:0,
      posY:0,
      distance:0,
      angle:0
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.onJoystickMovement = props.onJoystickMovement;
  }

  componentDidMount() {
    const height = this.joystickElement.clientHeight;
    let state = this.state;
    state.joystickRadius = height/2;
    this.setState(state);
  }


  handleStart(evt) {
    let startX = evt.clientX;
    let startY = evt.clientY;
    let touchId = undefined;
    if (evt.changedTouches) {
      startX = evt.changedTouches[0].clientX;
      startY = evt.changedTouches[0].clientY;
      touchId = evt.changedTouches[0].identifier;
    }

    this.setState({
        moving: true,
        startX: startX,
        startY: startY,
        touchId: touchId,
        distance: 0,
        angle: 0
      }
    );
  }

  handleMove(evt) {
    if (this.state.moving) {
      if (evt.changedTouches) {
        let changedTouch;
        for( let i =0; i<evt.changedTouches.length; i++) {
          if (evt.changedTouches[i].identifier === this.state.touchId) {
            changedTouch = evt.changedTouches[i];
          }
        }

        if (changedTouch) {
          evt.clientX = changedTouch.clientX;
          evt.clientY = changedTouch.clientY;
        } else {
          return;
        }
      }

      let diffX = evt.clientX - this.state.startX;
      let diffY = evt.clientY - this.state.startY;
      let distance = Math.hypot(diffX, diffY);
      let normalizedDistance = Math.min(distance/this.state.joystickRadius, 1.0);
      let angle = Math.atan2(diffY, diffX);
      let posX = Math.cos(angle) * normalizedDistance;
      let posY = Math.sin(angle) * normalizedDistance;

      let newState = {
          moving: this.state.moving,
          startX: this.state.startX,
          startY: this.state.startY,
          distance: normalizedDistance,
          angle: angle,
          posX: posX,
          posY: posY
        };
      this.setState(newState);

      if (this.onJoystickMovement) {
        this.onJoystickMovement(newState);
      }
    }
  }

  handleEnd(evt) {
    if (evt.changedTouches) {
      if (this.state.touchId !== evt.changedTouches[0].identifier) return;

      evt.preventDefault();
    }
    let newState = {
      moving: false,
      posX:0,
      posY:0,
      distance:0,
      angle:0
    };
    this.setState(newState);
    if (this.onJoystickMovement) {
      this.onJoystickMovement(newState);
    }
  }

  render() {
    const styles = {
      transform: `translate(${this.state.posX*100}%, ${this.state.posY*100}%)`
    };
    return (
      <div className="h-full w-full flex items-center justify-center"
           onMouseMove={this.handleMove} onTouchMove={this.handleMove}
           onMouseUp={this.handleEnd} onTouchEnd={this.handleEnd}
           onMouseLeave={this.handleEnd}
      >
        <div
          className="rounded-full h-36 w-36 bg-gray-600 flex items-center justify-center"
          onMouseDown={this.handleStart} onTouchStart={this.handleStart}
          onMouseMove={this.handleMove} onTouchMove={this.handleMove}
          onMouseUp={this.handleEnd} onTouchEnd={this.handleEnd}
          ref={ (element) => { this.joystickElement = element } }
        >
          <div style={styles} className="rounded-full h-12 w-12 bg-gray-100"></div>
        </div>
      </div>
    );
  }
}
