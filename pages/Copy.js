import React,{useState} from 'react'
import copy from "copy-to-clipboard";
import { Heading, Input1, Input2, Container, Button } from './Styles'

const Clipboard = () => {
	const [copyText, setCopyText] = useState('');

	const handleCopyText = (e) => {
	setCopyText(e.target.value);
	}
	
	const copyToClipboard = () => {
	copy(copyText);
	alert(`You have copied "${copyText}"`);
	}
	
	return (
	<div>
		<Heading>GeeksForGeeks</Heading>
		
		<Container>
		<Input1
			type="text"
			value={copyText}
				onChange={handleCopyText}
				placeholder='Enter the text you want to copy' />
	
		<Button onClick={copyToClipboard}>
			Copy to Clipboard
		</Button>
	
		<Input2
			type="text"
			placeholder='Enter the text you have copied' />
		</Container>
	
	</div>
	)
}

export default Clipboard;
