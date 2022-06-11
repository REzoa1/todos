import "./App.css";
import { TodoList } from "./components/Todos";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
