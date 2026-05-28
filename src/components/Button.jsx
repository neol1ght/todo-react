
const Button = (props) => {
    const {
        className,
        type = 'button',
        onClick,
        children
    } = props

    return (
        <button type={type} className={className} onClick={onClick}>{children}</button>
    )
}

export default Button