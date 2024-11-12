// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

const DomoList = ({ domos }) => {
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
        <div key={domo.id} className="domo">
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
      ))}
    </div>
  );
};

export default DomoList;
