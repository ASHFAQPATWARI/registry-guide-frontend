import StoreDetails from "@/screens/stores/detail";
import React from "react";

async function StoreDetailPage({ params }: any) {
  const resolvedParams = await params;
  const { detail } = resolvedParams;

  return <StoreDetails detail={detail} />;
}

export default StoreDetailPage;