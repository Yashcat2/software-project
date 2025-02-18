import * as React from "react";
import { NavItem } from "./NavItem";
import { FeatureCard } from "./FeatureCard";
import { PricingTier } from "./PricingTier";
import { FAQItem } from "./FAQItem";
import { FooterLink } from "./FooterLink";
import { SocialIcon } from "./SocialIcon";

const navItems = ["About", "Features", "Pricing", "Gallery", "Team"];
const features = [
  {
    title: "Intuitive Design Interface",
    description:
      "Easily create and customize electrical panel board designs with our user-friendly drag-and-drop interface.",
  },
  {
    title: "Real-Time Cost Calculation",
    description:
      "Automatically update the total price of components used as you design, ensuring budget accuracy.",
  },
  {
    title: "Quotation Generation",
    description:
      "Instantly generate detailed quotations with a single click, saving time and ensuring precision.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Exclusive Deals",
      "Feature 5",
    ],
    price: 123,
    buttonText: "Choose",
  },
  {
    name: "Base",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Exclusive Deals",
      "Feature 5",
    ],
    price: 123,
    buttonText: "Choose",
  },
  {
    name: "Pro",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Exclusive Deals",
      "Feature 5",
    ],
    price: 123,
    buttonText: "Try 1 month",
    isHighlighted: true,
    savingsText: "Save $40",
  },
];

const faqQuestions = [
  "What is PowerDraft Designer?",
  "Is there a free version of PowerDraft Designer?",
  "How does the real-time cost calculation work?",
  "Can I upgrade my plan at any time?",
  "What kind of support is available?",
];

const footerLinks = ["Home", "Features", "Pricing", "FAQ", "Log in"];
const socialIcons = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6a5520b894bf075760a2c950c12fc56a643bbb4989624bf2b0bab4d3faa1f49?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c",
    alt: "Facebook",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/077425e8bfc9582689cd0830d39a9faa29bdc40df9567b6e584182f284fd4d15?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c",
    alt: "Twitter",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61adb5a453fae0e9831c69c9e02b17d640975c4e595d775f813a7882b3b5a674?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c",
    alt: "Instagram",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2dd3c29f361222e32e07d4ddba85fbe7f6f1e446c97ee7eff24f047ac257edab?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c",
    alt: "LinkedIn",
  },
];

export default function PanelPro() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <header className="flex overflow-hidden flex-col w-full max-md:max-w-full">
        <nav className="flex gap-5 justify-between items-center px-20 pb-3.5 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex gap-2.5 items-center self-stretch my-auto text-2xl font-light text-black">
            Panel<span className="font-medium">Pro</span>
          </div>
          <div className="flex overflow-hidden gap-2.5 items-center py-8 pr-32 pl-24 text-lg text-black max-md:px-5">
            <div className="flex gap-10 items-center self-stretch my-auto min-h-[29px] min-w-[240px] w-[423px]">
              {navItems.map((item, index) => (
                <NavItem key={index} text={item} />
              ))}
            </div>
          </div>
          <div className="flex gap-5 self-stretch my-auto text-base text-center">
            <button className="gap-2.5 self-stretch py-3 px-6 text-white bg-cyan-800 rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Sign Up
            </button>
            <button className="gap-2.5 self-stretch px-7 py-3 border-2 border-solid border-slate-600 rounded-[50px] text-slate-600 max-md:px-5">
              Login
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section mt-10 px-20 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[54%] max-md:w-full">
              <h1 className="text-7xl font-bold text-neutral-700 max-md:text-4xl">
                Design Your Perfect Panel Board Online
              </h1>
              <div className="flex flex-wrap gap-3 mt-10 max-w-full text-lg text-center w-[537px]">
                <button className="flex-auto gap-2.5 px-7 py-4 text-white bg-cyan-800 rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
                  Get started for free
                </button>
                <button className="flex-auto gap-2.5 px-7 py-4 uppercase border-2 border-solid border-slate-600 rounded-[50px] text-slate-600 max-md:px-5">
                  GET PREMIUM
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section flex flex-col items-center px-12 py-20 bg-neutral-100 bg-opacity-90 max-md:px-5">
          <h2 className="text-3xl font-semibold tracking-normal leading-8 text-neutral-700">
            Simplify Your Electrical Panel Design Process
          </h2>
          <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-36 mt-6 max-w-full w-[1414px] max-md:px-5">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} icon="" />
            ))}
          </div>
        </section>

        <section className="pricing-section flex flex-col items-center px-36 py-28 bg-slate-50 max-md:px-5">
          <h2 className="text-4xl font-bold text-center text-neutral-700">
            The Right Plan for You
          </h2>
          <div className="flex gap-6 items-center mt-9 max-w-full w-[283px]">
            <label className="grow text-base font-bold text-right text-black">
              Bill Monthly
            </label>
            <button
              role="switch"
              aria-checked="false"
              className="flex flex-col justify-center items-start p-1 bg-slate-400 rounded-[62px]"
            >
              <div className="flex w-4 h-4 bg-cyan-800 rounded-full" />
            </button>
            <label className="text-base text-black">Bill Annualy</label>
          </div>
          <div className="flex gap-5 mt-9 max-md:flex-col">
            {pricingTiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </div>
        </section>

        <section className="faq-section flex flex-col items-center px-24 py-14 bg-teal-50 max-md:px-5">
          <h2 className="text-4xl tracking-tight leading-none text-neutral-700">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col items-center mt-8 max-w-full w-[540px]">
            {faqQuestions.map((question, index) => (
              <FAQItem key={index} question={question} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-emerald-950 px-16 py-14 max-md:px-5">
        <div className="flex flex-wrap gap-10 justify-between items-start max-w-[1240px] mx-auto">
          <div className="flex flex-col min-w-[240px] w-[302px]">
            <h2 className="text-2xl font-extrabold tracking-wide text-neutral-50">
              PanelPro
            </h2>
            <p className="mt-7 text-base tracking-wide leading-7 text-white text-opacity-60">
              Your go-to tool for designing electrical panel boards, offering
              intuitive tools and real-time cost calculations to streamline your
              workflow.
            </p>
          </div>
          <div className="flex gap-10 min-w-[240px]">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold tracking-wide text-white">
                Product
              </h3>
              {footerLinks.map((link, index) => (
                <FooterLink key={index} text={link} />
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold tracking-wide text-white">
                Contact Us
              </h3>
              <div className="flex gap-10 mt-5">
                {socialIcons.map((icon, index) => (
                  <SocialIcon key={index} {...icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
