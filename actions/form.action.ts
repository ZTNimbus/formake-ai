"use server";

import { defaultBackgroundColor, defaultPrimaryColor } from "@/contants";
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
    const views = _sum?.views ?? 0;
    const totalResponses = _sum?.responses ?? 0;
    const totalFormsCreated = _count?.id ?? 0;
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

export async function createForm(data: { name: string; description: string }) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) return { success: false, message: "User not found" };

    const formSettings = await prisma.formSettings.create({
      data: {
        primaryColor: defaultPrimaryColor,
        backgroundColor: defaultBackgroundColor,
      },
    });

    const form = await prisma.form.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
        creatorName: user?.given_name || "",
        settingsId: formSettings.id,
      },
    });

    if (!form) return { success: false, message: "Form not created" };

    return {
      success: true,
      message: "Form created successfully",
      form,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while creating form",
    };
  }
}

export async function fetchAllForms() {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) return { success: false, message: "User not found" };

    const forms = await prisma.form.findMany({
      where: { userId: user.id },
      include: { settings: true },

      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      forms,
      message: "Successfully fetched forms",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching forms",
    };
  }
}
