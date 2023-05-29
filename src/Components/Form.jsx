import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';


class NameForm extends React.Component {


    constructor(props) {
        super(props)
        console.log("Form constructor: props", props);
    }

    render() {
        const { state, onChange, onchangeType, convert } =
            this.props;
        return (
            <div>

                <form onSubmit={convert}>

                    <div style={{ display: 'flex' ,   gap: '3vh'}}>
                        <h1>{state.type}</h1>
                        {/* <input type="submit" value="Mudar converção" onClick={onchangeType} /> */}
                        <Button variant="dark" onClick={onchangeType} > 
                            <FontAwesomeIcon icon={faExchangeAlt} /> Alterar conversão
                            </Button>
                        
                    </div>

                    <br></br>
                    <label>
                        {'Valor :'}
                        <input type="text" name="value" value={state.value} onChange={onChange} />
                        <Button variant="success"  type="submit" style={{ marginLeft: '1vh' }}> Converter
                            </Button>
                    </label>
                    
                    
                    <h3 style={{ marginTop: '3vh' }}>Conversão</h3>

                </form>
                <div>{state.convertion}</div>

            </div>

        );
    }
}

export default NameForm;
