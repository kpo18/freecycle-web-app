/* import ClearRoundedIcon from '@material-ui/icons/ClearRounded'; */


function Popup({ handleDeleteTrue, handleDeleteFalse }) {
    return (
      <div className="modal">
        <div className="modal-box">
          <div className="modal-head">
              <p>Are you sure you want to delete this item?</p>
              <div onClick={handleDeleteFalse}className="cancel-icon">✖️</div>


          </div>
          <button onClick={handleDeleteFalse}className="modal-cancel">✖️</button>
          <button onClick={handleDeleteTrue} className="modal-delete">
            Yes, delete it
          </button>
        </div>
      </div>
    );
  }
  
  export default Popup;