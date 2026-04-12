export type OnboardingImpactMetric = {
  title: string;
  value: string;
  description: string;
};

export type OnboardingFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type OnboardingCompareBlock = {
  id: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  stats: Array<{
    value: string;
    description: string;
  }>;
};

export type OnboardingResource = {
  title: string;
  description: string;
  href: string;
  cta: string;
  image?: string;
};

export type RelatedCaseStudy = {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type OnboardingCaseStudyContent = {
  slug: string;
  metadataTitle: string;
  metadataDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  myRole: string;
  team: string[];
  timeline: string;
  heroVideo: string;
  heroPoster: string;
  impactOverview: OnboardingImpactMetric[];
  toc: Array<{ id: string; label: string }>;
  problemFraming: {
    heading: string;
    intro: string[];
    activationFigure: OnboardingFigure;
    steps: Array<{
      title: string;
      body: string[];
      figures: OnboardingFigure[];
      bullets?: string[];
    }>;
  };
  frictionSummary: {
    heading: string;
    prompt: string;
    figure: OnboardingFigure;
    notes: string[];
  };
  problemDetails: {
    heading: string;
    sections: Array<{
      title: string;
      body: string;
      figure?: OnboardingFigure;
      note?: string;
    }>;
    additionalProblems: {
      heading: string;
      figure: OnboardingFigure;
      caption: string;
      gifEmbed: string;
    };
  };
  solution: {
    heading: string;
    intro: string;
    sprint: {
      title: string;
      body: string;
      figure: OnboardingFigure;
      ideasHeading: string;
      bullets: string[];
      ideaFigures: OnboardingFigure[];
      caption: string;
    };
    testing: {
      title: string;
      body: string;
      learned: string[];
      figure: OnboardingFigure;
      caption: string;
    };
    iterations: {
      title: string;
      body: string;
      figure: OnboardingFigure;
      caption: string;
    };
  };
  finalDesigns: {
    heading: string;
    intro: string;
    blocks: OnboardingCompareBlock[];
  };
  feedbackImpact: {
    heading: string;
    intro: string;
    bullets: string[];
    quote: string;
  };
  furtherReading: OnboardingResource;
  templates: OnboardingResource;
  moreCaseStudies: {
    heading: string;
    cards: RelatedCaseStudy[];
  };
};

export const onboardingCaseStudy: OnboardingCaseStudyContent = {
  slug: "casestudy/onboarding",
  metadataTitle: "Redesigning Lokalise User Onboarding | Case Study",
  metadataDescription:
    "Redesigned Lokalise's onboarding end to end, from homepage to in-product checklist, lifting sign-up, activation, and trial-to-customer conversion.",
  heroTitle: "Redesigning Lokalise",
  heroSubtitle: "user onboarding",
  overview:
    "Redesigned Lokalise's onboarding end to end, from homepage to in-product checklist, lifting sign-up, activation, and trial-to-customer conversion.",
  myRole: "Design strategy, UI, UX, User Research.",
  team: ["Me", "PM", "EM", "Data", "UR", "FE", "FE", "BE"],
  timeline: "2024 Q1-Q2",
  heroVideo: "/case-study/onboarding/hero/lokalise-onboarding.mp4",
  heroPoster: "/case-study/onboarding/hero/onboarding-comparison.png",
  impactOverview: [
    {
      title: "Sign up rate",
      value: "+37%",
      description:
        "Through redesign of homepage and design updates of sign up page, we increased sign-up conversion by 37%."
    },
    {
      title: "Activation rate",
      value: "3% to 12.7%",
      description: "Through a simplified onboarding, we increased activation rate from 3% to 12.7%."
    },
    {
      title: "Trial-to-customer conversion",
      value: "+200%",
      description: "Through the change, we increased trial-to-customer conversion by 200%."
    }
  ],
  toc: [
    { id: "overview", label: "Overview" },
    { id: "problem-framing", label: "Problem framing" },
    { id: "solution", label: "Solution" },
    { id: "final-design", label: "Final design" },
    { id: "results", label: "Results" }
  ],
  problemFraming: {
    heading: "Why we started redesigning onboarding?",
    intro: [
      "Lokalise had massive growth between 2018 to 2022. We doubled our revenue year over year, and raised a $50M Series B funding in 2022.",
      "However, as the market got more competitive, we noticed a massive drop in acquisition and activation rate since late-2022. This is a red flag because activation rate is closely linked to retention, and we are at risk of losing future revenue when looking at the trend."
    ],
    activationFigure: {
      src: "/case-study/onboarding/problem-framing/chart.png",
      alt: "Activation rate declined steadily from 2022 through 2024.",
      caption: "Activation rate declined steadily from 2022 through 2024."
    },
    steps: [
      {
        title: "Step #1 Dogfooding - Mapping out the current onboarding.",
        body: [
          "When we first established the Growth team, I was the only team member in the team (Both PM and EM had not started yet). Since I had no one to rely on and plan stuff, I could only rely on my designer colleagues from Lokalise design team.",
          "The first thing I did was ask everyone to join me in evaluating the current onboarding (aka, dogfooding). This exercise helped us internally gauge how effective our onboarding process is and kick off discussions on potential improvements."
        ],
        figures: [
          {
            src: "/case-study/onboarding/problem-framing/dogfooding-board.jpg",
            alt: "Dogfooding board used to evaluate the existing onboarding journey.",
            caption: "Dogfooding board used to evaluate the existing onboarding journey."
          }
        ]
      },
      {
        title: "Step #2 - Analyzing Quantitative data",
        body: [
          "After mapping out the end-to-end experience, my PM also joined the team where we finally had more resources for data analysis: where people drop, what features they use during trial period, and what blocked activation."
        ],
        figures: [
          {
            src: "/case-study/onboarding/problem-framing/quant-dropoff.png",
            alt: "Largest drop-offs in onboarding funnel.",
            caption:
              "The largest drop-offs happened between sign-up and project creation, then again between project creation and file import."
          },
          {
            src: "/case-study/onboarding/problem-framing/amplitude.png",
            alt: "Amplitude funnel analytics.",
            caption: "Amplitude helped us trace where users stalled across the onboarding funnel."
          }
        ]
      },
      {
        title: "Step #3 - Interviewing customer & prospects",
        body: [
          "After identifying where drop-offs occur, we began conducting interviews with both prospects and current users to understand why they were leaving during the onboarding flow."
        ],
        figures: [
          {
            src: "/case-study/onboarding/problem-framing/interview.png",
            alt: "Interview sessions with customers and prospects.",
            caption: "Interview sessions with more than 20 prospects and customers."
          },
          {
            src: "/case-study/onboarding/problem-framing/interview-grid.png",
            alt: "Interview synthesis board.",
            caption: "Interview synthesis used to identify root frictions."
          }
        ]
      }
    ]
  },
  frictionSummary: {
    heading:
      "Through these steps, we identified 3 major frictions that block users from onboarding successfully in Lokalise.",
    prompt: "Can you guess what those frictions were?",
    figure: {
      src: "/case-study/onboarding/problem-details/quiz-game.png",
      alt: "Lokalise onboarding screen with three annotated friction points"
    },
    notes: ["Banner blindness", "Interruptive experience", "High cognitive load"]
  },
  problemDetails: {
    heading: "Why are these problems, problems?",
    sections: [
      {
        title: "1. Cognitive Load",
        body:
          "Cognitive load refers to the mental effort needed to complete and understand a task. Instead of making it easy to start using Lokalise, we overwhelm users with a long list of actions and calls to action (CTAs), which takes time to process.",
        figure: {
          src: "/case-study/onboarding/problem-details/heatmap.png",
          alt: "Heatmap showing overloaded onboarding surface."
        }
      },
      {
        title: "2. Banner blindness",
        body:
          "The top banner is something that everyone ignores. In fact, the average click rate of a top banner is just around 0.004%. However, at the same time, this top banner is breaking the user experience.",
        figure: {
          src: "/case-study/onboarding/problem-details/quiz.png",
          alt: "Lokalise onboarding screen highlighting the confusing top banner"
        },
        note:
          "Users did not understand what the top banner was asking them to do, so it was easy to ignore despite taking up valuable space."
      },
      {
        title: "3. Interruptive Experience",
        body:
          "Finally, showing users a pop-up that blocks them from accessing the app right away disrupts their flow and can lead to irritation, especially when the pop-up is also cluttered with multiple CTAs.",
        figure: {
          src: "/case-study/onboarding/problem-details/quiz.png",
          alt: "Lokalise onboarding screen highlighting the interruptive modal"
        },
        note:
          "The blocking modal interrupted the flow before users could explore the product, forcing them to decode a decision before they had any context."
      }
    ],
    additionalProblems: {
      heading: "And of course, we found even more problems...",
      figure: {
        src: "/case-study/onboarding/problem-details/more-problems.png",
        alt: "Additional friction points identified through internal dogfooding"
      },
      caption: "Additional friction points identified through internal dogfooding",
      gifEmbed: "https://giphy.com/embed/LfGGW219qNzLP6IzTA"
    }
  },
  solution: {
    heading: "Now, you may ask: Ben, how did you solve the problem then?",
    intro: "I am glad that you asked. It is boring to continue reading text, so here are visuals to support it.",
    sprint: {
      title: "1. Design Sprint (i.e., Prioritize as a team)",
      body:
        "After we had done our research to identify the problems, I facilitated a design sprint workshop with PM, engineers, data analyst, and user researcher to prioritize the problems together as a team, and propose solutions.",
      figure: {
        src: "/case-study/onboarding/solution/design-sprint.webp",
        alt: "Prioritization workshop board from the design sprint",
        caption: "Prioritizing the opportunity space together as one team"
      },
      ideasHeading: "Design ideas we came up with from the workshop",
      bullets: [
        "Allow users to preview translation results to motivate them during the signup process.",
        "Implement a passive onboarding checklist to facilitate users (instead of a checklist modal).",
        "An interactive sign-up process to help users get familiar with the product.",
        "Develop a JTBD-based homepage to allow users to identify supported content types earlier."
      ],
      ideaFigures: [
        {
          src: "/case-study/onboarding/solution/idea-1.webp",
          alt: "Onboarding concept exploration 1"
        },
        {
          src: "/case-study/onboarding/solution/idea-2.webp",
          alt: "Onboarding concept exploration 2"
        },
        {
          src: "/case-study/onboarding/solution/idea-3.webp",
          alt: "Onboarding concept exploration 3"
        },
        {
          src: "/case-study/onboarding/solution/idea-4.webp",
          alt: "Onboarding concept exploration 4"
        }
      ],
      caption: "Four early concepts we explored after the workshop"
    },
    testing: {
      title: "2. Then we went testing with users on each of the ideas",
      body:
        "Following the workshop and prototyping phase, we conducted user testing with prospective users to determine which idea would have the most significant impact.",
      learned: [
        "The JTBD-based homepage helped visitors identify what we can help them with earlier (the types of content they can translate).",
        "The passive onboarding checklist helped new users familiarize themselves with the platform without disruption."
      ],
      figure: {
        src: "/case-study/onboarding/solution/ideas-grid.png",
        alt: "Grid of concepts shown during user testing"
      },
      caption: "The set of concepts we tested with users"
    },
    iterations: {
      title: "3. Then more iterations of design & testing...",
      body:
        "Incorporating user feedback, I began iterating on the design to address the usability and UX issues raised by testers. This ensures we deliver a high-quality product.",
      figure: {
        src: "/case-study/onboarding/solution/testing-iterations.png",
        alt: "Iterations of the onboarding checklist after user testing"
      },
      caption: "Iterations of the onboarding checklist after user testing"
    }
  },
  finalDesigns: {
    heading: "Final designs and what we shipped",
    intro: "After two rounds of testing, we began polishing the final Minimum Viable Product (MVP) to prepare it for shipment and real-world user testing.",
    blocks: [
      {
        id: "jtbd-homepage",
        title: "1. A JTBD-based homepage",
        description:
          "We rolled out a JTBD-based homepage after discovering that visitors often come to Lokalise to localize specific content types.",
        beforeLabel: "Old homepage",
        afterLabel: "New homepage",
        beforeSrc: "/case-study/onboarding/final-design/old-homepage.webp",
        afterSrc: "/case-study/onboarding/final-design/image-249.png",
        alt: "Before and after comparison of the Lokalise homepage redesign",
        stats: [
          {
            value: "36% increase in signup attempt rate",
            description: "Visitors could identify supported content types earlier, reducing friction at the top of the funnel."
          },
          {
            value: "15% increase in actual sign up rate",
            description: "Clearer value proposition and JTBD-aligned messaging converted more visitors to sign-ups."
          }
        ]
      },
      {
        id: "signup-refresh",
        title: "2. Light-refresh of our sign up page",
        description:
          "We dedicated a week to lightly refresh our sign-up pages, showcasing Lokalise features and updating copywriting to better communicate our offerings.",
        beforeLabel: "Old sign-up",
        afterLabel: "New sign-up",
        beforeSrc: "/case-study/onboarding/final-design/old-signup.webp",
        afterSrc: "/case-study/onboarding/final-design/image-250.png",
        alt: "Before and after comparison of the sign-up redesign",
        stats: [
          {
            value: "37% increase in sign-up conversion",
            description: "Combined with the JTBD homepage, updated copywriting and feature showcase drove overall sign-up growth."
          },
          {
            value: "Reduced cognitive load at sign-up",
            description: "Cleaner layout and focused messaging removed friction that previously caused users to abandon the flow."
          }
        ]
      },
      {
        id: "in-app-onboarding",
        title: "3. Full redesign of our in-app onboarding",
        description:
          "We replaced the interruptive modal with a passive, actionable checklist that guides users through onboarding without blocking access to the product.",
        beforeLabel: "Old onboarding",
        afterLabel: "New onboarding",
        beforeSrc: "/case-study/onboarding/final-design/old-onboarding.webp",
        afterSrc: "/case-study/onboarding/final-design/image-251.png",
        alt: "Before and after comparison of the in-app onboarding redesign",
        stats: [
          {
            value: "18% increase in projects created",
            description: "The passive checklist guided users to the Setup moment without disrupting their flow."
          },
          {
            value: "15% increase in translation downloads",
            description: "More users reached the AHA moment - downloading their first translation - with the new guided experience."
          }
        ]
      }
    ]
  },
  feedbackImpact: {
    heading: "Feedback & impact",
    intro: "Combining all the implementation and design we delivered, we managed to:",
    bullets: [
      "Increase sign-up rate by 37%",
      "Increase sign-up to AHA rate from 3% to 12.7%",
      "Double the number of trial-to-customer rate"
    ],
    quote: '"I have never used Lokalise before but I feel like I have used it. That is a weird feeling." - Prospect of Lokalise.'
  },
  furtherReading: {
    title: "Published in UXCollective - March, 2024",
    description:
      "Designing user onboarding: lessons from Figma, Duolingo, and more. Find out the common mistakes in onboarding and learn the secret sauce behind engaging onboarding from 20+ top tech companies.",
    href: "https://uxdesign.cc/designing-user-onboarding-lessons-from-figma-duolingo-and-more-d446522e8a65",
    cta: "Read article",
    image: "/case-study/onboarding/results/article-cover.png"
  },
  templates: {
    title: "Onboarding dogfooding evaluation template",
    description: "The Miro board used to run the internal dogfooding exercise with the design team.",
    href: "https://miro.com/app/board/uXjVKIhpssE=",
    cta: "Tap to clone"
  },
  moreCaseStudies: {
    heading: "More case studies",
    cards: [
      {
        tag: "AI Lokalise",
        title: "AI Translation Review",
        description: "Bringing AI into the translation review workflow to help teams move faster without losing quality.",
        image: "/case-study/onboarding/related/ai-translation-review.webp",
        href: "https://www.benshih.design/case-study/ai-translation-review"
      },
      {
        tag: "AI Miro",
        title: "AI-first experience at Miro",
        description: "A behavior-first approach to AI entry points, momentum, and collaboration workflows.",
        image: "/case-study/onboarding/related/ai-first-experience.png",
        href: "https://www.benshih.design/case-study/ai-first-experience"
      },
      {
        tag: "Campaign Miro",
        title: "Miro recap at scale",
        description: "How we built a yearly recap experience that scaled to millions while keeping completion high.",
        image: "/case-study/onboarding/related/miro-recap.png",
        href: "https://www.benshih.design/case-study/miro-recap"
      }
    ]
  }
};
