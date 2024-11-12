// DomoForm.js
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import * as helper from '../helper.js';

const DomoForm = ({ triggerReload }) => {
  const handleSubmit = async (e) => {
    const printUpdate = (result) => {
      helper.handleMessage(`
        Created: ${result.name} | ${result.age} | ${result.level}\n
        `);
    };
    e.preventDefault();
    const name = e.target.domoName.value;
    const age = e.target.domoAge.value;
    const level = e.target.domoLevel.value;
    helper.hideError();

    if (!name || !age || !level) {
      helper.handleError('All fields are required');
      return;
    }

    await helper.sendPost(e.target.action, { name, age, level }, (result) => {
      printUpdate(result);
      triggerReload();
    });
    e.target.blur();
    e.target.reset();
  };

  return (
    <form
      id="domoForm"
      onSubmit={handleSubmit}
      className="domoForm"
      action="/maker"
    >
      <label htmlFor="domoName">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      <label htmlFor="domoAge">Age: </label>
      <input
        id="domoAge"
        type="number"
        min="0"
        name="age"
        placeholder="ex. 21"
      />
      <label htmlFor="domoLevel">Level: </label>
      <input
        id="domoLevel"
        type="number"
        min="0"
        name="level"
        placeholder="ex. 56"
      />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
};

export default DomoForm;
