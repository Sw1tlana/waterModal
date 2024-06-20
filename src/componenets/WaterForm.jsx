import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

const schemaWater = yup.object().shape({
    waterAmount: yup.number().required('Кількість води обовʼязкова до заповнення'),
    time: yup.string().required('Час споживання води обовʼязковий до заповнення'),
    keyboardAmount: yup.number().required('Кількість води з клавіатури обовʼязкова до заповнення'),
});


const WaterForm = ({ defaultValues }) => {
    const { handleSubmit, control, formState: { errors }, getValues, setValue } = useForm({
        resolver: schemaWater,
        defaultValues: defaultValues // Передаємо значення для редагування
    });

    const onSubmit = (data) => {
        // Відправлення даних на backend для збереження
        console.log(data); // Виведення даних, які будуть відправлені на backend
    };

    const handleWaterChange = (newValue) => {
        setValue('waterAmount', newValue); // Змінюємо значення води
        setValue('keyboardAmount', newValue); // Змінюємо значення води з клавіатури
    };
  const incrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        handleWaterChange(currentAmount + 50); // Додавання 50 мл
    };

    const decrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        if (currentAmount >= 50) {
            handleWaterChange(currentAmount - 50); // Віднімання 50 мл, якщо значення більше або дорівнює 50
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Кількість води (з кнопок):</label>
                   <button type="button" onClick={decrementWater}>-</button>
                <Controller
                    name="waterAmount"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.waterAmount : 50}
                    render={({ field }) => <input type="number" {...field} />}
                />
                  <button type="button" onClick={incrementWater}>+</button>
                <p>{errors.waterAmount?.message}</p>
            </div>

            <div>
                <label>Час споживання води (hh:mm):</label>
                <Controller
                    name="time"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.time : new Date().toLocaleTimeString()}
                    render={({ field }) => <input type="text" {...field} />}
                />
                <p>{errors.time?.message}</p>
            </div>

            <div>
                <label>Кількість води (з клавіатури):</label>
                <Controller
                    name="keyboardAmount"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.keyboardAmount : 50}
                    render={({ field }) => <input type="number" {...field} />}
                />
                <p>{errors.keyboardAmount?.message}</p>
            </div>

            <button type="submit">Save</button>
        </form>
    );
};

export default WaterForm;