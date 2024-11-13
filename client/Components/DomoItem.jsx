// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import DomoEditor from './DomoEditor.jsx';
import { hideError } from '../helper.js';

const DomoItem = ({ domo, handleReload }) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditMode = () => {
    setIsEdit(!isEdit);
  };

  const handleEditMode = () => {
    hideError();
    toggleEditMode();
  };

  return isEdit ? (
    <DomoEditor
      domo={domo}
      triggerReload={handleReload}
      toggleEditMode={toggleEditMode}
    />
  ) : (
    <div id={domo._id} className="domo" onClick={handleEditMode}>
      <img
        src="/assets/img/domoface.jpeg"
        alt="domo face"
        className="domoFace"
      />
      <h3 className="domoName">
        Name: {domo.name} (lvl {domo.level})
      </h3>
      <h3 className="domoAge">Age: {domo.age}</h3>
    </div>
  );
};

export default DomoItem;
