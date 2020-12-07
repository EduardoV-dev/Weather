import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

// Error state
const useError = (initialState) => {
    const [error, setError] = useState(initialState);

    // update the error state
    // value = true | false
    const updateError = value => {
        setError(value);
    }

    return { error, updateError };
}

const Form = ({ updateApiInfo, data, insertData, updateApiState }) => {

    const { city, country } = data;

    const { error, updateError } = useError(false);

    // On submit event, when trying to get a response from the API
    const APICall = e => {
        e.preventDefault();

        // Validate form
        if (city.trim() === '' || country.trim() === '') {
            updateError(true);
            return;
        }
        updateError(false);

        // update API info state so that it can be rendered
        updateApiInfo(data, updateApiState);
    }

    return (
        <form
            onSubmit={APICall}
        >

            {error
                ? <Error
                    message='Ambos campos son obligatorios'
                />
                : null
            }

            <div className="input-field col s12">
                <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={insertData}
                    value={city}
                />
                <label htmlFor="city">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    id="country"
                    onChange={insertData}
                    name="country"
                    value={country}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="NI">Nicaragua</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="country">País: </label>
            </div>
            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}

Form.propTypes = {
    updateApiInfo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired, 
    insertData: PropTypes.func.isRequired, 
    updateApiState: PropTypes.func.isRequired
}

export default Form;