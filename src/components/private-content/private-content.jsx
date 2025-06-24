import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { ERROR } from '../../constants';
import { checkAccess } from '../../utils';
// import styled from 'styled-components';
// import { H2 } from '../h2/h2';

// const Div = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// `;
export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);
	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

// error ? (
// 	<Div>
// 		<H2>Ошибка</H2>
// 		<div>{error}</div>
// 	</Div>
// ) : (
// 	children
// );
