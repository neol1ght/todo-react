import form from "../css/modules/Form.module.css";

const AddTask = (props) => {

    const {
        className,
        value,
        type,
        ref,
        onChange,
        placeholder,
    } = props

    return (
        <input type={type}
               placeholder={placeholder}
               className={className}
               value={value}
               ref={ref}
               onChange={onChange}
        />
    )
}
export default AddTask