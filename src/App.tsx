import React, { useState } from 'react';
import {
    ModelConfig,
    ModelSelector
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
    const [activeModel, setActiveModel] = useState<string>('');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4 z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Model Config Demo</h1>
                        <h1 className="text-xl font-bold text-gray-800 sm:hidden">Demo</h1>
                        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
                        <div className="text-sm text-gray-500 hidden md:block whitespace-nowrap">
                            Current Active Model:
                        </div>
                    </div>
                    <div className="w-full max-w-xs sm:max-w-sm md:w-80">
                        <ModelSelector
                            value={activeModel}
                            onChange={setActiveModel}
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden flex justify-center p-4">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow overflow-hidden flex flex-col">
                    <div className="bg-blue-50 p-3 text-sm text-blue-800 border-b border-blue-100">
                        <strong>配置区域：</strong> 请在下方配置并勾选需要的模型。所有勾选的模型都会出现在上方的“当前模型”下拉菜单中供选择。
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ModelConfig registry={registry} providers={providers} />
                    </div>
                </div>
            </main>
        </div>
    );
}
