import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Input } from '../../input/input';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../../button/button';
import { server } from '../../../bff';
import { H2 } from '../../h2/h2';
import { setUser } from '../../../actions';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { selectUserRole } from '../../../selectors';
import { ROLE } from '../../../constants';
// import { dispatch } from 'react-redux';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускается буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускается буквы,цифры и знаки # и %',
		)
		.min(6, 'Неверный пароль. Минимум 6 символов')
		.max(30, 'Неверный пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
`;

export const AutorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const store = useStore();
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout; // сброс формы при разлогировании
		return store.subscribe(() => {
			let prevWasLogout = store.getState().app.wasLogout;
			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					{' '}
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
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
