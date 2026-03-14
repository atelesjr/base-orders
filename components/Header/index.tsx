import Image from 'next/image';
import './Header.styles.css';

const Header = () => {
	return (
		<header className="header">
			<Image
				src="/assets/base-logo.avif"
				alt="Base Logo"
				width={200}
				height={200}
			/>
		</header>
	);
};

export default Header;
