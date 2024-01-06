import "./Button.css";
function Button({ handleClick, children }) {
  return (
    <button className="button-6" onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
