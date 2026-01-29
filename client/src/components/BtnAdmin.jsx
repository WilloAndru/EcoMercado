import { Link } from "react-router-dom";

function BtnAdmin(props) {
  return (
    <Link className="btn-1" to={`/admin/${props.link}`}>
      <h2>{props.title}</h2>
      {props.icon}
    </Link>
  );
}

export default BtnAdmin;
