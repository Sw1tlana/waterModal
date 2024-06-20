
import './App.css'
import WaterForm from './componenets/WaterForm.jsx';
function App() {

   const defaultValues = {
        waterAmount: 50,
        time: new Date().toLocaleTimeString(),
        keyboardAmount: 50
    };

  return (
    <>
      
    <WaterForm defaultValues={defaultValues} />
   
    </>
  )
}

export default App
