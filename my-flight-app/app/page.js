import HeaderText from "@/components/ui/HeaderText";
import RenderFlights from "../components/ui/RenderFlights";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <>
      <HeaderText />
      <Suspense fallback={<Loading />}>
        <RenderFlights />
      </Suspense>
    </>
  );
}
