import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useState } from 'react';
import { server } from '../../../BFF/server';
import styled from 'styled-components';
import { Input } from '../../input/input';
import { Button } from '../../button/button';

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

export const AutorizationContainer = ({ className }) => {
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

	const [serverError, setServerError] = useState();

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
			}
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="text" placeholder="Логин..." {...register('login')} />
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password')}
				/>
				<Button type="submit" disabled={!!formError}>
					{' '}
					Авторизоваться
				</Button>

				{errorMessage && <div>{errorMessage}</div>}
			</form>
		</div>
	);
};

export const Autorization = styled(AutorizationContainer)`
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
