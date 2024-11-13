// DomoSuperForm.js
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import * as helper from '../helper.js';

const DomoEditor = ({ domo, triggerReload, toggleEditMode }) => {
  const handleEditSubmit = async (e, domoId) => {
    const printUpdate = (result) => {
      helper.handleMessage(`
        Updated: ${result.new.name} | ${result.new.age} | lvl. ${result.new.level}\n
        || Previously: ${result.prev.name} | ${result.prev.age} | lvl. ${result.prev.level}
        `);
    };

    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const level = e.target.level.value;
    helper.hideError();

    if (!name && !age && !level) {
      helper.handleError('At least 1 field required!');
      return;
    }

    try {
      await helper.sendPost(
        e.target.action,
        {
          _id: domoId,
          name,
          age,
          level,
        },
        (result) => {
          printUpdate(result);
          triggerReload();
          toggleEditMode();
        },
      );
    } catch (err) {
      helper.handleError(`Error: ${err}`);
    }

    e.target.blur();
    e.target.reset();
  };

  const handleDelete = async (domoId) => {
    const printDelete = (result) => {
      helper.handleMessage(
        `Deleted: ${result.name} (lvl. ${result.level}), Age: ${result.age}`,
      );
    };
    helper.hideError();
    try {
      const response = await fetch(`/maker/${domoId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();

      if (response.ok) {
        printDelete(result);
        triggerReload();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      helper.handleError(err.message);
    }
  };

  const handleCancel = (e) => {
    const form = e.target.closest('form');
    form.reset();
    helper.hideError();
    toggleEditMode();
  };

  return (
    <form
      onSubmit={(e) => handleEditSubmit(e, domo._id)}
      key={domo._id}
      className="domo edit"
      id={domo._id}
      action={`/maker/${domo._id}`}
    >
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" placeholder={domo.name} />
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" placeholder={domo.age} />
        <label htmlFor="level">Level: </label>
        <input type="number" name="level" placeholder={domo.level} />
      </div>
      <div>
        <input type="submit" value="Update Domo" />
        <input
          type="button"
          onClick={() => handleDelete(domo._id)}
          value="Delete Domo"
        />
        <input type="button" onClick={handleCancel} value="Cancel Edit" />
      </div>
    </form>
  );
};

export default DomoEditor;
