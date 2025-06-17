import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Comments, PostContent } from './components';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../../hooks';
import { loadPost } from '../../../actions';

const PostContainer = ({ className }) => {
	const post = useSelector();
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	useEffect(() => {
		dispatch(loadPost(requestServer, params.id));
	}, []);
	return (
		<div className={className}>
			<PostContent />
			<Comments />
		</div>
	);
};

export const Post = styled(PostContainer)``;
