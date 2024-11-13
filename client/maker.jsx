// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import DomoForm from './Components/DomoForm.jsx';
import DomoList from './Components/DomoList.jsx';
// eslint-disable-next-line import/no-extraneous-dependencies
const { createRoot } = require('react-dom');
// App.js

const App = () => {
  const [domos, setDomos] = useState([]);
  const [reloadDomos, setReloadDomos] = useState(false);

  const handleReload = () => {
    setReloadDomos((prev) => !prev);
  };

  useEffect(() => {
    const loadDomosFromServer = async () => {
      const response = await fetch('/getDomos');
      const data = await response.json();
      setDomos(data.domos);
    };

    loadDomosFromServer();
  }, [reloadDomos]);

  return (
    <div>
      <div id="makeDomo">
        <DomoForm triggerReload={handleReload} />
      </div>
      <div><h3>Click the Domos to edit them!</h3></div>
      <div id="domos">
        <DomoList
          domos={domos}
          triggerReload={handleReload}
        />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
