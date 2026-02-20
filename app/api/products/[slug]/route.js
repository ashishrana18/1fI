import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request, { params }) {
  // In Next.js 15/16, params is a Promise, so we 'await' it
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: {
                tenureMonths: "asc" // Ensures plans are listed from 3 to 60 months
              }
            }
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
