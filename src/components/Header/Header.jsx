import React from 'react'
import Button from '../Button/Button'

export default function Header() {
    const tg = window.Telegram.WebApp;
    const onClose = () => {
        tg.close()
    };
    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.Username}
            </span>
        </div>
    )
}