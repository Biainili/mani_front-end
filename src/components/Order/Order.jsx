import React, { useEffect, useState } from 'react';
import './Order.css';
import { useTelegram } from '../../hooks/useTelegram';

function Order() {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [size, setSize] = useState('M');
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({ text: 'Отправить Заказ'});
    }, [tg]);

    useEffect(() => {
        if (!city || !size || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, size, country]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeCity = (e) => {
        setCity(e.target.value);
    };

    const onChangeSize = (e) => {
        setSize(e.target.value);
    };

    return (
        <div className={'form'}>
            <h2>Заказать</h2>
            <h3>Введите параметры для вашего заказа</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Адрес'}
                value={city}
                onChange={onChangeCity}
            />
            <select className={'select'} value={size} onChange={onChangeSize}>
                <option value={"XS - маленький мини"}>XS <i>15см</i></option>
                <option value={'S - маленький'}>S <i>20см</i></option>
                <option value={'M - Стандарт'}>M  <i>25см</i></option>
                <option value={'XL - Большой'}>XL <i>30см</i></option>
            </select>
        </div>
    );
}

export default Order;
