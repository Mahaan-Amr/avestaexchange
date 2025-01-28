# Avesta Exchange

A bilingual (Farsi and English) currency exchange website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 Fully bilingual support (English and Farsi)
- 🎨 Dark and Light mode
- 📱 Responsive design
- 🔄 Real-time exchange rates
- 💼 Professional services showcase
- 📊 Admin panel for content management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Icons**: Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/avestaexchange.git
cd avestaexchange
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── (en)/           # English routes
│   └── (fa)/           # Farsi routes
├── components/
│   ├── ui/             # UI components
│   ├── layout/         # Layout components
│   └── shared/         # Shared components
├── lib/
│   └── utils/          # Utility functions
└── styles/             # Global styles
```

## Internationalization

The website supports both English and Farsi languages with automatic language detection. The language can be switched using the language toggle in the navigation bar.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to [contact@avestaexchange.com](mailto:contact@avestaexchange.com)
