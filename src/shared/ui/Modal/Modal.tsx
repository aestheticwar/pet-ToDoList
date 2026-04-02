import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Modal.module.scss";

interface ModalProps {
	title: string;
	buttonLabel: string;
	description?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
	const { title, buttonLabel, description, children, open, setOpen } = props;

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger className={styles.trigger} asChild>
				<Button>{buttonLabel}</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Close asChild>
						<Button className={styles.close}>
							<Cross2Icon />
						</Button>
					</Dialog.Close>
					<Dialog.Title className={styles.title}>{title}</Dialog.Title>
					{description && (
						<Dialog.Description>{description}</Dialog.Description>
					)}
					<div className={styles.main}>{children}</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
