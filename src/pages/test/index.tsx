import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const cookies = context.req.headers.cookie;
  console.log(cookies);
  const data = {
    name: "kartik",
  };
  return { props: { data } };
};

const TestPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>{JSON.stringify(data)}</div>;
};

export default TestPage;
