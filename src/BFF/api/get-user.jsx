// import { getUsers } from './get-users';

import { transformUser } from '../transformers';

//запрашивает список всех пользователей и из списка ищет по логину
export const getUser = async (loginToFind) =>
	// const users = await getUsers();
	// return users.find(({ login }) => login === loginToFind);
	fetch(`http://localhost:3005/users/?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(
			([loadedUser]) => loadedUser && transformUser(loadedUser),
			// loadedUser && {
			// 	id: loadedUser.id,
			// 	login: loadedUser.login,
			// 	password: loadedUser.password,
			// 	registeredAt: loadedUser.registered_at,
			// 	roleId: loadedUser.role_id,
			// },
		);
