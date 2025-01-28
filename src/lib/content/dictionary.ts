type TeamMember = {
  name: string;
  position: string;
}

type AboutUsSection = {
  title: string;
  subtitle: string;
  historyTitle: string;
  historyContent: string;
  missionTitle: string;
  missionContent: string;
  valuesTitle: string;
  values: string[];
  teamTitle: string;
  team: TeamMember[];
}

type Dictionary = {
  en: {
    aboutUs: AboutUsSection;
  };
  fa: {
    aboutUs: AboutUsSection;
  };
}

export const dictionary: Dictionary = {
  en: {
    aboutUs: {
      title: 'About Avesta Exchange',
      subtitle: 'Your Trusted Partner in Currency Exchange Since 2020',
      historyTitle: 'Our History',
      historyContent: 'Founded in 2020, Avesta Exchange has grown to become one of the most reliable currency exchange services in Iran. Our journey began with a simple mission: to provide transparent, efficient, and secure currency exchange services to our clients.',
      missionTitle: 'Our Mission',
      missionContent: 'To provide accessible, transparent, and reliable currency exchange services while maintaining the highest standards of customer service and security.',
      valuesTitle: 'Our Values',
      values: [
        'Transparency in all operations',
        'Customer-first approach',
        'Security and reliability',
        'Professional expertise',
        'Continuous improvement'
      ],
      teamTitle: 'Our Leadership Team',
      team: [
        {
          name: 'Ali Mohammadi',
          position: 'Chief Executive Officer'
        },
        {
          name: 'Sara Ahmadi',
          position: 'Head of Operations'
        },
        {
          name: 'Reza Karimi',
          position: 'Chief Financial Officer'
        }
      ]
    }
  },
  fa: {
    aboutUs: {
      title: 'درباره صرافی آوستا',
      subtitle: 'شریک مطمئن شما در تبادل ارز از سال ۱۳۹۹',
      historyTitle: 'تاریخچه ما',
      historyContent: 'صرافی آوستا از سال ۱۳۹۹ تاسیس شده و به یکی از معتبرترین خدمات تبادل ارز در ایران تبدیل شده است. سفر ما با یک ماموریت ساده آغاز شد: ارائه خدمات تبادل ارز شفاف، کارآمد و امن به مشتریان ما.',
      missionTitle: 'ماموریت ما',
      missionContent: 'ارائه خدمات تبادل ارز در دسترس، شفاف و قابل اعتماد با حفظ بالاترین استانداردهای خدمات مشتری و امنیت.',
      valuesTitle: 'ارزش‌های ما',
      values: [
        'شفافیت در تمام عملیات‌ها',
        'اولویت با مشتری',
        'امنیت و قابلیت اعتماد',
        'تخصص حرفه‌ای',
        'بهبود مستمر'
      ],
      teamTitle: 'تیم رهبری ما',
      team: [
        {
          name: 'علی محمدی',
          position: 'مدیر عامل'
        },
        {
          name: 'سارا احمدی',
          position: 'مدیر عملیات'
        },
        {
          name: 'رضا کریمی',
          position: 'مدیر مالی'
        }
      ]
    }
  }
}