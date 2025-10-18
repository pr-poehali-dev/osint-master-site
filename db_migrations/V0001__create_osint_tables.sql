-- Создание таблицы для хранения данных о персонах
CREATE TABLE IF NOT EXISTS persons (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birth_date DATE,
    age INTEGER,
    phone VARCHAR(50),
    email VARCHAR(255),
    city VARCHAR(100),
    region VARCHAR(100),
    address TEXT,
    operator VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для Telegram профилей
CREATE TABLE IF NOT EXISTS telegram_profiles (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    username VARCHAR(100) UNIQUE,
    user_id VARCHAR(50),
    bio TEXT,
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для VK профилей
CREATE TABLE IF NOT EXISTS vk_profiles (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    vk_id VARCHAR(50) UNIQUE,
    username VARCHAR(100),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для социальных сетей
CREATE TABLE IF NOT EXISTS social_media (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    platform VARCHAR(50),
    profile_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для родственников
CREATE TABLE IF NOT EXISTS relatives (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    relative_name VARCHAR(255),
    relation_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для фотографий
CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    photo_url TEXT,
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_persons_phone ON persons(phone);
CREATE INDEX IF NOT EXISTS idx_persons_email ON persons(email);
CREATE INDEX IF NOT EXISTS idx_persons_name ON persons(first_name, last_name);
CREATE INDEX IF NOT EXISTS idx_telegram_username ON telegram_profiles(username);
CREATE INDEX IF NOT EXISTS idx_vk_username ON vk_profiles(username);
CREATE INDEX IF NOT EXISTS idx_vk_id ON vk_profiles(vk_id);

-- Вставка тестовых данных
INSERT INTO persons (full_name, first_name, last_name, birth_date, age, phone, email, city, region, address, operator)
VALUES 
('Иванов Иван Иванович', 'Иван', 'Иванов', '1985-03-15', 39, '+79001234567', 'ivanov@example.com', 'Москва', 'Москва', 'г. Москва, ул. Ленина, д. 10', 'МегаФон'),
('Петров Петр Петрович', 'Петр', 'Петров', '1990-07-22', 34, '+79009876543', 'petrov@example.com', 'Санкт-Петербург', 'Ленинградская область', 'г. Санкт-Петербург, Невский пр., д. 25', 'МТС'),
('Сидорова Мария Александровна', 'Мария', 'Сидорова', '1995-11-08', 29, '+79005555555', 'sidorova@example.com', 'Казань', 'Татарстан', 'г. Казань, ул. Баумана, д. 5', 'Билайн');

INSERT INTO telegram_profiles (person_id, username, user_id, bio, last_seen)
VALUES 
(1, 'ivanov_ivan', '123456789', 'Программист | Москва', '2024-10-18 14:30:00'),
(2, 'petrov_petr', '987654321', 'Разработчик | СПб', '2024-10-19 10:15:00');

INSERT INTO vk_profiles (person_id, vk_id, username, city)
VALUES 
(1, 'id12345', 'ivanov.ivan', 'Москва'),
(2, 'id54321', 'petrov.petr', 'Санкт-Петербург'),
(3, 'id99999', 'sidorova.maria', 'Казань');

INSERT INTO social_media (person_id, platform, profile_url)
VALUES 
(1, 'VK', 'https://vk.com/ivanov.ivan'),
(1, 'Instagram', 'https://instagram.com/ivanov_ivan'),
(2, 'VK', 'https://vk.com/petrov.petr'),
(3, 'VK', 'https://vk.com/sidorova.maria');

INSERT INTO relatives (person_id, relative_name, relation_type)
VALUES 
(1, 'Иванов Иван Петрович', 'Отец'),
(1, 'Иванова Мария Сергеевна', 'Мать');