export const deleteSession = async (sessionId) =>
	// const session = await getSession(hash);
	// if (!session) {
	// 	return;
	// }

	fetch(`http://localhost:3005/sessions/${sessionId}`, {
		method: 'DELETE',
	});
