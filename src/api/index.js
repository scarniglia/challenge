import dayjs from "dayjs";

import client from "./client";

export const getToken = async (email, password) => {
  const data = {
    email,
    password,
  };
  const response = await client.post("/auth/login", data);
  return {
    ...response.data,
    expiresIn: dayjs().add(response.data.expiresIn, "m").toString(),
  };
};

export const getUserData = async () => {
  const response = await client.get("/auth/me");
  return response.data;
};

export const getJobs = async () => {
  const response = await client.get("/jobs");
  return {
    ...response.data,
    byId: response.data.data.reduce(
      (jobs, job) => ({
        ...jobs,
        [job.id]: job,
      }),
      {}
    ),
  };
};
