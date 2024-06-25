import React from 'react'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'

export default function Header() {
const {user, onClose, onToggleButton} = useTelegram();
 
    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close</Button>
            <span className={'username'}>
                {user?.Username}
            </span>
        </div>
    )
}
