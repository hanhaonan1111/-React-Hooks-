import styles from "./index.module.scss";
type Props = {
  value?: {
    length: number;
  };
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
export default function TextArea({ ...rest }: Props) {
  return (
    <div className={styles.root}>
      <textarea className="textarea" {...rest} />
      <div className="count">
        {rest.value?.length}/{rest.maxLength}
      </div>
    </div>
  );
}
