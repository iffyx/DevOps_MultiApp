import React from "react";
import axios from 'axios';

class FormContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            base: null,
            exponent: null,
            result: ''
        };
    }

    handleClick = (event) => {
        const data = {
            base: this.state.base,
            exponent: this.state.exponent
        };

        axios.post('/api/power/', data).then(response => {
            this.setState({
                result: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    };


    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="firstNumber">Enter first number</label>
                    <input
                        class="form-control"
                        id="base"
                        type='number'
                        name='base'
                        value={this.state.base}
                        onChange={e => this.setState({ base: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondNumber">Enter second number</label>
                    <input
                        class="form-control"
                        id="exponent"
                        type='number'
                        name='exponent'
                        value={this.state.exponent}
                        onChange={e => this.setState({ exponent: e.target.value })}
                    />
                </div>
                <div>{this.state.result}</div>
                <br/>
                <button
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    disabled={!this.state.base || !this.state.exponent}
                >Calculate</button>
            </div>
        );
    }
}


export default FormContainer;