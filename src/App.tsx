import React, { useState } from 'react';
import {
    ModelConfig
} from 'model-config-ui';
import {
    TextAdapterRegistry,
    OpenAIAdapter,
    GeminiAdapter,
    DeepSeekAdapter,
    AnthropicAdapter,
    SiliconflowAdapter,
    ZhipuAdapter,
    OllamaAdapter
} from 'model-config-core';

// Initialize registry and adapters outside component to avoid recreation
const registry = new TextAdapterRegistry();
const adapters = [
    new OpenAIAdapter(),
    new GeminiAdapter(),
    new DeepSeekAdapter(),
    new AnthropicAdapter(),
    new SiliconflowAdapter(),
    new ZhipuAdapter(),
    new OllamaAdapter()
];

adapters.forEach(adapter => registry.register(adapter));
const providers = adapters.map(a => a.getProvider());

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4">
                <h1 className="text-xl font-bold text-gray-800">Model Config Demo</h1>
            </header>

            <main className="flex-1 overflow-hidden flex justify-center p-4">
                <div className="w-full max-w-5xl bg-white rounded-lg shadow overflow-hidden">
                    <ModelConfig registry={registry} providers={providers} />
                </div>
            </main>
        </div>
    );
}
