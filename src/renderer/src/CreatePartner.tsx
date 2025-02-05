import { useEffect, useRef } from "react";

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

export default function CreatePartner(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Создать партнера";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & Partner;
    const partner = {
      organization_type: target.organization_type.value,
      name: target.name.value,
      ceo: target.ceo.value,
      email: target.email.value,
      phone: target.phone.value,
      address: target.address.value,
      rating: target.rating.value,
    };
    await (window as any).api.createPartner(partner); //eslint-disable-line
    formRef.current?.reset();
  };

  return (
    <>
      <h1>Создать партнера</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="name">Наименование:</label>
        <input id="name" type="text" required />
        <label htmlFor="organization_type">Тип партнера:</label>
        <select name="organization_type" id="organization_type" required defaultValue={"ЗАО"}>
          <option value="ЗАО">ЗАО</option>
          <option value="ООО">ООО</option>
          <option value="ОАО">ОАО</option>
          <option value="ПАО">ПАО</option>
        </select>
        <label htmlFor="rating">Рейтинг:</label>
        <input id="rating" type="number" step="1" min="0" max="100" required />
        <label htmlFor="address">Адрес:</label>
        <input id="address" type="text" required />
        <label htmlFor="ceo">ФИО директора:</label>
        <input id="ceo" type="text" required />
        <label htmlFor="phone">Телефон:</label>
        <input id="phone" type="tel" required />
        <label htmlFor="email">Email компании:</label>
        <input id="email" type="email" required />
        <button type="submit">Создать партнера</button>
      </form>
    </>
  );
}
