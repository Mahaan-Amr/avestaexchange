export const locales = ['en', 'fa'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getDirection(locale: Locale) {
  return locale === 'fa' ? 'rtl' : 'ltr'
}

export const dictionary = {
  en: {
    navigation: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      faqs: 'FAQs',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    home: {
      title: 'Welcome to Avesta Exchange',
      subtitle: 'Your Trusted Currency Exchange Partner',
    },
    exchangeRates: {
      title: 'Exchange Rates',
      description: 'Live exchange rates for major currencies',
      currencyPair: 'Currency Pair',
      buy: 'Buy',
      sell: 'Sell',
      change: 'Change',
      calculator: 'Currency Calculator',
      calculatorDescription: 'Calculate exchange rates between different currencies',
      amount: 'Amount',
      from: 'From',
      to: 'To',
      result: 'Converted Amount',
      historicalRates: 'Historical Rates',
      historicalRatesDescription: 'View exchange rate trends over time',
      period: 'Time Period',
      updating: 'Updating...',
      retrying: 'Failed to fetch rates. Retrying...',
      failedToFetch: 'Failed to fetch exchange rates. Please try again later.',
      week: 'Week',
      month: 'Month',
      months: 'Months',
      year: 'Year',
      retry: 'Try Again'
    },
    hero: {
      title: 'Your Trusted Currency Exchange Partner',
      subtitle: 'Fast, secure, and reliable currency exchange services for all your international needs',
      getQuote: 'Get a Quote',
      contactUs: 'Contact Us',
    },
    services: {
      title: 'Our Services',
      universityTuition: 'University Tuition and Refunds',
      personalRemittances: 'Personal Remittances',
      corporateRemittances: 'Corporate Remittances',
      cryptocurrencies: 'Cryptocurrencies',
      immigration: 'Payment for Immigration Matters',
      consulting: 'Financial and Investment Consulting',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Hear from our satisfied customers about their experience with Avesta Exchange',
      prev: 'Previous',
      next: 'Next',
      slide: 'Go to slide',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have a question or need assistance? Get in touch with our team.',
      info: {
        title: 'Contact Information',
        address: '123 Exchange Street, Financial District, New York, NY 10004',
      },
      social: {
        title: 'Follow Us',
      },
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone (optional)',
        subject: 'Subject',
        message: 'Message',
        department: 'Department',
        departments: {
          general: 'General Inquiry',
          business: 'Business Development',
          support: 'Customer Support',
          technical: 'Technical Support',
        },
        preferredContact: 'Preferred Contact Method',
        contactMethods: {
          email: 'Email',
          phone: 'Phone',
          any: 'Any',
        },
        attachment: 'Attach File',
        attachmentHelp: 'Max file size: 10MB. Supported formats: PDF, DOC, DOCX, JPG, PNG',
        submit: 'Send Message',
        submitting: 'Sending...',
        successMessage: 'Thank you for your message. We will get back to you soon.',
        errorMessage: 'Sorry, something went wrong. Please try again later.',
      },
      errors: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        messageRequired: 'Message is required',
      },
    },
    faqs: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      searchPlaceholder: 'Search questions...',
      allCategories: 'All Categories',
      noResults: 'No matching questions found',
      categories: {
        general: 'General',
        services: 'Services',
        payments: 'Payments',
        security: 'Security',
      },
      quickQuestion: {
        title: 'Still Have Questions?',
        subtitle: 'Ask us anything about our services',
        name: 'Your Name',
        email: 'Your Email',
        question: 'Your Question',
        placeholder: 'Type your question here...',
        submit: 'Send Question',
        submitting: 'Sending...',
        successMessage: 'Thank you for your question. We will get back to you soon.',
        errorMessage: 'Sorry, something went wrong. Please try again later.',
      },
      items: [
        {
          id: 'faq-1',
          category: 'general',
          question: 'What is Avesta Exchange?',
          answer: 'Avesta Exchange is a trusted currency exchange service provider specializing in international money transfers, university tuition payments, and corporate remittances.',
        },
        {
          id: 'faq-2',
          category: 'services',
          question: 'How can I transfer money for university tuition?',
          answer: 'We offer dedicated services for university tuition payments. Contact us with your university details and payment amount, and our team will guide you through the process.',
        },
        {
          id: 'faq-3',
          category: 'payments',
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, cash deposits, and various digital payment methods. The available options may vary depending on your location and the service you need.',
        },
        {
          id: 'faq-4',
          category: 'security',
          question: 'How do you ensure transaction security?',
          answer: 'We employ industry-standard security measures, including encrypted communications, secure payment processing, and strict verification procedures to protect your transactions.',
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'What are your operating hours?',
          answer: 'Our online services are available 24/7. Our office hours for in-person services are Monday to Friday, 9 AM to 5 PM local time.',
        },
        {
          id: 'faq-6',
          category: 'services',
          question: 'Do you offer business exchange services?',
          answer: 'Yes, we provide specialized corporate exchange services including bulk transfers, regular payments, and competitive rates for businesses.',
        },
        {
          id: 'faq-7',
          category: 'payments',
          question: 'What are your exchange rates based on?',
          answer: 'Our exchange rates are based on real-time market rates with a small margin to cover operational costs. We ensure competitive rates and transparency in our pricing.',
        },
        {
          id: 'faq-8',
          category: 'security',
          question: 'Do you require ID verification?',
          answer: 'Yes, we require valid ID verification for all transactions to comply with international regulations and ensure secure transactions.',
        },
        {
          id: 'faq-9',
          category: 'services',
          question: 'Can you help with emergency transfers?',
          answer: 'Yes, we offer expedited transfer services for urgent situations. Contact us immediately, and we will prioritize your emergency transfer needs.',
        },
        {
          id: 'faq-10',
          category: 'general',
          question: 'Do you have a minimum transfer amount?',
          answer: 'Minimum transfer amounts vary by service and destination. Contact us with your specific needs, and we will provide the applicable limits.',
        },
        {
          id: 'faq-11',
          category: 'payments',
          question: 'How long do transfers typically take?',
          answer: 'Transfer times vary by destination and method. Most transfers are completed within 1-3 business days, with some instant transfer options available.',
        },
        {
          id: 'faq-12',
          category: 'security',
          question: 'What should I do if I suspect fraud?',
          answer: 'If you suspect fraud, contact us immediately through our 24/7 security hotline. We have dedicated teams to investigate and resolve security concerns.',
        },
      ],
    },
    about: {
      title: 'About Avesta Exchange',
      subtitle: 'Your Trusted Financial Partner Since 2010',
      description: 'We are committed to providing secure, efficient, and reliable currency exchange services to individuals and businesses worldwide.',
      history: {
        title: 'Our Journey',
        content: 'Founded in 2010, Avesta Exchange has grown from a small local exchange office to a leading international financial services provider. With over a decade of experience, we have served thousands of clients worldwide, facilitating seamless currency exchanges and international transfers.',
      },
      features: {
        experience: {
          title: 'Years of Experience',
          description: 'Over a decade of expertise in international currency exchange and financial services.'
        },
        team: {
          title: 'Expert Team',
          description: 'Our dedicated team of financial experts ensures smooth and reliable transactions.'
        },
        rates: {
          title: 'Competitive Rates',
          description: 'We offer some of the most competitive exchange rates in the market.'
        },
        security: {
          title: 'Secure Transactions',
          description: 'State-of-the-art security measures to protect your transactions and data.'
        }
      },
      mission: {
        title: 'Our Mission',
        description: 'To provide accessible, reliable, and efficient currency exchange services while maintaining the highest standards of security and customer satisfaction.'
      },
      team: {
        title: 'Our Team',
        subtitle: 'Meet the experts behind Avesta Exchange',
        members: [
          {
            id: 'team-1',
            name: 'John Smith',
            role: 'CEO & Founder',
            bio: 'With 20+ years in financial services, John leads our strategic vision and growth.',
            image: '/team/john-smith.jpg',
          },
          {
            id: 'team-2',
            name: 'Sarah Johnson',
            role: 'Head of Operations',
            bio: 'Sarah ensures smooth daily operations and maintains our high service standards.',
            image: '/team/sarah-johnson.jpg',
          },
          {
            id: 'team-3',
            name: 'Michael Chen',
            role: 'Compliance Officer',
            bio: 'Michael oversees regulatory compliance and risk management.',
            image: '/team/michael-chen.jpg',
          },
        ],
      },
      certifications: {
        title: 'Licenses & Certifications',
        subtitle: 'Operating with full compliance and transparency',
        items: [
          {
            id: 'cert-1',
            title: 'Financial Services License',
            issuer: 'Financial Conduct Authority',
            year: '2010',
          },
          {
            id: 'cert-2',
            title: 'Anti-Money Laundering Certification',
            issuer: 'International Compliance Association',
            year: '2022',
          },
          {
            id: 'cert-3',
            title: 'ISO 27001 Security Certification',
            issuer: 'International Organization for Standardization',
            year: '2023',
          },
        ],
      },
      locations: {
        title: 'Our Offices',
        subtitle: 'Serving you globally with local expertise',
        headquarters: {
          title: 'Headquarters',
          address: '123 Exchange Street, Financial District, New York, NY 10004',
          city: 'New York',
          country: 'United States',
          phone: '+1 (555) 123-4567',
          email: 'info@avestaexchange.com',
        },
        branches: [
          {
            id: 'branch-1',
            city: 'London',
            country: 'United Kingdom',
            address: '45 Finance Road, City of London',
          },
          {
            id: 'branch-2',
            city: 'Dubai',
            country: 'UAE',
            address: 'Business Bay, Sheikh Zayed Road',
          },
          {
            id: 'branch-3',
            city: 'Toronto',
            country: 'Canada',
            address: '789 Bay Street, Financial District',
          },
        ],
      },
      values: {
        title: 'Our Mission & Values',
        mission: 'To provide secure, efficient, and accessible financial services that empower individuals and businesses in their international transactions.',
        items: [
          {
            id: 'value-1',
            title: 'Trust',
            description: 'Building lasting relationships through transparency and reliability.',
          },
          {
            id: 'value-2',
            title: 'Excellence',
            description: 'Delivering exceptional service quality in every transaction.',
          },
          {
            id: 'value-3',
            title: 'Innovation',
            description: 'Embracing technology to enhance customer experience.',
          },
          {
            id: 'value-4',
            title: 'Security',
            description: 'Ensuring the safety of every transaction through robust systems.',
          },
        ],
      },
    },
    whyChooseUs: {
      title: 'Why Choose Avesta Exchange',
      subtitle: 'We provide secure, fast, and reliable currency exchange services with competitive rates',
      security: {
        title: 'Secure Transactions',
        description: 'State-of-the-art security measures to protect your transactions and personal information',
      },
      speed: {
        title: 'Fast Processing',
        description: 'Quick and efficient processing of your currency exchange needs',
      },
      global: {
        title: 'Global Coverage',
        description: 'Access to a wide network of international financial services',
      },
      rates: {
        title: 'Competitive Rates',
        description: 'Best exchange rates with transparent pricing and no hidden fees',
      },
    },
    statistics: {
      customers: 'Active Customers',
      volume: 'Monthly Volume',
      countries: 'Countries Served',
      satisfaction: 'Customer Satisfaction',
    },
    partners: {
      title: 'Trusted by Leading Companies',
      subtitle: 'We work with the best in the industry',
    },
    admin: {
      exchangeRates: {
        title: 'Manage Exchange Rates',
        baseCurrency: 'Base Currency',
        quoteCurrency: 'Quote Currency',
        baseRate: 'Base Rate',
        buyMarkup: 'Buy Markup (%)',
        sellMarkup: 'Sell Markup (%)',
        buyRate: 'Buy Rate',
        sellRate: 'Sell Rate',
        markups: 'Markups',
        actions: 'Actions',
        add: 'Add Rate',
        update: 'Update Rate',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        currencyPair: 'Currency Pair'
      }
    },
    certification: {
      title: 'Our Certifications',
      fintrac: {
        title: 'FINTRAC Registered',
        description: 'We are officially registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC)',
        code: 'FINTRAC Registration Number: M23667814',
        verifyText: 'Verify Registration'
      }
    }
  },
  fa: {
    navigation: {
      home: 'خانه',
      services: 'خدمات',
      about: 'درباره ما',
      faqs: 'سوالات متداول',
      testimonials: 'نظرات مشتریان',
      contact: 'تماس با ما',
    },
    home: {
      title: 'به صرافی آوستا خوش آمدید',
      subtitle: 'شریک مطمئن شما در تبادل ارز',
    },
    exchangeRates: {
      title: 'نرخ‌های ارز',
      description: 'نرخ‌های زنده ارزهای اصلی',
      currencyPair: 'جفت ارز',
      buy: 'خرید',
      sell: 'فروش',
      change: 'تغییر',
      calculator: 'ماشین حساب ارز',
      calculatorDescription: 'محاسبه نرخ تبدیل بین ارزهای مختلف',
      amount: 'مقدار',
      from: 'از',
      to: 'به',
      result: 'مبلغ تبدیل شده',
      historicalRates: 'نرخ‌های تاریخی',
      historicalRatesDescription: 'مشاهده روند نرخ ارز در طول زمان',
      period: 'بازه زمانی',
      updating: 'در حال به‌روزرسانی...',
      retrying: 'تلاش مجدد...',
      failedToFetch: 'دریافت نرخ‌های ارز با خطا مواجه شد. لطفاً دوباره تلاش کنید.',
      week: 'هفته',
      month: 'ماه',
      months: 'ماه',
      year: 'سال',
      retry: 'تلاش مجدد'
    },
    hero: {
      title: 'شریک مطمئن شما در تبادل ارز',
      subtitle: 'خدمات سریع، امن و قابل اعتماد تبادل ارز برای تمام نیازهای بین‌المللی شما',
      getQuote: 'دریافت قیمت',
      contactUs: 'تماس با ما',
    },
    services: {
      title: 'خدمات ما',
      universityTuition: 'شهریه دانشگاه و بازپرداخت',
      personalRemittances: 'حواله‌های شخصی',
      corporateRemittances: 'حواله‌های شرکتی',
      cryptocurrencies: 'ارزهای دیجیتال',
      immigration: 'پرداخت‌های مهاجرتی',
      consulting: 'مشاوره مالی و سرمایه‌گذاری',
    },
    testimonials: {
      title: 'نظرات مشتریان ما',
      subtitle: 'از تجربه مشتریان راضی ما با صرافی آوستا بشنوید',
      prev: 'قبلی',
      next: 'بعدی',
      slide: 'رفتن به اسلاید',
    },
    contact: {
      title: 'تماس با ما',
      subtitle: 'سوال یا نیاز به راهنمایی دارید؟ با تیم ما در تماس باشید.',
      info: {
        title: 'اطلاعات تماس',
        address: '۱۲۳ خیابان صرافی، منطقه مالی، نیویورک، نیویورک ۱۰۰۰۴',
      },
      social: {
        title: 'ما را دنبال کنید',
      },
      form: {
        name: 'نام',
        email: 'ایمیل',
        phone: 'تلفن (اختیاری)',
        subject: 'موضوع',
        message: 'پیام',
        department: 'بخش',
        departments: {
          general: 'پرسش عمومی',
          business: 'توسعه کسب و کار',
          support: 'پشتیبانی مشتری',
          technical: 'پشتیبانی فنی',
        },
        preferredContact: 'روش ترجیحی تماس',
        contactMethods: {
          email: 'ایمیل',
          phone: 'تلفن',
          any: 'هر دو',
        },
        attachment: 'پیوست فایل',
        attachmentHelp: 'حداکثر حجم فایل: ۱۰ مگابایت. فرمت‌های پشتیبانی شده: PDF، DOC، DOCX، JPG، PNG',
        submit: 'ارسال پیام',
        submitting: 'در حال ارسال...',
        successMessage: 'با تشکر از پیام شما. به زودی با شما تماس خواهیم گرفت.',
        errorMessage: 'متأسفیم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
      },
      errors: {
        nameRequired: 'نام الزامی است',
        emailRequired: 'ایمیل الزامی است',
        emailInvalid: 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
        messageRequired: 'پیام الزامی است',
      },
    },
    faqs: {
      title: 'سوالات متداول',
      subtitle: 'پاسخ سوالات رایج درباره خدمات ما را پیدا کنید',
      searchPlaceholder: 'جستجوی سوالات...',
      allCategories: 'همه دسته‌ها',
      noResults: 'سوال مرتبطی یافت نشد',
      categories: {
        general: 'عمومی',
        services: 'خدمات',
        payments: 'پرداخت‌ها',
        security: 'امنیت',
      },
      quickQuestion: {
        title: 'هنوز سوالی دارید؟',
        subtitle: 'هر سوالی درباره خدمات ما دارید بپرسید',
        name: 'نام شما',
        email: 'ایمیل شما',
        question: 'سوال شما',
        placeholder: 'سوال خود را اینجا بنویسید...',
        submit: 'ارسال سوال',
        submitting: 'در حال ارسال...',
        successMessage: 'با تشکر از سوال شما. به زودی پاسخ خواهیم داد.',
        errorMessage: 'متأسفیم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
      },
      items: [
        {
          id: 'faq-1',
          category: 'general',
          question: 'صرافی آوستا چیست؟',
          answer: 'صرافی آوستا یک ارائه‌دهنده خدمات مطمئن تبادل ارز است که در زمینه انتقال پول بین‌المللی، پرداخت شهریه دانشگاه و حواله‌های شرکتی تخصص دارد.',
        },
        {
          id: 'faq-2',
          category: 'services',
          question: 'چگونه می‌توانم شهریه دانشگاه را پرداخت کنم؟',
          answer: 'ما خدمات ویژه‌ای برای پرداخت شهریه دانشگاه ارائه می‌دهیم. با جزئیات دانشگاه و مبلغ پرداختی با ما تماس بگیرید و تیم ما شما را در این فرآیند راهنمایی خواهد کرد.',
        },
        {
          id: 'faq-3',
          category: 'payments',
          question: 'چه روش‌های پرداختی را می‌پذیرید؟',
          answer: 'ما انتقال بانکی، واریز نقدی و روش‌های مختلف پرداخت دیجیتال را می‌پذیریم. گزینه‌های موجود ممکن است بسته به موقعیت شما و خدمات مورد نیاز متفاوت باشد.',
        },
        {
          id: 'faq-4',
          category: 'security',
          question: 'چگونه امنیت تراکنش‌ها را تضمین می‌کنید؟',
          answer: 'ما از اقدامات امنیتی استاندارد صنعت، شامل ارتباطات رمزگذاری شده، پردازش امن پرداخت و روش‌های دقیق تأیید هویت برای محافظت از تراکنش‌های شما استفاده می‌کنیم.',
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'ساعات کاری شما چگونه است؟',
          answer: 'خدمات آنلاین ما ۲۴ ساعته و ۷ روز هفته در دسترس است. ساعات کاری دفتر ما برای خدمات حضوری از دوشنبه تا جمعه، ۹ صبح تا ۵ عصر به وقت محلی است.',
        },
        {
          id: 'faq-6',
          category: 'services',
          question: 'آیا خدمات صرافی تجاری ارائه می‌دهید؟',
          answer: 'بله، ما خدمات تخصصی صرافی شرکتی شامل انتقال عمده، پرداخت‌های منظم و نرخ‌های رقابتی برای کسب و کارها ارائه می‌دهیم.',
        },
        {
          id: 'faq-7',
          category: 'payments',
          question: 'نرخ‌های ارز شما بر چه اساسی تعیین می‌شود؟',
          answer: 'نرخ‌های ارز ما بر اساس نرخ‌های لحظه‌ای بازار با حاشیه سود کمی برای پوشش هزینه‌های عملیاتی تعیین می‌شود. ما نرخ‌های رقابتی و شفافیت در قیمت‌گذاری را تضمین می‌کنیم.',
        },
        {
          id: 'faq-8',
          category: 'security',
          question: 'آیا به تأیید هویت نیاز دارید؟',
          answer: 'بله، ما برای تمام تراکنش‌ها به تأیید هویت معتبر نیاز داریم تا با مقررات بین‌المللی مطابقت داشته باشیم و امنیت تراکنش‌ها را تضمین کنیم.',
        },
        {
          id: 'faq-9',
          category: 'services',
          question: 'آیا می‌توانید در انتقال‌های اضطراری کمک کنید؟',
          answer: 'بله، ما خدمات انتقال سریع برای موقعیت‌های اضطراری ارائه می‌دهیم. فوراً با ما تماس بگیرید و ما به نیازهای انتقال اضطراری شما اولویت می‌دهیم.',
        },
        {
          id: 'faq-10',
          category: 'general',
          question: 'آیا حداقل مبلغ برای انتقال دارید؟',
          answer: 'حداقل مبلغ انتقال بسته به نوع خدمات و مقصد متفاوت است. با نیازهای خاص خود با ما تماس بگیرید تا محدودیت‌های مربوطه را اعلام کنیم.',
        },
        {
          id: 'faq-11',
          category: 'payments',
          question: 'انتقال‌ها معمولاً چقدر طول می‌کشد؟',
          answer: 'زمان انتقال بسته به مقصد و روش متفاوت است. بیشتر انتقال‌ها در عرض ۱ تا ۳ روز کاری انجام می‌شود، با برخی گزینه‌های انتقال فوری نیز در دسترس است.',
        },
        {
          id: 'faq-12',
          category: 'security',
          question: 'اگر به کلاهبرداری مشکوک شوم چه کار کنم؟',
          answer: 'اگر به کلاهبرداری مشکوک هستید، فوراً از طریق خط تلفن امنیتی ۲۴/۷ ما تماس بگیرید. ما تیم‌های تخصصی برای بررسی و حل مشکلات امنیتی داریم.',
        },
      ],
    },
    about: {
      title: 'درباره صرافی آوستا',
      subtitle: 'شریک مالی مورد اعتماد شما از سال ۲۰۱۰',
      description: 'صرافی آوستا یک ارائه‌دهنده خدمات مطمئن تبادل ارز است که در زمینه انتقال پول بین‌المللی، پرداخت شهریه دانشگاه و حواله‌های شرکتی تخصص دارد.',
      history: {
        title: 'مسیر ما',
        content: 'صرافی آوستا از سال ۲۰۱۰ از یک دفتر صرافی کوچک محلی به یک ارائه‌دهنده خدمات مالی بین‌المللی پیشرو تبدیل شده است. با بیش از یک دهه تجربه، ما به هزاران مشتری در سراسر جهان خدمات ارائه کرده‌ایم و تبادلات ارزی و انتقالات بین‌المللی را تسهیل کرده‌ایم.',
      },
      features: {
        experience: {
          title: 'سال‌های تجربه',
          description: 'بیش از یک دهه تجربه در تبادل ارز و خدمات مالی'
        },
        team: {
          title: 'تیم تخصصی',
          description: 'تیم تخصصی ما به عملیات روزانه و استانداردهای بالای خدمات ما کمک می‌کند.'
        },
        rates: {
          title: 'نرخ‌های رقابتی',
          description: 'ما بهترین نرخ‌های تبادل را با قیمت‌گذاری شفاف و بدون هزینه‌های پنهان ارائه می‌دهیم.'
        },
        security: {
          title: 'امنیت تراکنش‌ها',
          description: 'تدابیر امنیتی جدید برای محافظت از تراکنش‌ها و اطلاعات شما'
        }
      },
      mission: {
        title: 'مأموریت ما',
        description: 'به ارائه خدمات مالی امن، کارآمد و در دسترس که افراد و کسب‌وکارها را در تراکنش‌های بین‌المللی توانمند می‌سازد.'
      },
      team: {
        title: 'تیم ما',
        subtitle: 'با متخصصان پشت صرافی آوستا آشنا شوید',
        members: [
          {
            id: 'team-1',
            name: 'جان اسمیت',
            role: 'مدیرعامل و بنیانگذار',
            bio: 'جان با بیش از ۲۰ سال تجربه در خدمات مالی، چشم‌انداز استراتژیک و رشد ما را هدایت می‌کند.',
            image: '/team/john-smith.jpg',
          },
          {
            id: 'team-2',
            name: 'سارا جانسون',
            role: 'مدیر عملیات',
            bio: 'سارا عملیات روزانه را تضمین می‌کند و استانداردهای بالای خدمات ما را حفظ می‌کند.',
            image: '/team/sarah-johnson.jpg',
          },
          {
            id: 'team-3',
            name: 'مایکل چن',
            role: 'مسئول انطباق',
            bio: 'مایکل بر انطباق با مقررات و مدیریت ریسک نظارت دارد.',
            image: '/team/michael-chen.jpg',
          },
        ],
      },
      certifications: {
        title: 'مجوزها و گواهینامه‌ها',
        subtitle: 'فعالیت با انطباق و شفافیت کامل',
        items: [
          {
            id: 'cert-1',
            title: 'مجوز خدمات مالی',
            issuer: 'سازمان نظارت بر رفتار مالی',
            year: '۲۰۱۰',
          },
          {
            id: 'cert-2',
            title: 'گواهینامه مبارزه با پولشویی',
            issuer: 'انجمن بین‌المللی انطباق',
            year: '۲۰۲۲',
          },
          {
            id: 'cert-3',
            title: 'گواهینامه امنیتی ISO 27001',
            issuer: 'سازمان بین‌المللی استاندارد',
            year: '۲۰۲۳',
          },
        ],
      },
      locations: {
        title: 'دفاتر ما',
        subtitle: 'خدمات جهانی با تخصص محلی',
        headquarters: {
          title: 'دفتر مرکزی',
          address: '۱۲۳ خیابان صرافی، منطقه مالی',
          city: 'نیویورک',
          country: 'ایالات متحده',
          phone: '۴۵۶۷-۱۲۳ (۵۵۵) ۱+',
          email: 'info@avestaexchange.com',
        },
        branches: [
          {
            id: 'branch-1',
            city: 'لندن',
            country: 'انگلستان',
            address: '۴۵ جاده فایننس، سیتی لندن',
          },
          {
            id: 'branch-2',
            city: 'دبی',
            country: 'امارات متحده عربی',
            address: 'بیزینس بی، خیابان شیخ زاید',
          },
          {
            id: 'branch-3',
            city: 'تورنتو',
            country: 'کانادا',
            address: '۷۸۹ خیابان بی، منطقه مالی',
          },
        ],
      },
      values: {
        title: 'مأموریت و ارزش‌های ما',
        mission: 'ارائه خدمات مالی امن، کارآمد و در دسترس که افراد و کسب‌وکارها را در تراکنش‌های بین‌المللی توانمند می‌سازد.',
        items: [
          {
            id: 'value-1',
            title: 'اعتماد',
            description: 'ایجاد روابط پایدار از طریق شفافیت و قابلیت اطمینان.',
          },
          {
            id: 'value-2',
            title: 'تعالی',
            description: 'ارائه کیفیت خدمات استثنایی در هر تراکنش.',
          },
          {
            id: 'value-3',
            title: 'نوآوری',
            description: 'پذیرش فناوری برای بهبود تجربه مشتری.',
          },
          {
            id: 'value-4',
            title: 'امنیت',
            description: 'تضمین امنیت هر تراکنش از طریق سیستم‌های قوی.',
          },
        ],
      },
    },
    whyChooseUs: {
      title: 'چرا صرافی آوستا را انتخاب کنید',
      subtitle: 'ارائه خدمات امن، سریع و قابل اعتماد تبادل ارز با نرخ‌های رقابتی',
      security: {
        title: 'تراکنش‌های امن',
        description: 'استفاده از جدیدترین تدابیر امنیتی برای محافظت از تراکنش‌ها و اطلاعات شخصی شما',
      },
      speed: {
        title: 'پردازش سریع',
        description: 'رسیدگی سریع و کارآمد به نیازهای تبادل ارز شما',
      },
      global: {
        title: 'پوشش جهانی',
        description: 'دسترسی به شبکه گسترده‌ای از خدمات مالی بین‌المللی',
      },
      rates: {
        title: 'نرخ‌های رقابتی',
        description: 'بهترین نرخ‌های تبادل با قیمت‌گذاری شفاف و بدون هزینه‌های پنهان',
      },
    },
    statistics: {
      customers: 'مشتریان فعال',
      volume: 'حجم ماهانه',
      countries: 'کشورهای تحت پوشش',
      satisfaction: 'رضایت مشتریان',
    },
    partners: {
      title: 'مورد اعتماد شرکت‌های پیشرو',
      subtitle: 'ما با بهترین‌ها در صنعت همکاری می‌کنیم',
    },
    admin: {
      exchangeRates: {
        title: 'مدیریت نرخ‌های ارز',
        baseCurrency: 'ارز پایه',
        quoteCurrency: 'ارز مقصد',
        baseRate: 'نرخ پایه',
        buyMarkup: 'مارک‌آپ خرید (%)',
        sellMarkup: 'مارک‌آپ فروش (%)',
        buyRate: 'نرخ خرید',
        sellRate: 'نرخ فروش',
        markups: 'مارک‌آپ‌ها',
        actions: 'عملیات',
        add: 'افزودن نرخ',
        update: 'به‌روزرسانی نرخ',
        cancel: 'انصراف',
        delete: 'حذف',
        edit: 'ویرایش',
        currencyPair: 'جفت ارز'
      }
    },
    certification: {
      title: 'گواهینامه‌های ما',
      fintrac: {
        title: 'ثبت شده در FINTRAC',
        description: 'ما به طور رسمی در مرکز تحلیل گزارش‌های مالی و معاملات کانادا (FINTRAC) ثبت شده‌ایم',
        code: 'M23667814 :FINTRAC شماره ثبت',
        verifyText: 'تایید ثبت نام'
      }
    }
  },
} as const 