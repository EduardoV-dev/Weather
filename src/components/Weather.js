import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ apiInfo, state, city }) => {

    // Check if the api state, if false, doesn't render
    if (!state) return null;

    const kelvin = 273.15;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {city} es: </h2>
                <p className="temperatura">
                    {parseFloat(apiInfo.temp - kelvin).toFixed(2)}
                    <span> &#x2103;</span>
                </p>
                <p>Temperatura Máxima: &nbsp;
                    {parseFloat(apiInfo.temp_max - kelvin).toFixed(2)}
                    <span> &#x2103;</span>
                </p>
                <p>Temperatura Mínima: &nbsp;
                    {parseFloat(apiInfo.temp_min - kelvin).toFixed(2)}
                    <span> &#x2103;</span>
                </p>
            </div>
        </div>
    );
}

Weather.propTypes = {
    apiInfo: PropTypes.object.isRequired,
    state: PropTypes.bool.isRequired,
    city: PropTypes.string.isRequired
}

export default Weather;