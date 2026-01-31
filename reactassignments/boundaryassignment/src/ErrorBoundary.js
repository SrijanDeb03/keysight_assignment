import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }}>{this.state.errorMsg}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
