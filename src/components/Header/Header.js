import React from 'react';
import logo from './Logo_Alfa_Romeo.svg';
import '../../App.css';

const Header = () => {
	return (
		<header className='App-header'>
			<img src={logo} alt="logo" height="50" width="50" style={{margin: '10px 0'}}/>
		</header>
	);
};

export default Header;