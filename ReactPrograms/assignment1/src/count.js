

import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  add = () => {
    this.setState({ count: this.state.count + 1 });
  };

  subtract = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="outer-box">
        <h2>Counter</h2>

        <p className="count">{this.state.count}</p>

        <div className="btn-group">
          <button onClick={this.add}>+ Add</button>
          <button onClick={this.subtract}>- Subtract</button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Counter;