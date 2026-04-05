import { Modal } from "@/shared/ui/Modal";
import { useForm, SubmitHandler, get } from "react-hook-form";
import { Field } from "@/shared/ui/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./Modal.module.scss";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useUpdateTask } from "../../model/hooks/useUpdateTask";
import { Button } from "@/shared/ui/Button";

const shema = z.object({
	title: z.string().trim().min(1, "Необходимо указать название задачи!"),
	description: z.string().trim().min(1, "Task description is required!"),
});

type TaskForm = z.infer<typeof shema>;

interface TaskModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	id: number;
	title: string;
	description: string;
}

export const TaskModal = (props: TaskModalProps) => {
	const { open, setOpen, title, id, description } = props;
	const { mutate: updateTask, isPending } = useUpdateTask();
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		setError,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<TaskForm>({
		resolver: zodResolver(shema),
		defaultValues: {
			title,
			description,
		},
	});

	useEffect(() => {
		if (open) {
			reset({
				title,
				description,
			});
		}
	}, [open, title, description, reset]);

	const onSubmit: SubmitHandler<TaskForm> = () => {
		if (!isDirty) {
			setError("root", {
				type: "manual",
				message: "Nothing was changed",
			});
			return;
		}
		const values = getValues();

		const updatedField = Object.keys(dirtyFields).reduce((acc, key) => {
			acc[key as keyof TaskForm] = values[key as keyof TaskForm];
			return acc;
		}, {} as Partial<TaskForm>);

		updateTask(
			{
				id,
				updatedFields: updatedField,
			},
			{
				onSuccess: () => {
					setOpen(false);
					reset();
				},
			},
		);
	};
	return (
		<Modal
			title="Форма"
			buttonLabel="Обновить"
			open={open}
			setOpen={setOpen}
			hasTriger={false}
		>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field<TaskForm>
					id="title"
					name="title"
					label="title"
					register={register}
					error={errors.title}
				/>

				<Field<TaskForm>
					id="description"
					name="description"
					label="description"
					register={register}
					error={errors.description}
				/>

				<Button type="submit" disabled={isPending}>
					Update task
				</Button>
				{errors.root?.message && <span>{errors.root.message}</span>}
			</form>
		</Modal>
	);
};
