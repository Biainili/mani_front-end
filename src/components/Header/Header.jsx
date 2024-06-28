import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import "./Header.css";

export default function Header() {
    const { user, onClose, onToggleButton } = useTelegram();


    return (
        <div className={'header'}>
            <Button onClick={onClose}>Создать Заказ</Button>
            <Button onClick={onClose}>Наши Товары</Button>
            <Button onClick={onClose}>Связ с Админом</Button>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username} 
            </span>
        </div>
    );
}
