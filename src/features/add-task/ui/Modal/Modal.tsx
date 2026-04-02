import { Modal } from "@/shared/ui/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field } from "@/shared/ui/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../../model/useCreateTask";
import * as z from "zod";
import styles from "./Modal.module.scss";
import { useEffect, useState } from "react";

const shema = z.object({
	title: z.string().trim().min(1, "Необходимо указать название задачи!"),
	description: z.string().trim().min(1, "Task description is required!"),
});

type TaskForm = z.infer<typeof shema>;

export const AddTaskModal = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: createTask, isPending } = useCreateTask();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskForm>({
		resolver: zodResolver(shema),
	});

	useEffect(() => {
		if (!open) reset();
	}, [open, reset]);

	const onSubmit: SubmitHandler<TaskForm> = ({ title, description }) => {
		createTask(
			{
				author_user_id: 2,
				title,
				description,
			},
			{
				onSuccess: () => {
					setOpen(false);
					reset();
				},
				onError: (e) => {
					console.error(e);
				},
			},
		);
	};
	return (
		<Modal
			title="Форма"
			buttonLabel="Создать таску"
			open={open}
			setOpen={setOpen}
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

				<button type="submit" disabled={isPending}>
					Send form!
				</button>
			</form>
		</Modal>
	);
};
