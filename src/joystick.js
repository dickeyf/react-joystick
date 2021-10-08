import React from 'react';

export class Joystick extends React.Component {
  handleStart(evt) {
    console.log("Start Event: " + evt);
  }

  handleMove(evt) {
    console.log("Move Event: " + evt);
  }

  handleEnd(evt) {
    console.log("End Event: " + evt);
  }


  render() {
    return (
      <div>
        <div
          className="rounded-full h-36 w-36 flex items-center justify-center bg-gray-600 text-white font-extrabold"
          onMouseDown={this.handleStart} onTouchStart={this.handleStart}
          onMouseMove={this.handleMove} onTouchMove={this.handleMove}
          onMouseUp={this.handleEnd} onTouchEnd={this.handleEnd}
        >
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-100 text-white font-extrabold"></div>
        </div>
      </div>
    );
  }
}
