interface ModalConfirmationProps {
  title: string;
  description: string;
  onOk: () => Promise<void>;
  onCancel?: () => void;
}

export type { ModalConfirmationProps };
