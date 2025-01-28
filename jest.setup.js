// Mock environment variables
process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY = 'test-api-key'

// Mock fetch globally
global.fetch = jest.fn() 