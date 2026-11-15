import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UDAAN application:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-2xl border border-red-200 shadow-xl p-6 sm:p-8 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-udaan-red flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">
                Application Rendering Notice
              </h2>
              <p className="text-xs text-slate-500">
                A rendering issue was intercepted. Resetting simulated session data will restore default state.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-900 text-slate-100 text-left rounded-xl font-mono text-[11px] overflow-x-auto max-h-40 border border-slate-700">
                <span className="text-red-400 font-bold block mb-1">
                  {this.state.error.name}: {this.state.error.message}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {this.state.error.stack?.slice(0, 300)}...
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-udaan-blue hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Stored Data & Reload</span>
              </button>

              <button
                onClick={() => { window.location.href = '/'; }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
