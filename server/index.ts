import express from 'express';
import {
    TextAdapterRegistry,
    OpenAIAdapter,
    GeminiAdapter,
    DeepSeekAdapter,
    AnthropicAdapter,
    SiliconflowAdapter,
    ZhipuAdapter,
    OllamaAdapter,
    type TextModelConfig,
    type TextModel
} from 'model-config-core';

const app = express();
const port = 3001;

app.use(express.json());

// Initialize registry and adapters
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

app.get('/api/config', async (req, res) => {
    // For now we don't save config on server for this demo, 
    // relying on client localStorage + verify action
    res.json({ message: "Server ready" });
});

app.post('/api/verify', async (req, res) => {
    const { provider: providerId, model, apiKey, baseUrl } = req.body;

    if (!providerId) {
        return res.status(400).json({ error: 'Missing provider' });
    }

    try {
        console.log(`Verifying connection to ${providerId}...`);

        const provider = registry.getProvider(providerId);
        if (!provider) {
            throw new Error(`Provider ${providerId} not found on server registry`);
        }

        // Create temporary config for verification
        const tempModel: TextModel = {
            id: 'temp-model',
            name: 'temp',
            description: 'temp',
            providerId: providerId,
            capabilities: { supportsTools: false },
        };

        const tempConfig: TextModelConfig = {
            id: 'temp',
            name: 'temp',
            enabled: true,
            providerMeta: provider,
            modelMeta: tempModel,
            connectionConfig: {
                apiKey: apiKey || '',
                ...(baseUrl && { baseURL: baseUrl }),
            },
        };

        // Try to fetch models to verify connection
        const models = await registry.getModels(providerId, tempConfig);

        res.json({
            success: true,
            message: `Successfully connected to ${providerId}. Found ${models.length} models.`
        });

    } catch (error: any) {
        console.error("Verification error:", error);
        res.status(500).json({
            success: false,
            error: error.message || String(error)
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
