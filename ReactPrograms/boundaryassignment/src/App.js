import React from "react";
import ErrorBoundary from "./ErrorBoundary";

// Error Component 1
function ErrorComp1() {
  throw new Error("Error from first component");
}

// Normal Component
function Comp2() {
  return <p>you are doing well !!</p>;
}

// Error Component 3
function ErrorComp3() {
  throw new Error("Error from third component");
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <ErrorComp1 />
      </ErrorBoundary>

      <ErrorBoundary>
        <Comp2 />
      </ErrorBoundary>

      <ErrorBoundary>
        <ErrorComp3 />
      </ErrorBoundary>
    </div>
  );
}

export default App;
