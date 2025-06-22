export const getCommentsCount = (comments = [], postId) => {
	const postComments = comments.filter(({ postId: commentPostId }) => {
		return commentPostId === postId;
	});
	return postComments.length;
};
