import React, { useRef, useState } from 'react';
import { Textarea, IconButton, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip"
import { InputGroup } from "./ui/input-group"
import { IoSend } from "react-icons/io5";
import { BsFillCameraFill } from "react-icons/bs";
import { CiSquareCheck } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import '../styles/input-field.css';

const InputField = ({ query, setQuery, handleInputChange, handleKeyPress, isLoading, onImageUpload, selectedImage }) => {
    const fileInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        onImageUpload(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSendClick = () => {
        if (query.trim() !== '' || selectedImage) {
            handleKeyPress({ key: 'Enter' });
            setPreviewUrl(null);
        }
    };

    const handleTextareaKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleKeyPress(e);
            setPreviewUrl(null);
        }
    };

    const adjustTextareaHeight = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        handleInputChange(e);
    };

    return (
        <Box width="100%">
            <Flex direction="column" gap={2}>
                {selectedImage && previewUrl && (
                    <div className="image-preview-container">
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            className="preview-image"
                        />
                        <div className="image-info">
                            <Text className="image-name">{selectedImage.name}</Text>
                            <Text fontSize="xs" color="gray.500">
                                {(selectedImage.size / 1024).toFixed(1)} KB
                            </Text>
                        </div>
                        <Box
                            as="button"
                            className="cancel-button"
                            onClick={handleCancelImage}
                            title="Remove image"
                        >
                            <IoClose size="20px" />
                        </Box>
                    </div>
                )}
                <Flex gap={2} align="center">
                    <Box position="relative" flex={1}>
                        <Textarea
                            ref={textareaRef}
                            className="chat-textarea"
                            placeholder="Hungry for something special?"
                            size="lg"
                            variant="outline"
                            value={query}
                            onChange={adjustTextareaHeight}
                            onKeyDown={handleTextareaKeyPress}
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
                            rows={1}
                        />
                        <Box
                            as="button"
                            className="send-button"
                            onClick={handleSendClick}
                            disabled={isLoading || (!query.trim() && !selectedImage)}
                            opacity={isLoading || (!query.trim() && !selectedImage) ? 0.5 : 1}
                        >
                            <IoSend size="18px" color="#000000" />
                        </Box>
                    </Box>
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
                            className="upload-button"
                            onClick={() => fileInputRef.current.click()}
                            color={selectedImage ? "green.500" : "black"}
                        >
                            {selectedImage ? (
                                <CiSquareCheck size="22px" />
                            ) : (
                                <BsFillCameraFill size="22px" />
                            )}
                        </Box>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    );
};

export default InputField;