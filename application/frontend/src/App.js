import "./App.css";
import EquationEditor from "./MathEquationEditor";
import MathEquationEditorOutput from "./MathEquationEditorOutput";

function App() {
  return (
    <div className="App">
      <div className="main-app">
        <h2>PDMR Math Equations Insertion.</h2>
        <MathEquationEditorOutput />
        {/* <EquationEditor /> */}
      </div>
    </div>
  );
}

export default App;
