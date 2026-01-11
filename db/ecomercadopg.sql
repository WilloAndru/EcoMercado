-- Dump adaptado a PostgreSQL

-- Tipos ENUM de PostgreSQL
CREATE TYPE user_role AS ENUM ('client','admin');
CREATE TYPE transaction_type AS ENUM ('purchase','sale');

-- Tabla categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    image VARCHAR(510) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (id, name, image, created_at, updated_at) VALUES
(1, 'Sustainable energy', 'https://i.ibb.co/HWnLHWF/c-1.png', '2024-07-17', '2024-07-17'),
(2, 'Cleaning', 'https://i.ibb.co/R4Sqw1W9/c-2.png', '2024-07-17', '2024-07-17'),
(3, 'Fashion and accessories', 'https://i.ibb.co/sJJgBY5B/c-3.png', '2024-07-17', '2024-07-17'),
(4, 'Home and decor', 'https://i.ibb.co/B51tC4yw/c-4.png', '2024-07-17', '2024-07-17'),
(5, 'Food and beverages', 'https://i.ibb.co/gL1vC8Ch/c-5.png', '2024-07-17', '2024-07-17'),
(6, 'Transportation', 'https://i.ibb.co/2003HySx/c-6.png', '2024-07-17', '2024-07-17'),
(7, 'Stationery and office', 'https://i.ibb.co/hFq90sjq/c-7.png', '2024-07-17', '2024-07-17'),
(8, 'Outdoors', 'https://i.ibb.co/spYbdVWF/c-8.png', '2024-07-17', '2024-07-17');

-- Tabla products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(63) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (id, name, image, description, price, quantity, category_id, created_at, updated_at) VALUES
(1, 'LED bulb', 'https://i.ibb.co/KxKwdvMF/1.jpg', 'High-power LED bulb (1000 lumens) with warm white light adjustment. Saves energy with over 20,000 hours of lifespan.', 4, 9, 1, '2024-07-20', '2025-11-19'),
(2, 'Recyclable water bottle', 'https://i.ibb.co/Y7w8GjBV/2.jpg', 'Eco-friendly and durable, BPA-free. Ergonomic design, leak-proof cap, available in vibrant colors.', 1, 15, 5, '2024-07-20', '2025-06-16'),
(3, 'Cloth bag', 'https://i.ibb.co/bg6gYGm4/3.jpg', 'Sustainable and versatile, ideal for shopping. Made from recycled materials, durable and washable.', 1, 20, 3, '2024-07-20', '2024-07-28'),
(4, 'Solar panel', 'https://i.ibb.co/ccqzNVR7/4.jpg', 'Generates 300W, ideal for homes. Water-resistant and durable, easy to install, and highly efficient.', 10, 4, 1, '2024-07-20', '2025-06-16'),
(5, 'Naturally-derived detergent', 'https://i.ibb.co/BVDwb0KB/5.jpg', '1L natural detergent formulated with biodegradable ingredients. Effective against tough stains, gentle on skin and the environment.', 10, 5, 2, '2024-07-20', '2024-07-31'),
(6, 'Recyclable shirt', 'https://i.ibb.co/RTMGrhxL/6.jpg', 'Made with high-quality reused materials. Modern and comfortable design, ideal for a conscious lifestyle.', 10, 5, 3, '2024-07-20', '2024-07-20'),
(7, 'Electric car', 'https://i.ibb.co/04jtKXX/7.jpg', '400 km range, fast charging in 30 minutes. Advanced technology, zero emissions, and aerodynamic design.', 12500, 1, 6, '2024-07-20', '2024-07-20'),
(8, '100kg composting', 'https://i.ibb.co/RT1W2FYN/8.jpg', 'Natural and efficient process that transforms waste into organic fertilizer. Perfect for gardens and crops.', 25, 5, 8, '2024-07-20', '2024-07-20'),
(9, 'Recyclable paper', 'https://i.ibb.co/qLhd6jr0/9.jpg', 'Made from high-quality recycled fibers. Sustainable and versatile, ideal for eco-friendly printing and packaging', 5, 10, 7, '2024-07-20', '2025-06-16'),
(10, 'Reusable AA battery', 'https://i.ibb.co/zhY5VCVh/10.jpg', 'Designed for multiple uses, rechargeable up to 500 times. Eco-friendly and cost-effective, ideal for electronic devices.', 10, 5, 1, '2024-07-20', '2025-06-15'),
(11, 'Bamboo toothbrush', 'https://i.ibb.co/GrV2P1k/11.jpg', 'Sustainable and biodegradable, with soft and durable bristles. An eco-friendly alternative for dental hygiene.', 3, 20, 2, '2024-07-20', '2024-08-01'),
(12, 'Solid soap', 'https://i.ibb.co/r2rDyBKn/12.jpg', 'Discover the Solid Soap that will transform your daily routine! Made with natural ingredients, our soap provides a gentle and effective cleanse.', 1, 15, 2, '2024-07-20', '2025-06-16'),
(13, 'Recyclable cloth', 'https://i.ibb.co/N6NbYy9Z/13.jpg', 'Discover the Recyclable Cloth that redefines sustainability in your home! Made from high-quality reused materials.', 1.5, 20, 2, '2024-07-20', '2024-07-20'),
(14, 'Electric bicycle', 'https://i.ibb.co/vxQb18LK/14.jpg', 'Discover our revolutionary electric bike: a powerful 500W motor for effortless rides, long-lasting lithium battery, and sleek design for maximum comfort and efficiency.', 1500, 1, 6, '2024-07-20', '2024-07-20'),
(15, 'Vertical garden', 'https://i.ibb.co/WWKF1X6w/15.jpg', 'Discover our innovative vertical garden: optimize your space with a modular design that adapts to any environment.', 100, 5, 8, '2024-07-20', '2024-07-20'),
(16, 'Reusable straws', 'https://i.ibb.co/xq165VPL/16.jpg', 'Set of 10 recyclable stainless steel straws: reusable, easy to clean, and environmentally friendly.', 2, 20, 5, '2024-07-20', '2024-07-20'),
(17, 'Stainless steel thermos', 'https://i.ibb.co/4Z1JGddw/17.jpg', 'Keeps drinks hot or cold for hours, durable and eco-friendly. Ideal for any occasion.', 8, 10, 5, '2024-07-20', '2024-07-25'),
(18, 'Recyclable paper towels', 'https://i.ibb.co/Kxfcjqsb/18.jpg', 'Absorbent, durable, and eco-friendly. Perfect for keeping your kitchen clean and green.', 2, 15, 2, '2024-07-20', '2025-06-16'),
(19, 'Outdoor solar lamp', 'https://i.ibb.co/3m839HXn/19.jpg', 'Solar-powered, weather-resistant, and lights up your garden in an eco-friendly way.', 70, 5, 8, '2024-07-20', '2024-07-20'),
(20, 'Biodegradable trash bags', 'https://i.ibb.co/DgK1fHGX/20.jpg', 'Strong, eco-friendly, and safe for the environment. Keep your home clean without harming the planet.', 1, 20, 2, '2024-07-20', '2024-07-20'),
(21, 'Wooden train', 'https://i.ibb.co/xS7YXMFr/21.jpg', 'A classic and durable toy made with eco-friendly materials. Safe and educational fun for children.', 5, 5, 4, '2024-07-20', '2024-07-20'),
(22, 'Recyclable notebook', 'https://i.ibb.co/HLJXcFkz/22.jpg', 'Made with recycled paper sheets, eco-friendly and durable design. Perfect for writing while caring for the planet.', 2, 10, 7, '2024-07-20', '2024-08-11'),
(23, 'Clay pot', 'https://i.ibb.co/dJGfG8pD/23.jpg', 'Natural, durable, and elegant. Ideal for your plants, it adds a rustic and eco-friendly touch to your home.', 1.5, 20, 8, '2024-07-20', '2024-07-28'),
(24, 'Soy wax candle', 'https://i.ibb.co/G4DQGgcp/24.jpg', 'Natural, eco-friendly, and long-lasting. Gentle scents for a cozy, toxin-free atmosphere.', 1, 20, 4, '2024-07-20', '2024-08-11'),
(25, 'Stainless steel utensil set', 'https://i.ibb.co/HTjyCPB4/25.jpg', 'Durable, stylish, and corrosion-resistant. Ideal for a modern and efficient kitchen.', 15, 5, 5, '2024-07-20', '2025-06-13'),
(26, 'Indoor lamp', 'https://i.ibb.co/YBvr7CxY/26.jpg', 'Elegant stainless lamp with weather-resistant design, ideal for modern interiors.', 50, 5, 4, '2024-07-20', '2024-07-20'),
(27, 'Painting on recyclable canvas', 'https://i.ibb.co/8Ch1fcz/27.jpg', 'Sustainable art with long-lasting colors, ideal for decorating with eco-conscious style.', 40, 5, 4, '2024-07-20', '2025-06-16'),
(28, 'Stainless steel bracelet', 'https://i.ibb.co/5xt96gZw/28.jpg', 'Durable, modern design with a polished, wear-resistant finish — perfect for any occasion.\r\n\r\n', 10, 5, 3, '2024-07-20', '2024-08-01'),
(29, 'White gold earrings', 'https://i.ibb.co/0p9ZNGN7/29.jpg', 'Timeless elegance with a classic and brilliant design ideal for a touch of sophistication.', 30, 5, 3, '2024-07-20', '2024-07-31'),
(30, 'Electric scooter', 'https://i.ibb.co/k2FG4PBb/30.jpg', 'Fast and compact, with a long-lasting battery and ergonomic design — perfect for urban mobility.', 100, 2, 6, '2024-07-20', '2024-07-20'),
(31, 'Electric car motor', 'https://i.ibb.co/vvY4TRfk/31.jpg', 'Powerful and efficient, featuring advanced technology for optimal performance and maximum range.', 3900, 1, 6, '2024-07-20', '2024-07-20'),
(32, 'Lightweight bicycle', 'https://i.ibb.co/N0nHP1s/32.jpg', 'Ideal for city and trail rides, with precise gear shifting and ergonomic design for comfort on every journey.', 80, 1, 6, '2024-07-20', '2024-07-20'),
(33, 'Recycled printer cartridges', 'https://i.ibb.co/Ndphb9cJ/33.jpg', 'High-quality recycled cartridges that offer reliable performance and cost savings with a reduced environmental impact.', 20, 5, 7, '2024-07-20', '2024-07-20'),
(34, 'Biodegradable bins', 'https://i.ibb.co/5WRbq2mk/34.jpg', 'Sturdy and practical, ideal for reducing waste with an eco-friendly and sustainable solution.', 22, 10, 7, '2024-07-20', '2024-07-20'),
(35, 'Recycled shoes', 'https://i.ibb.co/Nd8RMcn8/35.jpg', 'Modern style, made with sustainable materials for an eco-friendly and comfortable look with every step.', 25, 5, 3, '2024-07-20', '2024-08-11'),
(36, 'Self-charging flashlight with solar panel', 'https://i.ibb.co/sv28vrSS/36.jpg', 'Equipped with a solar panel for automatic daytime charging, 2000mAh battery, durable and easy to use.', 11, 5, 1, '2024-08-01', '2024-08-04');

-- Tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'client',
    email VARCHAR(32) NOT NULL,
    google_id VARCHAR(63),
    name VARCHAR(63),
    picture VARCHAR(127),
    address VARCHAR(32) DEFAULT '',
    phone VARCHAR(10) DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, role, email, google_id, name, picture, address, phone, created_at, updated_at) VALUES
(1, 'admin', 'ecomercado@gmail.com', NULL, 'ecomercado', NULL, '', '', '2024-09-06', '2025-06-15'),
(2, 'admin', 'wilsonandrescriollo@gmail.com', '108657531028414551039', 'Wilson Andres Criollo Rodriguez', 'https://lh3.googleusercontent.com/a/ACg8ocINkQfMrjasVQsPg_M8Qyamm4adJp3jRnDpVkHyG-ot2UaCyT4U=s96-c', '', '', '2025-11-18', '2025-11-18');

-- Tabla transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    type transaction_type NOT NULL,
    income INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions (id, user_id, product_id, type, income, quantity, created_at, updated_at) VALUES
(1, 1, 1, 'sale', 0, 10, '2024-08-11', '2024-08-11'),
(2, 1, 2, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(3, 1, 3, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(4, 1, 4, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(5, 1, 5, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(6, 1, 6, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(7, 1, 7, 'sale', 0, 1, '2024-08-11', '2024-08-11'),
(8, 1, 8, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(9, 1, 9, 'sale', 0, 10, '2024-08-11', '2024-08-11'),
(10, 1, 10, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(11, 1, 11, 'sale', 0, 10, '2024-08-11', '2024-08-11'),
(12, 1, 12, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(13, 1, 13, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(14, 1, 14, 'sale', 0, 1, '2024-08-11', '2024-08-11'),
(15, 1, 15, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(16, 1, 16, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(17, 1, 17, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(18, 1, 18, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(19, 1, 19, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(20, 1, 20, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(21, 1, 21, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(22, 1, 22, 'sale', 0, 10, '2024-08-11', '2024-08-11'),
(23, 1, 23, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(24, 1, 24, 'sale', 0, 20, '2024-08-11', '2024-08-11'),
(25, 1, 25, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(26, 1, 26, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(27, 1, 27, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(28, 1, 28, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(29, 1, 29, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(30, 1, 30, 'sale', 0, 1, '2024-08-11', '2024-08-11'),
(31, 1, 31, 'sale', 0, 1, '2024-08-11', '2024-08-11'),
(32, 1, 32, 'sale', 0, 1, '2024-08-11', '2024-08-11'),
(33, 1, 33, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(34, 1, 34, 'sale', 0, 10, '2024-08-11', '2024-08-11'),
(35, 1, 35, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(36, 1, 36, 'sale', 0, 5, '2024-08-11', '2024-08-11'),
(37, 2, 1, 'purchase', 4, 1, '2025-11-19', '2025-11-19');

-- Ajustamos los autoincrement

SELECT setval(pg_get_serial_sequence('products','id'), COALESCE(MAX(id),0)) FROM products;
SELECT setval(pg_get_serial_sequence('users','id'), COALESCE(MAX(id),0)) FROM users;
SELECT setval(pg_get_serial_sequence('transactions','id'), COALESCE(MAX(id),0)) FROM transactions;
