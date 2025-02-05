import { useState, useEffect } from "react";
import type { Partner } from "../../../types";
import logo from "./assets/icon.png";
import { Link, useNavigate } from "react-router";

function App(): JSX.Element {
  const [partners, setPartners] = useState<Partner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async (): Promise<void> => {
      try {
        const response = await (window as any).api.getPartners(); // eslint-disable-line
        setPartners(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <>
      <div className="header">
        <img src={logo} alt="" className="logo" />
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {partners.map((item) => (
          <li
            key={item.id}
            className="partners-card"
            onClick={() => navigate("/update", { state: item })}
          >
            <div>
              <p className="partners-card_header">
                {item.organization_type} | {item.name}
              </p>
              <div>
                <p>{item.ceo}</p>
                <p>{item.phone}</p>
                <p>Рейтинг: {item.rating}</p>
              </div>
            </div>
            <div>{item.discount}%</div>
          </li>
        ))}
      </ul>
      <Link to="/create">
        <button>Создать партнёра</button>
      </Link>
    </>
  );
}

export default App;
