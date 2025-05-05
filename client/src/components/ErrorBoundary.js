import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render(error) {
    if (this.state.hasError) {
      return (
        <main class="main">
          <div class="error">
            <div class="error__title">
              <h2 class="heading-secondary heading-secondary--error">
                錯誤頁面
              </h2>
              <h2 class="error__emoji">😢 🤯</h2>
            </div>
            <div class="error__msg">{error.response.data.message}</div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
