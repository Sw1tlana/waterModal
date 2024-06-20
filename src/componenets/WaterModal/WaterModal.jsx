
import PropTypes from 'prop-types';
import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = ({ operationType  }) => {

const header = operationType === 'add' ? 'Add water' : 'Edit the entered amount of water';
const subHeader = operationType === 'add' ? 'Choose a value:' : 'Correct entered data:';
    
  return (
      <div>
      <h2>{header}</h2>
      <p>{subHeader}</p>
          <WaterForm operationType={operationType} />  
    </div>
  )
}

WaterModal.propTypes = {
    operationType: PropTypes.oneOf(['add', 'edit']).isRequired,
};

export default WaterModal;

