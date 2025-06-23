import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';
import { Pagination, PostCard } from './components';

import { getLastPageFromLinks } from './utils';
import { PAGINATION_LIMIT } from '../../../bff/constants';

const MainBlogContainer = ({ className }) => {
	const [post, setPost] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPost(posts);
				// console.log(links);

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
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
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
