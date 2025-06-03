import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^w+$/, 'Неверно заполнен логин.Допускается буквы и цифры')
		.min(3, 'Неверно заполнен логин.Минимум 3 символа')
		.max(15, 'Неверно заполнен логин.Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускается буквы,цифры и знаки # и %',
		)
		.min(6, 'Неверный пароль.Минимум 6 символов')
		.max(30, 'Неверный пароль.Максимум 30 символов'),
});

export const Autorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const onSubmit = ({ login, password }) => {};

	return (
		<div>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Логин..." {...register('login')} />
				<input
					type="password"
					placeholder="Пароль..."
					{...register('password')}
				/>
				<button type="submit"> Войти</button>
			</form>
		</div>
	);
};
