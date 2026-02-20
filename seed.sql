-- 1. Clear existing data
TRUNCATE TABLE "EmiPlan", "Variant", "Product" RESTART IDENTITY CASCADE;

-- 2. Insert 3 Products
INSERT INTO "Product" (id, name, slug, description) VALUES
('p1', 'iPhone 17 Pro', 'iphone-17-pro', 'Apple flagship with Titanium design'),
('p2', 'Samsung S24 Ultra', 'samsung-s24-ultra', 'Ultimate AI-powered Android experience'),
('p3', 'Google Pixel 9 Pro', 'pixel-9-pro', 'Google’s most powerful AI-driven smartphone');

-- 3. Insert Variants
INSERT INTO "Variant" (id, storage, color, mrp, "currentPrice", "imageUrl", "productId") VALUES
('v1', '256GB', 'Titanium Orange', 134900, 127400, 'https://example.com/iphone-orange.png', 'p1'),
('v2', '512GB', 'Natural Titanium', 154900, 147400, 'https://example.com/iphone-natural.png', 'p1'),
('v3', '1TB', 'Black Titanium', 184900, 177400, 'https://example.com/iphone-black.png', 'p1'),
('v4', '256GB', 'Titanium Gray', 129999, 115999, 'https://example.com/s24-gray.png', 'p2'),
('v5', '512GB', 'Titanium Violet', 139999, 125999, 'https://example.com/s24-violet.png', 'p2'),
('v6', '128GB', 'Obsidian', 109900, 99900, 'https://example.com/pixel-obsidian.png', 'p3'),
('v7', '256GB', 'Porcelain', 119900, 109900, 'https://example.com/pixel-porcelain.png', 'p3');

-- 4. Insert EMI Plans (Adding 'id' values e1, e2, e3...)
INSERT INTO "EmiPlan" (id, "monthlyAmount", "tenureMonths", "interestRate", "additionalCashback", "variantId") VALUES
-- iPhone 17 Pro 256GB (v1)
('e1', 42467, 3, 0, 7500, 'v1'), ('e2', 21233, 6, 0, 7500, 'v1'), ('e3', 2842, 60, 10.5, 7500, 'v1'),
-- iPhone 17 Pro 512GB (v2)
('e4', 49133, 3, 0, 5000, 'v2'), ('e5', 24566, 6, 0, 5000, 'v2'), ('e6', 3280, 60, 10.5, 5000, 'v2'),
-- iPhone 17 Pro 1TB (v3)
('e7', 59133, 3, 0, 0, 'v3'), ('e8', 29566, 6, 0, 0, 'v3'), ('e9', 3945, 60, 10.5, 0, 'v3'),
-- Samsung S24 256GB (v4)
('e10', 38666, 3, 0, 10000, 'v4'), ('e11', 19333, 6, 0, 10000, 'v4'), ('e12', 2588, 60, 12, 10000, 'v4'),
-- Samsung S24 512GB (v5)
('e13', 41999, 3, 0, 10000, 'v5'), ('e14', 20999, 6, 0, 10000, 'v5'), ('e15', 2811, 60, 12, 10000, 'v5'),
-- Pixel 9 Pro 128GB (v6)
('e16', 33300, 3, 0, 8000, 'v6'), ('e17', 16650, 6, 0, 8000, 'v6'), ('e18', 2227, 60, 11, 8000, 'v6'),
-- Pixel 9 Pro 256GB (v7)
('e19', 36633, 3, 0, 8000, 'v7'), ('e20', 18316, 6, 0, 8000, 'v7'), ('e21', 2450, 60, 11, 8000, 'v7');