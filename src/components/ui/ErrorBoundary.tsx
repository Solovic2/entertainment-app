import React, { Component } from "react";
import Error from "../shared/Error";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMsg: error.message });
  }

  render() {
    if (this.state.hasError) {
      return <Error message={this.state.errorMsg} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
