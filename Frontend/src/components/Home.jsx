import React, { useState, useRef, useEffect } from 'react'
import { Box, Stack, Text, Image } from "@chakra-ui/react"
import { useColorMode } from './ui/color-mode'
import { SkeletonText } from "./ui/skeleton"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import InputField from './InputField'
import { Button } from '@chakra-ui/react'
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer"


const Home = () => {

    const { colorMode } = useColorMode();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleImageUpload = async (file) => {
        setSelectedImage(file);
    };

    const sendMessage = async (text, image = null) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('query', text);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('https://chat-bot-rec7.onrender.com/api/v1/search', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.data.response, type: 'bot' },
            ]);
        } catch (err) {
            console.error('API Error:', err);
        } finally {
            setLoading(false);
            setSelectedImage(null);
        }
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter' && (query.trim() !== '' || selectedImage)) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: query,
                    type: 'user',
                    image: selectedImage ? URL.createObjectURL(selectedImage) : null
                },
            ]);
            setQuery('');
            await sendMessage(query, selectedImage);
        }
    };


    return (
        <Box 
            width="100vw" 
            height="100vh" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
        >
            <DrawerRoot size="md">
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <Button 
                        size="lg"
                        bg="black"
                        color="white"
                        _hover={{ bg: 'gray.800' }}
                        transition="all 0.2s"
                        px={8}
                        py={6}
                        fontSize="lg"
                        fontWeight="medium"
                    >
                        Chat Now
                    </Button>
                </DrawerTrigger>
                <DrawerContent bg="white">
                    <DrawerHeader borderBottom="1px solid" borderColor="gray.200">
                        <DrawerTitle fontWeight="bold">Andy's Chat Bot</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody bg="white" py={4}>
                        <div>
                            <Box mb={4}>
                                <Stack spacing={4} height="auto">
                                    {messages.map((msg, index) => (
                                        <Box
                                            key={index}
                                            alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                                            p={4}
                                            borderRadius="lg"
                                            shadow="sm"
                                            background={msg.type === 'user' ? '#F5F5F5' : 'white'}
                                            borderWidth="1px"
                                            borderColor="gray.200"
                                            width="auto"
                                            maxWidth="90%"
                                            transition="all 0.2s"
                                            _hover={{
                                                shadow: 'md',
                                                transform: 'translateY(-1px)'
                                            }}
                                        >
                                            {msg.image && (
                                                <Image
                                                    src={msg.image}
                                                    alt="Uploaded"
                                                    maxH="200px"
                                                    mb={3}
                                                    borderRadius="md"
                                                />
                                            )}
                                            <Box mb={2}>
                                                {msg.type === 'bot' ? (
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                ) : (
                                                    <Text color="gray.800">{msg.text}</Text>
                                                )}
                                            </Box>
                                            <Text
                                                fontSize="xs"
                                                color="gray.500"
                                                textAlign={msg.type === 'user' ? 'right' : 'left'}
                                            >
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Text>
                                        </Box>
                                    ))}

                                    {loading && (
                                        <Box
                                            p={4}
                                            borderRadius="lg"
                                            shadow="sm"
                                            background="white"
                                            borderWidth="1px"
                                            borderColor="gray.200"
                                            width="auto"
                                            maxWidth="90%"
                                        >
                                            <Box mb={2}>
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </Box>
                                        </Box>
                                    )}
                                    <div ref={messageEndRef} />
                                </Stack>
                            </Box>
                        </div>
                    </DrawerBody>
                    <DrawerFooter borderTop="1px solid" borderColor="gray.200" bg="gray.50">
                        <Stack width="100%" spacing={3}>
                            {messages.length === 0 && (
                                <Text
                                    fontStyle="italic"
                                    textAlign="center"
                                    color="gray.600"
                                    fontSize="sm"
                                >
                                    Hungry for something new? Ask me for a recipe!
                                </Text>
                            )}
                            <InputField
                                query={query}
                                setQuery={setQuery}
                                handleInputChange={handleInputChange}
                                handleKeyPress={handleKeyPress}
                                isLoading={loading}
                                onImageUpload={handleImageUpload}
                                selectedImage={selectedImage}
                            />
                        </Stack>
                    </DrawerFooter>
                    <DrawerCloseTrigger 
                        position="absolute"
                        right={4}
                        top={4}
                        color="black"
                        _hover={{ color: 'gray.600' }}
                    />
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
}

export default Home;