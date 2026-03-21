const CONTENT = {
  links: {
    linkedin: 'https://www.linkedin.com/in/guido-fioravantti-425b1966',
    saferlayer: 'https://saferlayer.com',
    carto: 'https://carto.com'
  },
  welcome: {
    greeting: 'Hello!',
    body: [
      "I'm Guido Fioravantti, and I build teams and",
      'products. Started at a startup in Madrid, then',
      'moved to New York and kept going at Bloomberg.'
    ]
  },
  experience: [
    {
      header: 'Bloomberg, Trading Systems (Jan 2026 &mdash; Present)',
      body: [
        'Four domains: money markets (we run the leading',
        'origination platform in the space), mortgages and',
        'MBS workflows, commodities (highest volume of the',
        'three), and sell side middle office for allocation',
        'and settlement. The focus is modernizing the tech',
        'stack and turning the teams around.'
      ]
    },
    {
      header: 'Bloomberg, Geo Compute (Jun 2022 &mdash; Feb 2026)',
      body: [
        'Founded this team from scratch. Bloomberg had MAP,',
        'but it expected clients to come to the map and do',
        'their analysis there, so we built an API-first',
        'product that finds the geographical footprint of',
        'any financial entity: a company, a muni bond, a',
        'supply chain. Once you have the footprint, you',
        'overlay alternative data. Is this storm going to',
        "hit Exxon's refineries? How does Aldi's",
        "demographic reach compare to Target's? Has",
        'biodiversity shifted near these factories? And you',
        'can go back historically and construct scores,',
        "something a point-in-time map can't do."
      ]
    },
    {
      header: 'Bloomberg, Maps (Jul 2019 &mdash; Jun 2022)',
      body: [
        "Replaced Bloomberg's legacy GIS stack with the",
        'open-source tooling I knew from CARTO and built',
        'all the infra from scratch: databases, services,',
        'our own k8s system before the company-wide one',
        'existed. Always keeping a beat on the geo business',
        'and suggesting ways to cover client needs with',
        'the tech.'
      ]
    },
    {
      header: 'CARTO (Jul 2015 &mdash; Feb 2018)',
      body: [
        'Joined when the company was about 20 people, left when',
        'it was over 120. Became one of the top contributors to',
        'the platform, mostly backend but across the full stack.'
      ]
    }
  ],
  whatIDo: {
    body: [
      'Most of what I do is help teams reach their full',
      'potential, figuring out what they need and building',
      "from there. I've done it multiple times at",
      'Bloomberg, and the product instinct is always part',
      'of it: Geo Compute and SaferLayer both started as',
      'gaps I spotted. I stay hands-on technically too,',
      'mostly distributed systems, backend, and infra,',
      'with applied AI and computer vision more recently.'
    ]
  },
  education: [
    {
      header: 'Degree',
      body: [
        'Title\t\tIngenier&iacute;a Telem&aacute;tica',
        'Where\t\tUniversidad Carlos III de Madrid',
        'Time\t\t2010 &mdash; 2015'
      ]
    }
  ],
  contact: {
    label: 'Find me on:',
    items: [
      { platform: 'LinkedIn', linkKey: 'linkedin', text: 'Guido Fioravantti' }
    ]
  },
  projects: [
    {
      name: 'SaferLayer',
      linkKey: 'saferlayer',
      body: [
        'Co-founded with Carlos Sanchez, a long-time partner',
        "I met in New York. When someone asks for your ID,",
        "you use SaferLayer's free offline tool to embed",
        "their name into the document. AI can't remove the",
        'watermark. Your copy is forever linked to whoever',
        'requested it, so if it leaks, you know where it',
        'came from. Went viral in Spain. Now building a B2B',
        'API so businesses can integrate directly.'
      ]
    },
    {
      name: 'Bloomberg Geo Compute',
      body: [
        'API-first geospatial intelligence for financial data.',
        'Find the geographical footprint of any entity, overlay',
        'alternative data (weather, demographics, biodiversity),',
        'and run exposure analysis with historical lookback.'
      ]
    },
    {
      name: 'Bloomberg Trading Systems',
      body: [
        'Execution and allocation systems for money markets,',
        'mortgages, and commodities.'
      ]
    },
    {
      name: 'CARTO',
      linkKey: 'carto',
      body: [
        "Open-source geospatial platform. Was one of the top",
        "contributors during the company's high-growth phase."
      ]
    }
  ]
};

export default CONTENT;
