"use client";

import Head from "next/head";

import Brand from "@/src/components/sections/Brand";
import Introduction from "@/src/components/sections/Introduction";
import AboutUs from "@/src/components/sections/AboutUs";
import OurPets from "@/src/components/sections/OurPets";
import FAQ from "@/src/components/sections/FAQ";
import Footer from "@/src/components/general/Footer";
import Video from "@/src/components/sections/Video";

export default function Home() {
  return (
    <>
      <Head>
        <title>UPets</title>
      </Head>
      <main>
        <Brand />
        <Introduction />
        <AboutUs />
        <OurPets />
        <Video />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
