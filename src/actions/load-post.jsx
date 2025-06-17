export const loadPost = (requestServer, postId) => (dispatch) => {
	requestServer('fetchPost', postId).then((postData) => {
		dispatch(setPostData(postData));
	});
};
