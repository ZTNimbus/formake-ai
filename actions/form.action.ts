"use server";

import { prisma } from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function fetchFormStats() {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) return { success: false, message: "User not found" };

    const { _sum, _count } = await prisma.form.aggregate({
      where: { userId: user.id },
      _sum: { views: true, responses: true },
      _count: { id: true },
    });

    //stats
    const views = _sum.views ?? 0;
    const totalResponses = _sum.responses ?? 0;
    const totalFormsCreated = _count.id ?? 0;
    const conversionRate = views > 0 ? (totalResponses / views) * 100 : 0;
    const engagementRate =
      totalFormsCreated > 0 ? (totalResponses / totalFormsCreated) * 100 : 0;

    return {
      success: true,
      views,
      totalResponses,
      totalFormsCreated,
      conversionRate,
      engagementRate,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching form stats",
    };
  }
}
