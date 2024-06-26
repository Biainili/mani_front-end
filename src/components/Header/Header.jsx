import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';

export default function Header() {
    const { user, onClose, onToggleButton } = useTelegram();

    console.log('User:', user); // Добавлено для отладки

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close</Button>
            <h1>{user?.username}</h1> {/* Исправлено имя свойства */}
            <span className={'username'}>
                {user?.username} {/* Исправлено имя свойства */}
            </span>
        </div>
    );
}
