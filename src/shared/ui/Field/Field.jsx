import styles from "./Field.module.scss";

const Field = (props) => {
	const {
		className = "",
		id,
		label,
		type = "text",
		onInput,
		value,
		ref,
	} = props;
	return (
		<div className={`${styles.field} ${className}`}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.input}
				id={id}
				value={value}
				placeholder=" "
				autoComplete="off"
				type={type}
				onInput={onInput}
				ref={ref}
			/>
		</div>
	);
};

export { Field };
