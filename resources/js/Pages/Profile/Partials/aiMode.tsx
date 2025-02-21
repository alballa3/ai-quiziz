'use client';

import { Bot, Check, Image, MessageSquare } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/Components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { router, usePage } from '@inertiajs/react';

const models = [
    {
        id: 0,
        name: 'deepseek-r1:1.5b',
        description: 'The Fastest Model for generative question.',
        icon: MessageSquare,
        color: 'text-blue-500',
    },
    {
        id: 1,
        name: 'deepseek-r1:7b',
        description:
            'An advanced model for generating human-like text but not that fast.',
        icon: Image,
        color: 'text-green-500',
    },

    {
        id: 2,
        name: 'llama3.2',
        description:
            'A powerful model for generating human-like text and answers.',
        icon: Bot,
        color: 'text-orange-500',
    },
];

export default function AiModel() {
    const test = usePage().props.auth.user;
    const [selectedModel, setSelectedModel] = useState(function () {
        return models.findIndex((model) => model.name === test?.model);
    });
    const handle = () => {
        console.log(models[selectedModel].name);
        router.put('/profile', { model: models[selectedModel].name });
    };
    const selectedModelData = models.find(
        (model) => model.id === selectedModel,
    );

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Model Selection
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    An AI model is a program trained on vast amounts of data to
                    perform specific tasks. Choose the model that best fits your
                    needs.
                </p>
            </div>
            <Select
                value={selectedModel.toString()}
                onValueChange={(e) => setSelectedModel(Number(e))}
            >
                <SelectTrigger className="w-[42vh]">
                    <SelectValue placeholder="Select an AI model">
                        {selectedModelData && (
                            <div className="flex items-center">
                                <selectedModelData.icon
                                    className={`mr-2 h-4 w-4 ${selectedModelData.color}`}
                                />
                                <span>{selectedModelData.name}</span>
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {models.map((model) => (
                        <SelectItem key={model.id} value={model.id.toString()}>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <model.icon
                                        className={`mr-2 h-4 w-4 ${model.color}`}
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {model.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {model.description}
                                        </div>
                                    </div>
                                </div>
                                {selectedModel === model.id && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                className="w-[42vh]"
                disabled={selectedModel === -1} // Since findIndex() returns -1 if no match
                onClick={handle}
            >
                Confirm Selection
            </Button>
        </div>
    );
}
