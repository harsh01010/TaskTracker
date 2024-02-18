import "../styles/Button.css";
function Button({ handleClick, children, disabled }) {
  return (
    <button className="button-6" onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
