import { createRoot } from "react-dom/client";

function DevelopedTools() {
  // TODO: Actually implement a Cybersecurity Tools
  return <h1>Hello Tools from React :)!</h1>;
}

const devTools = document.getElementById("tools");
const root = createRoot(devTools);
root.render(<DevelopedTools />);
