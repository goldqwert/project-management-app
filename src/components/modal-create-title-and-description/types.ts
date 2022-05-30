interface ModalCreateTitleAndDescriptionProps {
  title: string;
  buttonText: string;
  buttonType: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  onCreate: (values: unknown) => void;
}

export type { ModalCreateTitleAndDescriptionProps };
