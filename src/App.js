import './App.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import AddItemFields from "./components/addItemFields";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AddItemFields />
      </Provider>
    </div>
  );
}

export default App;
