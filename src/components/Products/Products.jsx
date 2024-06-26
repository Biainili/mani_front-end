import React, { useState, useEffect } from 'react';
import './Products.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
    { id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые' },
    { id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая' },
    { id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые' },
    { id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая' },
    { id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые' },
    { id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая' },
    { id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые' },
    { id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая' },
];

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
};

function Products() {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();

    useEffect(() => {
        if (addedItems.length > 0) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(addedItems)}`
            });
        } else {
            tg.MainButton.hide();
        }
    }, [addedItems, tg]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);
    };

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id} // добавление уникального ключа
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
}

export default Products;
