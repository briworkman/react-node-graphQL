import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from "@chakra-ui/react"
import { Wrapper, WrapperVariations } from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"
import { useRouter } from 'next/router';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await register(values)
                if (response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.user) {
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
                            Register
                        </Button>
                    </Form>
                </Wrapper>
            )}
        </Formik>
    )

}

export default Register;
