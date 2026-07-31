import { Injectable } from '@nestjs/common';

export interface NavItem {
  label: string;
  url: string;
  fragment?: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface NavigationMenu {
  headerMenu: NavItem[];
  footerPrimary: NavItem[];
  footerProgrammes: NavItem[];
  footerLegal: NavItem[];
}

@Injectable()
export class NavigationService {
  private navigation: NavigationMenu = {
    headerMenu: [
      { label: 'Home', url: '/' },
      { label: 'Posts & Feed', url: '/posts' },
      { label: 'Vision', url: '/', fragment: 'sec-vision' },
      { label: 'Eligibility', url: '/', fragment: 'sec-eligibility' },
      { label: 'How It Works', url: '/', fragment: 'sec-process' },
      { label: 'Opportunities', url: '/', fragment: 'sec-projects' }
    ],
    footerPrimary: [
      { label: 'About Us', url: '/about' },
      { label: 'Posts & Feed', url: '/posts' },
      { label: 'Vision & Mission', url: '/', fragment: 'sec-vision' },
      { label: 'Eligibility Rules', url: '/', fragment: 'sec-eligibility' },
      { label: 'How to Participate', url: '/', fragment: 'sec-process' },
      { label: 'News & Updates', url: '/news' },
      { label: 'FAQ', url: '/faq' }
    ],
    footerProgrammes: [
      { label: 'Opportunities', url: '/', fragment: 'sec-projects' },
      { label: 'Partner Institutions', url: '/partners' },
      { label: 'Join Programme', url: '/join' }
    ],
    footerLegal: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Contact Us', url: '/contact' },
      { label: 'Admin Portal', url: '/admin/login' }
    ]
  };

  getNavigation(): NavigationMenu {
    return this.navigation;
  }

  updateNavigation(newNav: Partial<NavigationMenu>): NavigationMenu {
    this.navigation = {
      ...this.navigation,
      ...newNav
    };
    return this.navigation;
  }
}
