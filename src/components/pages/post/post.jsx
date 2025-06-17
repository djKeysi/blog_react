import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Comments, PostContent } from './components';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../../hooks';
import { loadPostAsync } from '../../../actions';
import { selectPost } from '../../../selectors';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id]);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} />
		</div>
	);
};

export const Post = styled(PostContainer)``;
