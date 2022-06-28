import './App.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import AddItemFields from "./components/addItemFields";
import Chart from "./components/chart";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AddItemFields/>
                <Chart/>
            </Provider>
        </div>
    );
}

export default App;
