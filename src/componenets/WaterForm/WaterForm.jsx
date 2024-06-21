import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'; 

const schemaWater = yup.object().shape({
    waterAmount: yup.number()
    .required('Please enter the amount of water.'),
    // .min(5000, 'Minimum amount of water: 5000 ml.')
    // .max(15000, 'Maximum amount of water: 15000 ml.'),
    time: yup.string()
    .required(),
    keyboardAmount: yup.number()
    .required()
    // .min(5000, 'Minimum amount of water: 5000 ml.')
    // .max(15000, 'Maximum amount of water: 15000 ml.'),
});

const defaultTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`
}

  const defaultValues = {
        waterAmount: 50,
        time: defaultTime(),
        keyboardAmount: 50,
    };

const WaterForm = () => {
    
    const { handleSubmit, formState: { errors }, getValues, setValue, register } = useForm({
        resolver: yupResolver(schemaWater),
        defaultValues
    });

    const onSubmit = async (formData) => {
        try {
            console.log('Submitting data:', formData);

            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);

           
            console.log('Server response:', response.data);
            alert('Data successfully submitted!')
        } catch (error) {
            console.error('Error sending data:', error);
            alert('Error submitting data. Please try again.')
        }
    };

    const handleWaterChange = (newValue) => {
        setValue('waterAmount', newValue); 
        setValue('keyboardAmount', newValue);
    };

const incrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
    const newValue = currentAmount + 50;
    handleWaterChange(newValue);
    setValue('waterAmount', newValue);
};

const decrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
        if (currentAmount >= 50) {
            const newValue = currentAmount - 50;
            handleWaterChange(newValue);
            setValue('waterAmount', newValue);
        }
};

    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    <span>Amount of water:</span>
                    <button type="button" onClick={decrementWater}>-</button>
                    <input
                        type="number"
                        {...register('waterAmount', { required: true })}
                        value={getValues('waterAmount')}
                        readOnly
                    />
                    <button type="button" onClick={incrementWater}>+</button>
                </label>
                <p>{errors.waterAmount?.message}</p>
            </div>
       
      <div>
         <label>
            <span>Recording time:</span>
                <input
                    type="time"
                    {...register('time', { required: true })}
                    defaultValue={defaultValues.time}
                    onChange={(e) => setValue('time', e.target.value)}
                />
            </label>
            <p>{errors.time?.message}</p>
      </div>

      <div>
        <label>
            <span>Enter the value of the water used:</span>
                <input
                    type="number"
                    {...register('keyboardAmount', { required: true })}
                    readOnly
                    />
        </label>
        <p>{errors.keyboardAmount?.message}</p>
       </div>

            <button type="submit">Save</button>
        </form>
    </div>
);
};

export default WaterForm;