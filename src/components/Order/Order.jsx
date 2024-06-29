import React, { useCallback, useEffect, useState } from 'react';
import './Order.css';
import { useTelegram } from '../../hooks/useTelegram';

function Order() {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [size, setSize] = useState('M');
    const [productType, setProductType] = useState('toy');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const formData = new FormData();
        formData.append('country', country);
        formData.append('city', city);
        formData.append('size', size);
        formData.append('productType', productType);
        formData.append('photo', photo);
        formData.append('chatId', tg.initDataUnsafe.user.id);

        fetch('http://localhost:3000/send-photo', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  tg.sendData(JSON.stringify({ success: true }));
              } else {
                  console.error('Error sending data');
              }
          })
          .catch(error => console.error('Error:', error));
    }, [country, city, size, productType, photo, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    useEffect(() => {
        tg.MainButton.setParams({ text: 'Отправить Заказ' });
    }, [tg]);

    useEffect(() => {
        if (!city || !size || !country || !photo) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, size, country, photo, tg]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeCity = (e) => {
        setCity(e.target.value);
    };

    const onChangeSize = (e) => {
        setSize(e.target.value);
    };

    const onChangeProductType = (e) => {
        setProductType(e.target.value);
    };

    const onChangePhoto = (e) => {
        const file = e.target.files[0];
        setPhoto(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
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
            <div className="product-type">
                <h3>Выберите тип продукта</h3>
                <label>
                    <input
                        type="radio"
                        value="toy"
                        checked={productType === 'toy'}
                        onChange={onChangeProductType}
                    />
                    Игрушка
                </label>
                <label>
                    <input
                        type="radio"
                        value="backpack"
                        checked={productType === 'backpack'}
                        onChange={onChangeProductType}
                    />
                    Рюкзак
                </label>
            </div>
            <div className="upload-photo">
                <h3>Загрузить фото</h3>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <span>+</span> Выбрать фото
                </label>
                <input id="file-upload" type="file" onChange={onChangePhoto} />
                {photoPreview && <img src={photoPreview} alt="Превью фото" className="photo-preview" />}
            </div>
        </div>
    );
}

export default Order;
