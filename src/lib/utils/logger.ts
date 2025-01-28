export function logError(error: unknown, context?: string) {
  console.error('=== Error Details ===')
  console.error('Context:', context)
  console.error('Type:', error instanceof Error ? error.constructor.name : typeof error)
  
  if (error instanceof Error) {
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
  } else {
    console.error('Raw Error:', error)
  }
  console.error('===================')
} 