import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import type { Partner as PartnerType } from "../../../types";

type LocationType = {
  state: PartnerType;
};

type Partner = {
  organization_type: {
    value: string;
  };
  name: {
    value: string;
  };
  ceo: {
    value: string;
  };
  email: {
    value: string;
  };
  phone: {
    value: string;
  };
  address: {
    value: string;
  };
  rating: {
    value: number;
  };
};

export default function UpdatePartner(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const location: LocationType = useLocation();

  useEffect(() => {
    document.title = "Обновить партнера";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & Partner;
    const partner = {
      id: location.state.id,
      organization_type: target.organization_type.value,
      name: target.name.value,
      ceo: target.ceo.value,
      email: target.email.value,
      phone: target.phone.value,
      address: target.address.value,
      rating: target.rating.value,
    };
    await (window as any).api.updatePartner(partner); //eslint-disable-line
    formRef.current?.reset();
  };

  return (
    <div>
      <Link to="/">
        <button>Назад</button>
      </Link>
      <h1>Обновить партнера</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="name">Наименование:</label>
        <input id="name" type="text" required defaultValue={location.state.name} />
        <label htmlFor="organization_type">Тип партнера:</label>
        <select
          name="organization_type"
          id="organization_type"
          required
          defaultValue={location.state.organization_type}
        >
          <option value="ЗАО">ЗАО</option>
          <option value="ООО">ООО</option>
          <option value="ОАО">ОАО</option>
          <option value="ПАО">ПАО</option>
        </select>
        <label htmlFor="rating">Рейтинг:</label>
        <input
          id="rating"
          type="number"
          step="1"
          min="0"
          max="100"
          required
          defaultValue={location.state.rating}
        />
        <label htmlFor="address">Адрес:</label>
        <input id="address" type="text" required defaultValue={location.state.address} />
        <label htmlFor="ceo">ФИО директора:</label>
        <input id="ceo" type="text" required defaultValue={location.state.ceo} />
        <label htmlFor="phone">Телефон:</label>
        <input id="phone" type="tel" required defaultValue={location.state.phone} />
        <label htmlFor="email">Email компании:</label>
        <input id="email" type="email" required defaultValue={location.state.email} />
        <button type="submit">Обновить партнера</button>
      </form>
    </div>
  );
}
