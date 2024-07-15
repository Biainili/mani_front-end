import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user, onClose, onToggleButton } = useTelegram();
  const navigate = useNavigate();
  const closer = false;

  const handleOrderClick = () => {
    navigate("/");
  };
  const handleMainClick = () => {
    navigate("/products");
  };

  const onHandleIndividual = () => {
    window.open('https://t.me/mode_mani', '_blank');
  }

  return (
    <div className={"nav_bar"}>
      <div className="user_header">
        <div className={"name_container"}>
          <span className={"username"}>
            {user?.first_name} {user?.last_name}
          </span>
          <span className={"username"}>{user?.username}</span>
        </div>

        <Button onClick={onClose}>Закрыть</Button>
      </div>
      <div className={"header"}>
     {closer && <Button onClick={handleOrderClick}>Создать Заказ</Button>}
     {closer &&<Button onClick={handleMainClick}>Наши Товары</Button>}
        <Button onClick={onHandleIndividual}>Связ с Админом</Button>
      </div>
    </div>
  );
}
