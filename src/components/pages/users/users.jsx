import { Content, H2 } from '../../../components';
import { TableRow, UserRow } from './components';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';
import { useEffect, useState } from 'react';
import { ROLE } from '../../../constants';

export const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);

		// requestServer('fetchRoles').then(({ rolesError, res }) => {
		// 	if (rolesError) return;
		// 	setRoles(res);
		// });
		// requestServer('fetchUsers');
	}, [requestServer, shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				{/* {errorMessage} ?
			<div>
				<H2>Ошибка</H2>
				<div>{errorMessage}</div>
			</div> */}
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registredAt={registredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
