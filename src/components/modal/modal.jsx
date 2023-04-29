import React from "react";

import "./modal.scss";

const Modal = ({ closeModel, data }) => {
  console.log("data", data);
  return (
    <React.Fragment>
      <div
        role="button"
        tabIndex={0}
        className="modal__overlay"
        aria-label="закрыть модальное окно"
      >
        <div className="modal-wrapper">
          <h2 className="modal__title">{data}</h2>
          <button
            type="button"
            onClick={closeModel}
            className="modal__close"
            aria-label="закрыть модальное окно"
          />

          <div className="modal-buttons">
            <button className="book-list__btn-modal" onClick={closeModel}>
              close
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Modal };

