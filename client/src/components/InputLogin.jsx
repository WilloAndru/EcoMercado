function InputLogin(props) {
  return (
    <div className="inputContainer input flex1">
      <label>{props.label}</label>
      <div className="inputDiv flex1">
        {props.icon}
        <input
          className="input"
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
        />
      </div>
    </div>
  );
}

export default InputLogin;
