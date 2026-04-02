import { Modal } from "@/shared/ui/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field } from "@/shared/ui/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../../model/useCreateTask";
import * as z from "zod";
import styles from "./Modal.module.scss";

const shema = z.object({
	title: z.string().trim().min(1, "Необходимо указать название задачи!"),
	description: z.string().trim().min(1, "Task description is required!"),
});

type TaskForm = z.infer<typeof shema>;

export const AddTaskModal = () => {
	const { mutate: createTask } = useCreateTask();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskForm>({
		resolver: zodResolver(shema),
	});
	const onSubmit: SubmitHandler<TaskForm> = ({ title, description }) => {
		createTask({
			author_user_id: 2,
			title,
			description,
		});
	};
	return (
		<Modal title="Форма" buttonLabel="Создать таску">
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

				<button type="submit">Send form!</button>
			</form>
		</Modal>
	);
};
