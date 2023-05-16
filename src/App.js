import './App.css';
import NameForm from './Components/Form';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', convertion: '', type: "Inteiro para Romano" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleChangeType.bind(this);
    this.romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  }


  integerToRoman = (value) => {
    if (/[a-zA-Z]/.test(value)) {
      this.setState({ convertion: "Valor inválido" })
    } else {
      let roman = '';
      let num = parseInt(value);
      for (let key in this.romanNumerals) {
        while (num >= this.romanNumerals[key]) {
          roman += key;
          num -= this.romanNumerals[key];
        }
      }

      console.log(roman)
      this.setState({ convertion: roman })
    }

  }

  romanToInteger = (value) => {


    let num = 0;
    if (/\d/.test(value)) {
      this.setState({ convertion: "Valor inválido" })
    } else {
      for (let i = 0; i < value.length; i++) {
        const currentNum = this.romanNumerals[value[i]];
        const nextNum = this.romanNumerals[value[i + 1]];

        if (nextNum && currentNum < nextNum) {
          num += nextNum - currentNum;
          i++;
        } else {
          num += currentNum;
        }
      }
      this.setState({ convertion: num.toString() })
    }


  }


  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.convert(event.target.value.toUpperCase())

  }
  convert = (value) => {
    if (this.state.type === "Inteiro para Romano") {
      this.integerToRoman(value)
    } else {
      this.romanToInteger(value)
    }
  }

  handleChangeType = () => {
    console.log(this.state)
    if (this.state.type === "Inteiro para Romano") {
      this.setState({ type: "Romano para inteiro" });
    } else {
      this.setState({ type: "Inteiro para Romano" });
    }
    this.setState({ value: '', convertion: '' });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NameForm
            state={this.state}
            onChange={this.handleChange}
            onchangeType={this.handleChangeType}
          />
        </header>
      </div>
    );
  }

}

export default App;
