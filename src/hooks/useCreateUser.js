import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [submitNewUser, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await submitNewUser({
      variables: { username, password }
    });

    return data;
  };

  return [createUser, result];
};

export default useCreateUser;