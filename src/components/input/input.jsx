import styled from "styled-components";

const InputContainer = ({className,width,...props}) => {
return (
<input className={className} {...props}/>
)
}

export const Input = styled(InputContainer)`
width:${({width='100%'})=>width};
height:40px;
padding:10px;
margin:0 0 10px;
border:1px solid #000;
font-size:18px
`