import React from 'react'
import { Form, Formik } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from "@chakra-ui/react"
import { Wrapper, WrapperVariations } from "../components/Wrapper"
import { InputField } from "../components/InputField"

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => { console.log(values) }}
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
