import styled from 'styled-components';

const ButtonContainer = ({ children }) => {};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 32px;
	border: 1px solid rgb(0, 0, 0);
	background-color: rgb(238, 238, 238);
`;
