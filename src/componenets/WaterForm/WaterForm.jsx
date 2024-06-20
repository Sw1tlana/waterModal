import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schemaWater = yup.object().shape({
    waterAmount: yup.number()
    .required()
    .min(5000)
    .max(15000),
    time: yup.string().required(),
    keyboardAmount: yup.number()
    .required()
    .min(5000)
    .max(15000),
});

const defaultTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours}:${minutes}`
}

  const defaultValues = {
        waterAmount: 50,
        time: new Date().toLocaleTimeString(),
        keyboardAmount: 50
    };

const WaterForm = () => {

    const defaultTimeValue = defaultTime();
    
    const { handleSubmit, control, formState: { errors }, getValues, setValue } = useForm({
        resolver: schemaWater,
        defaultValues: { ...defaultValues, time: defaultTimeValue }
    });

    const onSubmit = (data) => {
        // Відправлення даних на backend для збереження
        console.log(data); // Виведення даних, які будуть відправлені на backend
    };

    const handleWaterChange = (newValue) => {
        setValue('waterAmount', newValue); 
        setValue('keyboardAmount', newValue);
    };

  const incrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        handleWaterChange(currentAmount + 50); 
    };

    const decrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        if (currentAmount >= 50) {
            handleWaterChange(currentAmount - 50);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Amount of water:</label>
                   <button type="button" onClick={decrementWater}>-</button>
                <Controller
                    name="waterAmount"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.waterAmount : '50'}
                    render={({ field }) => <input type="text" pattern="[50-5]*" {...field} />}
                />
                  <button type="button" onClick={incrementWater}>+</button>
                <p>{errors.waterAmount?.message}</p>
            </div>

            <div>
                <label>Recording time:</label>
                <Controller
                    name="time"
                    control={control}
                    defaultValue={defaultTimeValue}
                    render={({ field }) => <input type="text" {...field} />}
                />
                <p>{errors.time?.message}</p>
            </div>

            <div>
                <label>Enter the value of the water used:</label>
                <Controller
                    name="keyboardAmount"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.keyboardAmount : '50'}
                    render={({ field }) => <input type="text" pattern="[50-5]*" {...field} />}
                />
                <p>{errors.keyboardAmount?.message}</p>
            </div>

            <button type="submit">Save</button>
            </form>
        </div>
    );
};

WaterForm.propTypes = {
    defaultValues: PropTypes.object,
    operationType: PropTypes.oneOf(['add', 'edit']).isRequired,
};

export default WaterForm;