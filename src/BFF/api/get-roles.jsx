export const getRoles = async () =>
	fetch('http://localhost:3005/roles').then((loadedRoles) => loadedRoles.json());
