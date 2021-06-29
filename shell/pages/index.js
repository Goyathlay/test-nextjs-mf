import React from "react";
import dynamic from "next/dynamic";
// import Title from '../components/title'

const Title = dynamic(() => import("ComponentKit/title"), {
  ssr: false,
});

const Home = () => (
  <div>
    <Title>Micro Shell</Title>
   </div>
);

export default Home;
