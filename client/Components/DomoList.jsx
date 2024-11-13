// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import DomoItem from './DomoItem.jsx';

const DomoList = ({ domos, toggleEditMode, triggerReload }) => {
  if (domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }

  return (
    <div className="domoList">
      {domos.map((domo) => (
        <DomoItem
          key={domo._id}
          domo={domo}
          toggleEditMode={toggleEditMode}
          handleReload={triggerReload}
        />
      ))}
    </div>
  );
};

export default DomoList;
