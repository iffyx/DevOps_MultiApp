import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FormContainer from "./FormContainer";


class App extends Component {
  render() {
    return (
        <div className="container p-5">
            <div class="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <h3 class="d-flex justify-content-center">Power calculator</h3>
                    <FormContainer/>
                </div>
            </div>
        </div>
    );
  }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
