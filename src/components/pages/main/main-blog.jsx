import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';
import { PostCard } from './components';

const MainBlogContainer = ({ className }) => {
	const [post, setPost] = useState([]);

	const requestServer = useServerRequest();
	useEffect(() => {
		requestServer('fetchPosts').then((posts) => {
			setPost(posts.res);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<div className="post-list">
				{post.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						publishedAt={publishedAt}
						commentsCount={commentsCount}
					/>
				))}
			</div>
		</div>
	);
};

export const MainBlog = styled(MainBlogContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
`;
