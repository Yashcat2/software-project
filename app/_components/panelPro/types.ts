export interface NavItemProps {
  text: string;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface PricingTierProps {
  name: string;
  features: string[];
  price: number;
  buttonText: string;
  isHighlighted?: boolean;
  savingsText?: string;
}

export interface FAQItemProps {
  question: string;
}

export interface FooterLinkProps {
  text: string;
}

export interface SocialIconProps {
  src: string;
  alt: string;
}
