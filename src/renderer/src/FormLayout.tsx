import { Link, Outlet } from "react-router";

export default function FormLayout(): JSX.Element {
  return (
    <div>
      <Link to="/">
        <button>Назад</button>
      </Link>
      <Outlet />
    </div>
  );
}
