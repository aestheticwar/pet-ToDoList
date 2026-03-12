import styles from "./Button.module.scss";

const Button = (props) => {
	const { type = "button", className = "", children, onClick } = props;
	return (
		<button
			className={`${styles.button} ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export { Button };
