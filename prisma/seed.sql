-- Disable foreign key checks to prevent ordering issues during import
SET session_replication_role = 'replica';

-- Clear existing data (Optional, but recommended for a clean seed)
TRUNCATE TABLE "EmiPlan", "Variant", "Product" RESTART IDENTITY CASCADE;

-- 1. Insert Products
INSERT INTO "Product" ("id", "slug", "name", "description") VALUES
('p1', 'iphone-17-pro', 'iPhone 17 Pro', 'Apple flagship with Titanium design'),
('p2', 'samsung-s24-ultra', 'Samsung S24 Ultra', 'Ultimate AI-powered Android experience'),
('p3', 'pixel-9-pro', 'Google Pixel 9 Pro', 'Google’s most powerful AI-driven smartphone');

-- 2. Insert Variants
INSERT INTO "Variant" ("id", "storage", "color", "mrp", "currentPrice", "imageUrl", "productId") VALUES
('v2', '512GB', 'Silver', 154900, 147400, 'https://res.cloudinary.com/ashishrana/image/upload/white_ynnezj.jpg', 'p1'),
('v1', '256GB', 'Deep Blue', 134900, 127400, 'https://res.cloudinary.com/ashishrana/image/upload/v1771568427/71ddhabs2mL_pg4sam.jpg', 'p1'),
('v3', '1TB', 'Cosmic Orange', 184900, 177400, 'https://res.cloudinary.com/ashishrana/image/upload/v1771568377/714TxWv1JYL_huycwf.jpg', 'p1'),
('v4', '256GB', 'Titanium Grey', 129999, 115999, 'https://res.cloudinary.com/ashishrana/image/upload/v1771569178/71-EnPs_uQL_uf1fas.jpg', 'p2'),
('v5', '512GB', 'Titanium Violet', 139999, 125999, 'https://res.cloudinary.com/ashishrana/image/upload/v1771569178/71-EnPs_uQL_uf1fas.jpg', 'p2'),
('v7', '256GB', 'Moonstone', 119900, 109900, 'https://res.cloudinary.com/ashishrana/image/upload/v1771569506/31y93k7DsXL_qxwixg.jpg', 'p3'),
('v6', '128GB', 'Jade', 109900, 99900, 'https://res.cloudinary.com/ashishrana/image/upload/v1771569751/-original-imahfjsf5fxqvmhf_yyjm0u.jpg', 'p3');

-- 3. Insert EMI Plans
INSERT INTO "EmiPlan" ("id", "monthlyAmount", "tenureMonths", "interestRate", "additionalCashback", "variantId") VALUES
('e1', 42467, 3, 0, 7500, 'v1'),
('e2', 21233, 6, 0, 7500, 'v1'),
('e3', 2842, 60, 10.5, 7500, 'v1'),
('e4', 49133, 3, 0, 5000, 'v2'),
('e5', 24566, 6, 0, 5000, 'v2'),
('e6', 3280, 60, 10.5, 5000, 'v2'),
('e7', 59133, 3, 0, 0, 'v3'),
('e8', 29566, 6, 0, 0, 'v3'),
('e9', 3945, 60, 10.5, 0, 'v3'),
('e10', 38666, 3, 0, 10000, 'v4'),
('e11', 19333, 6, 0, 10000, 'v4'),
('e12', 2588, 60, 12, 10000, 'v4'),
('e13', 41999, 3, 0, 10000, 'v5'),
('e14', 20999, 6, 0, 10000, 'v5'),
('e15', 2811, 60, 12, 10000, 'v5'),
('e16', 33300, 3, 0, 8000, 'v6'),
('e17', 16650, 6, 0, 8000, 'v6'),
('e18', 2227, 60, 11, 8000, 'v6'),
('e19', 36633, 3, 0, 8000, 'v7'),
('e20', 18316, 6, 0, 8000, 'v7'),
('e21', 2450, 60, 11, 8000, 'v7');

-- Re-enable foreign key checks
SET session_replication_role = 'origin';