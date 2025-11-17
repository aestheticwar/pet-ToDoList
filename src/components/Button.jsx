const Button = (props) => {
	const {
		type = "button",
		className = "",
		children,
		onClick
	} = props;
	return (
		<button
			className={`button ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export { Button };
