import React from 'react';

export class Joystick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moving: false
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }


  handleStart(evt) {
    console.log(evt);
    const startX = evt.clientX;
    const startY = evt.clientY;
    console.log("Starting at %d, %d", startX, startY);
    this.setState({
        moving: true,
        startX: startX,
        startY: startY,
        distance: 0,
        angle: 0
      }
    );
  }

  handleMove(evt) {
    //console.log(evt);
    if (this.state.moving) {
      let diffX = evt.clientX - this.state.startX;
      let diffY = evt.clientY - this.state.startY;
      let distance = Math.hypot(diffX, diffY);
      let angle = Math.atan2(diffY, diffX);
      console.log("Moving: Distance is %d and angle is.", distance, angle);

      this.setState({
          moving: this.state.moving,
          startX: this.state.startX,
          startY: this.state.startY,
          distance: distance,
          angle: angle
        }
      );

    }
  }

  handleEnd(evt) {
    //console.log(evt);
    this.setState({
        moving: false
      }
    );
  }


  render() {
    return (
      <div>
        <div
          className="rounded-full h-36 w-36 flex items-center justify-center bg-gray-600"
          onMouseDown={this.handleStart} onTouchStart={this.handleStart}
          onMouseMove={this.handleMove} onTouchMove={this.handleMove}
          onMouseUp={this.handleEnd} onTouchEnd={this.handleEnd}
        >
          <div className="rounded-full h-12 w-12 bg-gray-100"></div>
        </div>
      </div>
    );
  }
}
