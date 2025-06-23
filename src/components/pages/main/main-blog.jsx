import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';
import { Pagination, PostCard } from './components';
import { PAGINATION_LIMIT } from '../../../BFF/constants';
import { getLastPageFromLinks } from './utils';

const MainBlogContainer = ({ className }) => {
	const [post, setPost] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();
	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPost(posts);
				console.log(getLastPageFromLinks(links));

				setLastPage(getLastPageFromLinks(links));
			},
		);
	}, [requestServer, page]);

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
			{lastPage > 1 && (
				<Pagination setPage={setPage} lastPage={lastPage} page={page} />
			)}
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
