
import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = ({ operationType  }) => {

const title = operationType === 'add' ? 'Add water' : 'Edit the entered amount of water';
const subTitle = operationType === 'add' ? 'Choose a value:' : 'Correct entered data:';
    
  return (
    <div>
      <h2>{title}</h2>
      <p>{subTitle}</p>
          <WaterForm operationType={operationType} />  
    </div>
  )
}

export default WaterModal;

