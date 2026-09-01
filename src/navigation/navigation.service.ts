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
      { label: 'Doctrine', url: '/', fragment: 'sec-space-doctrine' },
      { label: 'Talent Model', url: '/', fragment: 'sec-student-reality' },
      { label: 'Personal Impact', url: '/', fragment: 'sec-personal-impact' },
      { label: 'Strategic Imperative', url: '/', fragment: 'sec-strategic-impact' },
      { label: 'Next Steps', url: '/', fragment: 'sec-next-steps' },
      { label: 'Your Role', url: '/', fragment: 'sec-role-starts-now' },
      { label: 'Posts & Feed', url: '/posts' },
    ],
    footerPrimary: [
      { label: 'About Us', url: '/about' },
      { label: 'Posts & Feed', url: '/posts' },
      { label: 'Space Projects', url: '/projects' },
      { label: 'News & Updates', url: '/news' },
      { label: 'FAQ', url: '/faq' },
    ],
    footerProgrammes: [
      { label: 'Opportunities & Projects', url: '/projects' },
      { label: 'Partner Institutions', url: '/partners' },
      { label: 'Join Programme', url: '/join' },
    ],
    footerLegal: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Contact Us', url: '/contact' },
      { label: 'Admin Portal', url: '/admin/login' },
    ],
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
