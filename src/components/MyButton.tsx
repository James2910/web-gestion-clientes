import styles from '../theme/globalStyles.module.css'

interface Props {
    texto: string;
    color?: string;
    mt?: number;
    action: () => void;
}

export const MyButton = ({ texto, color="#f2cc8f", mt=0, action}: Props) => {
  return (
    <button 
      className={ styles.btn }
      style={{backgroundColor: color, marginTop: mt}}
      onClick={ action }
    ><p className={ styles.btnText }>{ texto }</p></button>
  )
}
