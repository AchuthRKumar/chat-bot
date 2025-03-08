import React, { useRef, useState } from 'react';
import { Input, IconButton, Box, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip"
import { InputGroup } from "./ui/input-group"
import { IoSend } from "react-icons/io5";
import { BsFillCameraFill } from "react-icons/bs";
import { CiSquareCheck } from "react-icons/ci";

const InputField = ({ query, setQuery, handleInputChange, handleKeyPress, isLoading, onImageUpload, selectedImage }) => {
    const fileInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

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
            <Flex direction="column" gap={2}>
                <Flex gap={2} align="center">
                    <InputGroup 
                        endElement={
                            <Box
                                as="button"
                                onClick={handleSendClick}
                                p={2}
                                borderRadius="md"
                                transition="all 0.2s"
                                _hover={{ bg: 'gray.200' }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                disabled={isLoading || (!query.trim() && !selectedImage)}
                                opacity={isLoading || (!query.trim() && !selectedImage) ? 0.5 : 1}
                                position="absolute"
                                right="6px"
                                top="50%"
                                transform="translateY(-50%)"
                                zIndex="1"
                            >
                                <IoSend size="20px" color="#000000" />
                            </Box>
                        } 
                        flex={1}
                        position="relative"
                    >
                        <Input
                            placeholder="Tell me what you're in the mood for…"
                            size="lg"
                            variant="outline"
                            value={query}
                            onChange={(e) => handleInputChange(e)}
                            onKeyDown={handleKeyPress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            isLoading={isLoading}
                            bg="white"
                            borderColor={isFocused ? "black" : "gray.300"}
                            borderWidth={isFocused ? "2px" : "1px"}
                            _hover={{ borderColor: 'gray.400' }}
                            _focus={{ 
                                borderColor: 'black',
                                boxShadow: 'none'
                            }}
                            transition="all 0.2s"
                            paddingRight="48px"
                            sx={{
                                '&': {
                                    paddingRight: '48px !important'
                                }
                            }}
                        />
                    </InputGroup>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageSelect}
                    />
                    <Tooltip content={selectedImage ? "Image selected" : "Upload an image"}>
                        <Box
                            as="button"
                            onClick={() => fileInputRef.current.click()}
                            p={2}
                            borderRadius="md"
                            transition="all 0.2s"
                            _hover={{ bg: 'gray.200' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color={selectedImage ? "green.500" : "black"}
                        >
                            {selectedImage ? (
                                <CiSquareCheck size="24px" />
                            ) : (
                                <BsFillCameraFill size="20px" />
                            )}
                        </Box>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    );
};

export default InputField;