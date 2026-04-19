export type DesignSystemFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type DesignSystemSectionCard = {
  title: string;
  body: string[];
  bullets?: string[];
  figures?: DesignSystemFigure[];
};

export type DesignSystemSection = {
  id: string;
  heading: string;
  intro: string[];
  cards: DesignSystemSectionCard[];
};

export type DesignSystemCaseStudyContent = {
  slug: string;
  metadataTitle: string;
  metadataDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  myRole: string;
  timeline: string;
  team: string[];
  heroFigure: DesignSystemFigure;
  impactOverview: Array<{
    title: string;
    value: string;
    description: string;
  }>;
  toc: Array<{ id: string; label: string }>;
  introduction: DesignSystemSection;
  exploration: DesignSystemSection;
  patternsAndComponents: DesignSystemSection;
  templates: DesignSystemSection;
  documentation: DesignSystemSection;
  engineering: DesignSystemSection;
  reflection: {
    id: string;
    heading: string;
    intro: string[];
    quote: string;
    figures: DesignSystemFigure[];
  };
  attribution: {
    title: string;
    author: string;
    publication: string;
    href: string;
    note: string;
  };
};

export const designSystemCaseStudy: DesignSystemCaseStudyContent = {
  slug: "casestudy/design-system",
  metadataTitle: "Plasma Design System Case Study | Rishabh Choudhary",
  metadataDescription:
    "A curated case study inspired by Plasma: how a cross-product design system was explored, componentized, documented, and engineered for scale.",
  heroTitle: "Building Plasma,",
  heroSubtitle: "a scalable design system",
  overview:
    "This case study captures how a design system matured from visual exploration into reusable patterns, robust documentation, and engineering-ready standards across multiple products.",
  myRole: "Product design, system architecture, documentation strategy, and design-dev alignment.",
  timeline: "5-phase system rollout",
  team: ["Product Designer", "Design Lead", "Frontend Engineer", "UX Writer"],
  heroFigure: {
    src: "/case-study/design-system/hero/plasma-hero-overview.webp",
    alt: "High-level Plasma design system visual overview",
    caption: "Plasma started as a visual language and evolved into a cross-product system."
  },
  impactOverview: [
    {
      title: "System Scope",
      value: "5-step framework",
      description: "From exploration to engineering, the system was intentionally phased to avoid fragmentation."
    },
    {
      title: "Product Coverage",
      value: "Multi-product",
      description: "The same foundations were shaped for CMS, Spacestation, and Data Query experiences."
    },
    {
      title: "Operational Outcome",
      value: "Living documentation",
      description: "Patterns and components were documented to support repeatable usage and faster onboarding."
    }
  ],
  toc: [
    { id: "overview", label: "Overview" },
    { id: "introduction", label: "Introduction" },
    { id: "exploration", label: "Design exploration" },
    { id: "patterns-components", label: "Patterns & components" },
    { id: "templates", label: "Templates" },
    { id: "documentation", label: "Documentation" },
    { id: "engineering", label: "Engineering" },
    { id: "reflection", label: "Reflection" }
  ],
  introduction: {
    id: "introduction",
    heading: "Introduction",
    intro: [
      "Plasma was created to bring visual and interaction consistency to a growing product ecosystem. The challenge was not only to design a clean UI language, but to make it durable enough for teams shipping at different speeds.",
      "The process emphasized clarity, scalability, and practical adoption so designers and engineers could use the same system language in daily work."
    ],
    cards: [
      {
        title: "Problem framing",
        body: [
          "As product complexity increased, consistency started to drift. Teams needed a shared structure for color, typography, spacing, and reusable UI behavior.",
          "The goal was to reduce rework, improve readability, and create a trusted system that could be applied across multiple interfaces."
        ]
      }
    ]
  },
  exploration: {
    id: "exploration",
    heading: "Step 1: Design exploration",
    intro: [
      "The first phase focused on visual principles and product-fit direction. The system had to stay minimal and clear while working across very different use cases."
    ],
    cards: [
      {
        title: "Simple, clear, and clean",
        body: [
          "The exploration phase prioritized legibility and restraint, removing decorative complexity so product tasks remained central.",
          "Visual decisions were tested against real product screens to ensure clarity under dense, enterprise-style interfaces."
        ],
        figures: [
          {
            src: "/case-study/design-system/exploration/simple-clear-clean.webp",
            alt: "Visual exploration board for simple and clear interface direction"
          }
        ]
      },
      {
        title: "Colour theory and typography",
        body: [
          "Color and type were chosen as system-level tools, not decoration. Contrast, hierarchy, and semantic usage were treated as functional constraints.",
          "This created a baseline where product teams could compose interfaces without reinventing style decisions each sprint."
        ],
        figures: [
          {
            src: "/case-study/design-system/exploration/colour-theory.webp",
            alt: "Color and typography exploration for the Plasma design system"
          }
        ]
      },
      {
        title: "Product-side validation",
        body: [
          "The visual language was validated against real product contexts to ensure portability between product surfaces.",
          "Early product-specific passes revealed where foundations were robust and where adaptation rules were needed."
        ],
        figures: [
          {
            src: "/case-study/design-system/exploration/product-exploration.webp",
            alt: "Plasma visual direction tested across product screens"
          }
        ]
      }
    ]
  },
  patternsAndComponents: {
    id: "patterns-components",
    heading: "Step 2: Patterns and components",
    intro: [
      "After exploration, the system shifted from visual direction to reusable building blocks. Patterns and components translated design principles into implementation-ready UI."
    ],
    cards: [
      {
        title: "Patterns first, then components",
        body: [
          "Repeatable workflows were captured as patterns before atomizing them into components. This preserved user intent and prevented isolated component decisions.",
          "Patterns became the bridge between product behavior and UI primitives."
        ],
        figures: [
          {
            src: "/case-study/design-system/patterns/patterns-overview.webp",
            alt: "Pattern mapping and reusable UI behavior in Plasma"
          }
        ]
      },
      {
        title: "Component library readiness",
        body: [
          "Components were standardized for naming, states, and composability so the same pieces could be reused without fragile overrides.",
          "The resulting library supported responsive use while staying predictable for implementation."
        ],
        bullets: [
          "Consistent state models (default, hover, focus, disabled).",
          "Predictable spacing and typography tokens.",
          "Composable structure for high-density product layouts."
        ],
        figures: [
          {
            src: "/case-study/design-system/patterns/components-library.webp",
            alt: "Component library structure from the Plasma design system"
          }
        ]
      }
    ]
  },
  templates: {
    id: "templates",
    heading: "Step 3: The power of templates",
    intro: [
      "Templates accelerated consistency by packaging proven patterns into ready-to-use layouts. This helped teams move fast without compromising structure."
    ],
    cards: [
      {
        title: "Covering common scenarios",
        body: [
          "Template coverage focused on the screens teams built most often, reducing setup cost for new work.",
          "By codifying layout decisions, teams could focus on product-specific content and behavior instead of rebuilding scaffolding."
        ],
        figures: [
          {
            src: "/case-study/design-system/templates/template-coverage.webp",
            alt: "Template-driven layout system used in Plasma"
          }
        ]
      }
    ]
  },
  documentation: {
    id: "documentation",
    heading: "Step 4: Documenting the design system",
    intro: [
      "Documentation turned Plasma from a design artifact into an operational system. Teams needed clear guidance on when and how to use each pattern and component."
    ],
    cards: [
      {
        title: "How we documented Plasma",
        body: [
          "Documentation covered principles, anatomy, usage guidance, edge cases, and examples. The aim was to make decisions discoverable, not tribal knowledge.",
          "This improved onboarding for both designers and engineers and reduced ambiguity during handoff."
        ],
        bullets: [
          "Usage guidance with practical examples.",
          "Do and do-not scenarios for consistency at scale.",
          "Clear naming and taxonomy for discoverability."
        ],
        figures: [
          {
            src: "/case-study/design-system/documentation/doc-preview-1.webp",
            alt: "Plasma documentation preview module one"
          },
          {
            src: "/case-study/design-system/documentation/doc-preview-2.webp",
            alt: "Plasma documentation preview module two"
          },
          {
            src: "/case-study/design-system/documentation/doc-preview-3.webp",
            alt: "Plasma documentation preview module three"
          },
          {
            src: "/case-study/design-system/documentation/doc-preview-4.webp",
            alt: "Plasma documentation preview module four"
          }
        ]
      }
    ]
  },
  engineering: {
    id: "engineering",
    heading: "Step 5: Engineering the system",
    intro: [
      "A design system only scales when design and code stay aligned. The final phase translated Plasma into implementation standards and sustainable naming conventions."
    ],
    cards: [
      {
        title: "Design and code working as one system",
        body: [
          "The team aligned component structures and naming between design files and code. This reduced mismatch during implementation and review.",
          "System decisions were treated as shared product infrastructure rather than one-off design outputs."
        ],
        figures: [
          {
            src: "/case-study/design-system/engineering/design-and-code.webp",
            alt: "Design-to-code mapping in Plasma system engineering"
          }
        ]
      },
      {
        title: "Naming conventions",
        body: [
          "Naming conventions improved discoverability and reduced duplicate components. Predictable naming also made handoff and maintenance faster.",
          "This foundation made the system easier to extend as products evolved."
        ],
        figures: [
          {
            src: "/case-study/design-system/engineering/naming-conventions.webp",
            alt: "Naming convention guidelines for Plasma design system"
          }
        ]
      }
    ]
  },
  reflection: {
    id: "reflection",
    heading: "This is not the end",
    intro: [
      "Plasma demonstrates that design systems are living products. Their value compounds through adoption, governance, and continuous iteration.",
      "The long-term win is not only visual consistency, but a shared language that helps teams ship better decisions faster."
    ],
    quote:
      "\"A design system is never finished. It grows with every product decision, every edge case, and every team that adopts it.\"",
    figures: [
      {
        src: "/case-study/design-system/reflection/final-reflection.webp",
        alt: "Final reflection visual from Plasma article",
        caption: "System work scales when design, documentation, and engineering evolve together."
      },
      {
        src: "/case-study/design-system/reflection/behind-the-scenes.webp",
        alt: "Behind-the-scenes visual from the Plasma design system process"
      }
    ]
  },
  attribution: {
    title: "Content inspiration",
    author: "Andrew Couldwell",
    publication: "Owl Studios / Medium",
    href: "https://medium.com/owl-studios/plasma-design-system-4d63fb6c1afc",
    note:
      "This page is a curated adaptation inspired by the original Plasma article, restructured for portfolio storytelling."
  }
};
