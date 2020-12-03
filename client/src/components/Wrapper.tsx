import { Box } from "@chakra-ui/react";
import React from 'react';

export enum WrapperVariations {
    Small = 'small',
    Regular = 'regular'
}

interface WrapperProps {
    variant?: WrapperVariations
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = WrapperVariations.Regular }) => {
    return (
        <Box maxW={variant === WrapperVariations.Regular ? "800px" : "400px"} w="100%" mt={8} mx='auto'>
            {children}
        </Box>
    );
}