import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
    // Log to a service like Sentry, LogRocket, etc.
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const fallbackUIStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: 'var(--background-color, #fff)', // Fallback background
      color: 'var(--text-color, #333)', // Fallback text color
    };
    const titleStyle = { fontSize: '2rem', marginBottom: '1rem' };
    const messageStyle = { fontSize: '1.1rem', marginBottom: '1rem' };
    const detailsStyle = {
        fontSize: '0.9rem',
        color: '#777',
        maxWidth: '600px',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap', // To preserve formatting of error stack
        backgroundColor: 'var(--card-bg-color, #f0f0f0)',
        padding: '1rem',
        borderRadius: '5px',
        border: '1px solid var(--border-color, #ccc)',
        textAlign: 'left',
    };


    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={fallbackUIStyle}>
          <Helmet>
            <title>Error - Something Went Wrong</title>
          </Helmet>
          <h1 style={titleStyle}>Oops! Something went wrong.</h1>
          <p style={messageStyle}>
            We're sorry for the inconvenience. Please try refreshing the page, or contact support if the problem persists.
          </p>
          {/* Optionally, show error details in development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <summary>Error Details (Development Only)</summary>
                <pre style={detailsStyle}>
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{padding: '0.75rem 1.5rem', marginTop: '1.5rem', backgroundColor: 'var(--text-color, #333)', color: 'var(--background-color, #fff)', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
