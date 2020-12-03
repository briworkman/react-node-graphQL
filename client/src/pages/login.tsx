import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from "@chakra-ui/react"
import { Wrapper, WrapperVariations } from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useLoginMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await login(values)
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                    router.push("/");
                }
            }}
        >
            {({ isSubmitting }) => (
                <Wrapper variant={WrapperVariations.Small}>
                    <Form>
                        <InputField
                            name="username"
                            placeholder="Username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme="teal"
                            isLoading={isSubmitting}
                        >
                            login
                        </Button>
                    </Form>
                </Wrapper>
            )}
        </Formik>
    )

}

export default Login;
