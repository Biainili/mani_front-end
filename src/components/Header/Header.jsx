import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import "./Header.css";

export default function Header() {
    const { user, onClose, onToggleButton } = useTelegram();


    return (
        <div className={"nav_bar"}>
            <div className='user_header'>
                <span className={'username'}>
                    {user?.username ? user?.username : "Armen"}
                </span>
                <Button onClick={onClose}>Закрыть</Button>
            </div>
            <div className={'header'}>
                <Button onClick={onClose}>Создать Заказ</Button>
                <Button onClick={onClose}>Наши Товары</Button>
                <Button onClick={onClose}>Связ с Админом</Button>
            </div>
        </div>
    );
}
