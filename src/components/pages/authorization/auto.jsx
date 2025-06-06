import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
const authFormSchema = yup.object().shape({
	loginn: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускается буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа'),
	//.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	passwordd: yup.string().required('Заполните пароль'),
	//.matches(
	// 	/^[\w#%]+$/,
	// 	'Неверно заполнен пароль. Допускается буквы,цифры и знаки # и %',
	// ),
	//.min(6, 'Неверный пароль. Минимум 6 символов')
	//.max(30, 'Неверный пароль. Максимум 30 символов'),
});
export const Auto = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(authFormSchema),
	});

	//const onSubmit2 = () => console.log('sdsdsds');

	//console.log(errors.login.message);

	return (
		<div>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit((d) => console.log(d))}>
				<input {...register('loginn')} />
				<input type="number" {...register('passwordd')} />
				<input type="submit" />
				<div>{errors.loginn?.message}</div>
			</form>
		</div>
	);
};
