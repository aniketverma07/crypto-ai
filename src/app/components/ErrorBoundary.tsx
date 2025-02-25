"use client";

import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="text-red-500 text-lg font-semibold mb-2">
              Something went wrong
            </div>
            <div className="text-gray-400 text-sm mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </div>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
