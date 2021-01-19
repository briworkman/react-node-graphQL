import { Box, Button, Flex, Link, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({ }) => {
  const router = useRouter();
  const toast = useToast();
  const [, login] = useLoginMutation();
  return (
    <Layout variant='small'>
      <div className="glass--short">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
            toast({
              position: "bottom-left",
              title: "An error occurred.",
              description: "Login unsuccessful.",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex align={'center'}>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
              >
                login
            </Button>
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot Password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
