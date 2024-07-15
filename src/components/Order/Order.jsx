import React, { useCallback, useEffect, useState } from "react";
import "./Order.css";
import { useTelegram } from "../../hooks/useTelegram";
import Toy_img from "../../assets/img/toy_img.webp";
import Backpack_img from "../../assets/img/backpack_img.webp";

// Функция для генерации уникального идентификатора из 7 цифр
const generateUniqueId = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

function Order() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("M");
  const [price, setPrice] = useState(8500);
  const [productType, setProductType] = useState("toy");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [orderId] = useState(generateUniqueId()); // Генерация уникального идентификатора
  const { tg } = useTelegram();

  const onHandleIndividual = () => {
    window.open('https://t.me/mode_mani', '_blank');
  }

  const onSendData = useCallback(() => {
    const formData = new FormData();
    formData.append("orderId", orderId); // Включение идентификатора заказа
    formData.append("country", country);
    formData.append("city", city);
    formData.append("size", size);
    formData.append("productType", productType);
    formData.append("photo", photo);
    formData.append("price", price);  
    formData.append("chatId", tg.initDataUnsafe.user.id);

    fetch("http://localhost:3000/send-photo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          tg.sendData(JSON.stringify({ success: true }));
        } else {
          console.error("Error sending data");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [country, city, size, productType, photo, price, orderId, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({ text: "Отправить Заказ" });
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
    switch (e.target.value) {
      case 'S':
        setPrice(7500);
        break;
      case 'M':
        setPrice(8500);
        break;
      case 'L':
        setPrice(9500);
        break;
      default:
        setPrice(0); // Неизвестный размер
    }
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
    <div className={"form"}>
      <h2>Заказать</h2>
      <h3>Введите параметры для вашего заказа</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Адрес"}
        value={city}
        onChange={onChangeCity}
      />
      <div className="prod_size">
        <h3>Выберите размер продукта</h3>
        <div className={"container_size"}>
          <label className={`product_B ${size === "S" ? "active_size" : ""}`}>
            <span className={`tex ${size === "S" ? "text_active" : ""}`}>
              S
            </span>
            <input
              type="radio"
              value="S"
              checked={size === "S"}
              onChange={onChangeSize}
            />
            <span className={"product_size tex size_sm"}>30 см</span>
            <span className={"product_size tex price"}>7500 руб.</span>
          </label>
          <label className={`product_B ${size === "M" ? "active_size" : ""}`}>
            <span className={`tex ${size === "M" ? "text_active" : ""}`}>
              M
            </span>
            <input
              type="radio"
              value="M"
              checked={size === "M"}
              onChange={onChangeSize}
            />
            <span className={"product_size tex size_sm"}>40 см</span>
            <span className={"product_size tex price"}>8500 руб.</span>
          </label>
          <label className={`product_B ${size === "L" ? "active_size" : ""}`}>
            <span className={`tex ${size === "L" ? "text_active" : ""}`}>
              L
            </span>
            <input
              type="radio"
              value="L"
              checked={size === "L"}
              onChange={onChangeSize}
            />
            <span className={"product_size tex size_sm"}>50 см</span>
            <span className={"product_size tex price"}>9500 руб.</span>
          </label>
        </div>
        <button onClick={onHandleIndividual} className={"toOrder"}>Индивидувльный Заказ</button>
      </div>
      <div className="product-type">
        <h3>Выберите тип продукта</h3>
        <div className="container_type">
          <label
            className={`product_A ${productType === "toy" ? "selected" : ""}`}
          >
            <span className={`${productType === "toy" ? "text_active" : ""}`}>
              Игрушка
            </span>
            <input
              type="radio"
              value="toy"
              checked={productType === "toy"}
              onChange={onChangeProductType}
            />
            <img src={Toy_img} alt="Игрушка" className="product_image" />
          </label>

              {/* <label
            className={product_A ${productType === "backpack" ? "selected" : ""
              }}
          >
            <span
              className={${productType === "backpack" ? "text_active" : ""}}
            >
              Рюкзак
            </span>
            <input
              type="radio"
              value="backpack"
              checked={productType === "backpack"}
              onChange={onChangeProductType}
            />
            <img src={Backpack_img} alt="Рюкзак" className="product_image" />
          </label> */}
          
        </div>
      </div>
      <div className="upload-photo">
        <h3>Загрузить фото</h3>
        <label htmlFor="file-upload" className="custom-file-upload">
          <span>+</span> Выбрать фото
        </label>
        <input id="file-upload" type="file" onChange={onChangePhoto} />
        {photoPreview && (
          <img src={photoPreview} alt="Превью фото" className="photo-preview" />
        )}
      </div>
    </div>
  );
}

export default Order;
