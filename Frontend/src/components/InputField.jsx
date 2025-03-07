import React, { useRef } from 'react';
import { Input, IconButton, Box, Flex } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip"
import { InputGroup } from "./ui/input-group"
import { IoSend } from "react-icons/io5";
import { IoMdImage } from "react-icons/io";
import { BsFillCameraFill } from "react-icons/bs";


const InputField = ({ query, setQuery, handleInputChange, handleKeyPress, isLoading, onImageUpload, selectedImage }) => {
    const fileInputRef = useRef(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file);
        }
    };

    const handleSendClick = () => {
        if (query.trim() !== '' || selectedImage) {
            handleKeyPress({ key: 'Enter' });
        }
    };

    return (
        <Box width="100%">
            <Flex gap={2}>
                <InputGroup 
                    endElement={
                        <Box
                            as="button"
                            onClick={handleSendClick}
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: 'gray.100' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <IoSend size="20px" color="#000000" />
                        </Box>
                    } 
                    flex={1}
                >
                    <Input
                        placeholder="Tell me what you're in the mood for…"
                        size="lg"
                        variant="outline"
                        value={query}
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={handleKeyPress}
                        isLoading={isLoading}
                        bg="white"
                        borderColor="black"
                        _hover={{ borderColor: 'gray.300' }}
                    />
                </InputGroup>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageSelect}
                />
                <Tooltip content="Upload an image">
                    <Box
                        as="button"
                        onClick={() => fileInputRef.current.click()}
                        p={2}
                        borderRadius="md"
                        _hover={{ bg: 'gray.100' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <BsFillCameraFill size="24px" color="#000000" />
                    </Box>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default InputField;
