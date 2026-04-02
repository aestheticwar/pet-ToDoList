import { InputHTMLAttributes } from "react";
import {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";
import styles from "./Field.module.scss";

interface BaseProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	className?: string;
}

interface RHFProps<T extends FieldValues> {
	name: Path<T>;
	register?: UseFormRegister<T>;
	rules?: RegisterOptions<T, Path<T>>;
	error?: FieldError;
}

type FieldProps<T extends FieldValues> = BaseProps & RHFProps<T>;

const Field = <T extends FieldValues>(props: FieldProps<T>) => {
	const {
		className = "",
		id,
		label,
		type = "text",
		onInput,
		value,
		register,
		name,
		rules,
		error,
	} = props;

	const registration = register && name ? register(name, rules) : {};
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
				{...registration}
			/>
			{error && <span className={styles.error}>{error.message}</span>}
		</div>
	);
};

export { Field };
