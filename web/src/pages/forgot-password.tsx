import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from 'react';
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({ }) => {
    const [isComplete, setIsComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation();

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setIsComplete(true);
                }}
            >
                {({ isSubmitting }) => isComplete ? <Box>if an account with that email exists, we sent you an email</Box> : (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                        />
                        <Flex align={'center'}>
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                variantColor="teal"
                            >
                                forgot password
            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)