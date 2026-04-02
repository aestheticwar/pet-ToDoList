import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Modal.module.scss";

interface ModalProps {
	title: string;
	className?: string;
}

export const Modal = (props: ModalProps) => {
	const { title, className = "" } = props;

	const [open, setOpen] = useState<boolean>(false);
	const handleClick = () => {
		setOpen((prev) => !prev);
	};
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger className={styles.trigger} asChild>
				<button onClick={handleClick}>Modal</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Description />
					<Dialog.Close asChild>
						<Button className={styles.close} onClick={handleClick}>
							<Cross2Icon />
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
