# 1Fi — Assignment

1Fi is a high-performance Next.js 15 application designed to provide a seamless shopping experience for flagship smartphones. It features dynamic variant switching (color/storage), real-time price updates, and a comprehensive EMI plan breakdown for each device.



---

## 🚀 Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), React 19
- **Database:** PostgreSQL
- **ORM:** [Prisma 7](https://www.prisma.io/) (with Driver Adapters)
- **Styling:** Tailwind CSS 4.0
- **UI Components:** Shadcn UI, Lucide React, Sonner (Toasts)
- **State Management:** React Hooks (useState, useEffect)

---

## ⚙️ Setup & Installation

Follow these steps to get the project running locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/1fI.git](https://github.com/your-username/1fI.git)
cd 1fI
```

### 2. Configure Environment Variables

Create a .env file in the root directory and add your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
NODE_ENV="development"
```

### 3. Initialize the Database (Prisma 7 Flow)
Prisma 7 requires a prisma.config.ts for connection management. Run these commands to sync your schema and populate the data:
```bash
# Generate the Prisma Client
npx prisma generate

# Sync the schema with your database instance
npx prisma db push

# Seed the database with product data (iPhone, Samsung, Pixel)
npx prisma db seed
```

### 4. Run the Development Server
```bash
npm run dev
```

## API Endpoints

### 1. Get All Products
GET `/api/products`
Retrieves a list of all smartphones, their descriptions, and nested variant data.

### 2. Get Product by Slug
GET `/api/products/[slug]`
Fetches full details for a specific device.

Example response for `/api/products`:
```bash
[
    {
        "id": "p1",
        "slug": "iphone-17-pro",
        "name": "iPhone 17 Pro",
        "description": "Apple flagship with Titanium design",
        "variants": [
            {
                "id": "v2",
                "storage": "512GB",
                "color": "Silver",
                "mrp": 154900,
                "currentPrice": 147400,
                "imageUrl": "https://res.cloudinary.com/ashishrana/image/upload/white_ynnezj.jpg",
                "productId": "p1"
            }
        ]
    },
    {
        "id": "p2",
        "slug": "samsung-s24-ultra",
        "name": "Samsung S24 Ultra",
        "description": "Ultimate AI-powered Android experience",
        "variants": [
            {
                "id": "v4",
                "storage": "256GB",
                "color": "Titanium Grey",
                "mrp": 129999,
                "currentPrice": 115999,
                "imageUrl": "https://res.cloudinary.com/ashishrana/image/upload/v1771569178/71-EnPs_uQL_uf1fas.jpg",
                "productId": "p2"
            },
            {
                "id": "v5",
                "storage": "512GB",
                "color": "Titanium Violet",
                "mrp": 139999,
                "currentPrice": 125999,
                "imageUrl": "https://res.cloudinary.com/ashishrana/image/upload/v1771569178/71-EnPs_uQL_uf1fas.jpg",
                "productId": "p2"
            }
        ]
    }
]
```

Example Response for `/api/products/iphone-17-pro`:
```bash 
{
  "id": "p1",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "description": "Apple flagship with Titanium design",
  "variants": [
    {
      "id": "v1",
      "storage": "256GB",
      "color": "Deep Blue",
      "currentPrice": 127400,
      "imageUrl": "https://res.cloudinary.com/...",
      "emiPlans": [
        {
          "tenureMonths": 3,
          "monthlyAmount": 42467,
          "interestRate": 0,
          "additionalCashback": 7500
        },
        {
          "tenureMonths": 6,
          "monthlyAmount": 21233,
          "interestRate": 0,
          "additionalCashback": 7500
        }
      ]
    },
    {
      "id": "v2",
      "storage": "512GB",
      "color": "Silver",
      "currentPrice": 147400,
      "imageUrl": "https://res.cloudinary.com/...",
      "emiPlans": [
        {
          "tenureMonths": 6,
          "monthlyAmount": 24566,
          "interestRate": 0,
          "additionalCashback": 5000
        }
      ]
    }
  ]
}
```

## 🗄️ Database Architecture

The schema uses a three-tier relational model to ensure data integrity and flexibility for e-commerce needs:

1. Product Table: Stores the core device identity (Name, Slug, Description).

2. Variant Table: Handles specific configurations like storage capacity, color, pricing, and Cloudinary image URLs.

3. EmiPlan Table: Contains financing mathematics (tenure, interest, cashback) linked directly to specific variants.
