import styled from "styled-components";

import { ethers } from "ethers";
import SodaFactory from "../artifacts/contracts/Soda.sol/SodaFactory.json";
import { useState } from "react";

import Home from "./Home";

export default function Index({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
}) {
  const [filter, setFilter] = useState(AllData);

  return <Home />;
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    SodasFactory.abi,
    provider
  );

  const getAllSodas = contract.filters.sodaCreated();
  const AllSodas = await contract.queryFilter(getAllSodas);
  const AllData = AllSodas.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.sodaAddress,
    };
  });

  const getHealthSodas= contract.filters.sodaCreated(
    null,
    null,
    null,
    null,
    null,
    null
  );
  const HealthSodas = await contract.queryFilter(getHealthSodas);
  const HealthData = HealthSodas.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.sodaAddress,
    };
  });

  const getEducationSodas = contract.filters.sodaCreated(
    null,
    null,
    null,
    null,
    null,
    null
  );
  const EducationSodas = await contract.queryFilter(getEducationSodas);
  const EducationData = EducationSodas.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.chaiAddress,
    };
  });

  const getAnimalSodas = contract.filters.sodasCreated(
    null,
    null,
    null,
    null,
    null,
    null
  );
  const AnimalSodas = await contract.queryFilter(getAnimalSodas);
  const AnimalData = AnimalSodas.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.chaiAddress,
    };
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
    },
    revalidate: 10,
  };
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`;
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: normal;
  cursor: pointer;
`;
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`;
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`;
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;
const Title = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;