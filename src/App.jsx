import { ReactFlowProvider } from "reactflow";
import ComponentTree from "./components/ComponentTree";

export default function App() {
  return (
    <ReactFlowProvider>
      <ComponentTree />
    </ReactFlowProvider>
  );
}
