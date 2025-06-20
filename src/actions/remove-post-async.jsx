export const removePostAsync = (requestServer, postId, id) => () =>
	requestServer('removePost', id);
