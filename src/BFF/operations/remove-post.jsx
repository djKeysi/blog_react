import { deletePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	await deletePost(id);

	return {
		error: null,
		res: true,
	};
};

//removePost
