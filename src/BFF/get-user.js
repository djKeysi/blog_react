import { getUsers } from './get-users';
//запрашивает список всех пользователей и из списка ищет по логину
export const getUser = async (loginToFind) => {
	const users = await getUsers();
	return users.find(({ login }) => login === loginToFind);
};
