const CONTENT = {
  links: {
    linkedin: 'https://www.linkedin.com/in/guido-fioravantti-425b1966',
    saferlayer: 'https://saferlayer.com',
    carto: 'https://carto.com'
  },
  welcome: {
    greeting: 'hello,',
    body: [
      "i'm guido. i build teams and products. i'm based in nyc, with experience across geographies, industries, and markets. my work starts when something is missing or stuck. i get to know the people, clear the blockers, and lead the team to deliver.",
      '',
      'tap below to learn more.'
    ]
  },
  experience: [
    {
      header: 'bloomberg, trading systems',
      subheader: 'jan 2026 — present',
      body: [
        'i work across money markets, mortgage workflows, commodities, and sell-side middle office for allocation and settlement. the job is to modernize the stack, improve execution, and get the teams delivering well.'
      ]
    },
    {
      header: 'bloomberg, geo compute',
      subheader: 'jun 2022 — feb 2026',
      body: [
        "i started this team from scratch. bloomberg had mapping tools, but not a real platform for geospatial analysis. we built an api-first product that finds the geographical footprint of any financial entity, whether that's a company, a muni bond, or a supply chain. once you have that footprint, you can layer in alternative data and ask better questions. is this storm going to hit exxon's refineries? how does aldi's demographic reach compare with target's? how has biodiversity shifted around these factories over time? the historical view mattered as much as the map."
      ]
    },
    {
      header: 'bloomberg, maps',
      subheader: 'jul 2019 — jun 2022',
      body: [
        "i replaced bloomberg's legacy gis stack with open-source tooling and built the infrastructure from scratch: databases, services, and our own kubernetes-based system before the company-wide platform existed. the work was close to the business and focused on covering real client needs with the right technology."
      ]
    },
    {
      header: 'carto',
      subheader: 'jul 2015 — feb 2018',
      body: [
        'i joined when the company was around 20 people and left when it was over 120. i worked mostly on the backend, but across the stack where needed.'
      ]
    }
  ],
  contact: {
    items: [
      { platform: 'linkedin', linkKey: 'linkedin', text: 'reach me on linkedin' }
    ]
  },
  projects: [
    {
      name: 'saferlayer',
      linkKey: 'saferlayer',
      body: [
        "i co-founded saferlayer with carlos sanchez, a long-time collaborator i met in new york. when someone asks for your id, saferlayer lets you embed their name into the document offline and for free. ai can't remove the watermark. the copy stays tied to whoever requested it, so if it leaks, you know where it came from. we're now building a b2b api so businesses can integrate it directly."
      ]
    },
    {
      name: 'bloomberg geo compute',
      body: [
        'api-first geospatial intelligence for financial data. find the geographical footprint of any entity, layer in alternative data, and run exposure analysis with historical lookback.'
      ]
    },
    {
      name: 'bloomberg trading systems',
      body: [
        'execution and allocation systems for money markets, mortgages, and commodities.'
      ]
    },
    {
      name: 'carto',
      linkKey: 'carto',
      body: [
        'open-source geospatial platform.'
      ]
    }
  ]
};

export default CONTENT;