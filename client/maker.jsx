// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import DomoForm from './Components/DomoForm.jsx';
import DomoList from './Components/DomoList.jsx';
import DomoSuperForm from './Components/DomoSuperForm.jsx';
// eslint-disable-next-line import/no-extraneous-dependencies
const { createRoot } = require('react-dom');
const helper = require('./helper.js');
// App.js

const App = () => {
  const [domos, setDomos] = useState([]);
  const [reloadDomos, setReloadDomos] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const toggleEditMode = () => {
    setIsEdit(!isEdit);
    helper.hideError();
  };

  const handleMessage = (message) => {
    helper.handleMessage(message);
  };

  return (
    <div>
      <div id="makeDomo">
        <DomoForm
          triggerReload={handleReload}
          handleMessage={handleMessage}
        />
      </div>
      <div id="editMode">
        <input
          type="button"
          value={isEdit ? 'Switch to View Mode' : 'Switch to Edit Mode'}
          onClick={toggleEditMode}
        />
      </div>
      <div id="domos">
        {isEdit ? (
          <DomoSuperForm
            domos={domos}
            triggerReload={handleReload}
            handleMessage={handleMessage}
          />
        ) : (
          <DomoList domos={domos} triggerReload={handleReload} />
        )}
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
