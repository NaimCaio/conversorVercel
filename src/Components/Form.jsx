import React from 'react';
class NameForm extends React.Component {
    
    constructor(props){
        super(props)
        console.log("Form constructor: props", props);
    }

    render() {
        const { state,onChange, onchangeType, } =
        this.props;
        return (
            <div>
                <h1>{state.type}</h1>
                <br></br>
                <label>
                    {'Valor :'}
                    <input type="text" value={state.value} onChange={onChange} />
                </label>
                <input type="submit" value="Mudar converção" onClick={onchangeType} />
                <br></br>
                <h3>Conversão</h3>
                <div>{state.convertion}</div>
            </div>

        );
    }
}

export default NameForm;
