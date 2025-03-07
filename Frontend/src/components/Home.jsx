import React, { useState, useRef, useEffect } from 'react'
import { Box, Stack, Text, Image } from "@chakra-ui/react"
import { useColorMode } from './ui/color-mode'
import { SkeletonText } from "./ui/skeleton"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import InputField from './InputField'
import { Button } from '@chakra-ui/react';
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
            const response = await axios.post('http://127.0.0.1:4000/api/v1/search', formData, {
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
        <div>
            <DrawerRoot size="md">
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <Button size="sm">
                        Chat Now
                    </Button>
                </DrawerTrigger>
                <DrawerContent bg="gray.50">
                    <DrawerHeader>
                        <DrawerTitle>Andy's Chat Bot</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody bg="gray.50">
                        <div>
                            <Box mb={4}>
                                <Stack spacing={5} height="auto" >
                                    {messages.map((msg, index) => (
                                        <Box
                                            key={index}
                                            alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                                            p={3}
                                            borderRadius="lg"
                                            shadow="md"
                                            background={msg.type === 'user' ? 'blue.100' : 'white'}
                                            borderWidth="1px"
                                            borderColor="gray.200"
                                            width="auto"
                                            maxWidth="90%"
                                        >
                                            {msg.image && (
                                                <Image
                                                    src={msg.image}
                                                    alt="Uploaded"
                                                    maxH="200px"
                                                    mb={2}
                                                    borderRadius="md"
                                                />
                                            )}
                                            {msg.type === 'bot' ? (
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            ) : (
                                                <Text color="gray.800">{msg.text}</Text>
                                            )}
                                        </Box>
                                    ))}

                                    {loading && (
                                        <Box p={3} borderRadius="md" shadow="md" background="white" width="auto" maxWidth="90%">
                                            <SkeletonText noOfLines={4} spacing="4" />
                                        </Box>
                                    )}
                                    <div ref={messageEndRef} />

                                </Stack>
                            </Box>
                        </div>
                    </DrawerBody>
                    <DrawerFooter >
                        <Stack width="100%">
                            {messages.length === 0 && (
                                <Text fontStyle="italic" textAlign="center">
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
                    <DrawerCloseTrigger color="black" />
                </DrawerContent>
            </DrawerRoot>
        </div>
    );
}

export default Home;