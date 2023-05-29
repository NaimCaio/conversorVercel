import './App.css';
import NameForm from './Components/Form';
import React from 'react';
import { int2romanFast, roman2int, validateRoman } from "./roman.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', convertion: '', type: "Inteiro para Romano" };

    this.handleChange = this.handleChange.bind(this);
  }


  integerToRoman = (value) => {
    if (/[a-zA-Z]/.test(value)) {
      this.setState({ convertion: "Valor inválido" })
    } else {
      let roman = int2romanFast(value);
      this.setState({ convertion: roman })
    }

  }

  romanToInteger = (value) => {
    if (validateRoman(value).length !== 0) {
      this.setState({ convertion: "Valor inválido" })
    } else {
      let integer = roman2int(value);
      this.setState({ convertion: integer.toString() })
    }
  }


  handleChange = (event) => {
    this.setState({ value: event.target.value });
    //this.convert(event.target.value.toUpperCase())

  }
  convert = (event) => {
    event.preventDefault();
    if (this.state.type === "Inteiro para Romano") {
      this.integerToRoman(this.state.value)
    } else {
      this.romanToInteger(this.state.value)
    }
  }

  handleChangeType = () => {
    console.log(this.state)
    if (this.state.type === "Inteiro para Romano") {
      this.setState({ type: "Romano para inteiro" });
    } else {
      this.setState({ type: "Inteiro para Romano" });
    }
    this.setState({ value: this.state.convertion, convertion: this.state.value });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NameForm
            state={this.state}
            onChange={this.handleChange}
            onchangeType={this.handleChangeType}
            convert= {this.convert}
          />
        </header>
      </div>
    );
  }

}

export default App;
