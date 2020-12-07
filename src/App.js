import React, { Fragment, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

// Form inputs state
const useFormInputs = (initialState) => {
  const [data, setData] = useState(initialState);

  // Insert data into state when the inputs change
  const insertData = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return { data, insertData };
}

// State for knowing if the API State is empty or not in order to show the components or not
const useAPIState = initialState => {
  const [apiState, setApiState] = useState(initialState);

  // Update API state when api response is done
  // Value = true | false
  const updateApiState = value => {
    setApiState(value);
  }

  return { apiState, updateApiState };
}

// State for checking if the request returned a 404 error or it resolved correctly
const useRequestState = initialState => {
  const [requestState, setRequestState] = useState(initialState);

  // Update the request state 
  // Value = true | false
  const updateRequestState = value => {
    setRequestState(value);
  }

  return { requestState, updateRequestState };
}

// API State for obtaining weather info
const useAPICallInfo = (initialState, updateRequestState) => {
  const [apiInfo, setApiInfo] = useState(initialState);

  // Set function to update apiState
  const updateApiInfo = async (data, updateApiState) => {
    const { city, country } = data;

    const appId = '29509eed63bd0814b646a0d0175e9bc4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()},${country.toLowerCase()}&appid=${appId}`;
    const response = await fetch(url);
    const weatherInfo = await response.json();

    if (weatherInfo.cod === '404') {
      updateRequestState(false);
      return;
    } else {
      updateRequestState(true);
    }

    setApiInfo(weatherInfo.main);
    updateApiState({ state: true, city });
  }

  return { apiInfo, updateApiInfo };
}

function App() {

  // Instanciate state for the form
  const { data, insertData } = useFormInputs({
    city: '',
    country: ''
  });

  // Instanciate the state for controlling the request state in order to know the server response
  const { requestState, updateRequestState } = useRequestState(true);

  // Instanciate the state which will posees the API response
  const { apiInfo, updateApiInfo } = useAPICallInfo({}, updateRequestState);

  const { apiState, updateApiState } = useAPIState({
    state: false,
    city: ''
  });

  const { state, city } = apiState;

  // Charge component based on the request state (Successful request or a 404 error)
  let component = requestState ? <Weather apiInfo={apiInfo} state={state} city={city} /> : <Error message='No se encontraron resultados' />

  return (
    <Fragment>
      <Header
        title='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                data={data}
                insertData={insertData}
                updateApiInfo={updateApiInfo}
                updateApiState={updateApiState}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
