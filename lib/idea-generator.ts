// Database of ideas for each category specific to Texas
const ideasDatabase = {
  jobs: [
    "Remote software developer for Austin's growing tech hub",
    "Healthcare administrator in Houston's medical center",
    "Renewable energy technician for West Texas wind farms",
    "Oil and gas field supervisor in the Permian Basin",
    "Cybersecurity analyst for Dallas financial institutions",
    "Bilingual customer service representative for border region businesses",
    "Construction project manager for expanding Texas suburbs",
    "Logistics coordinator for Texas-Mexico trade routes",
    "Agricultural technology specialist for Central Texas farms",
    "Tourism and hospitality manager in San Antonio",
    "Corporate relocation specialist helping businesses move to Texas",
    "ESL teacher for growing immigrant communities",
    "Aerospace engineer for NASA in Houston",
    "Real estate appraiser in fast-growing Texas cities",
    "Water resource manager addressing Texas drought challenges",
  ],
  businesses: [
    "Mobile food truck featuring Texas-Mexican fusion cuisine",
    "Eco-friendly landscaping service using native Texas plants",
    "Co-working space catering to remote workers in suburban areas",
    "Electric vehicle charging station network along Texas highways",
    "Boutique Texas wine tourism company",
    "Disaster preparedness consulting for Gulf Coast businesses",
    "Specialty pecan products using Texas-grown nuts",
    "Tech repair service for rural Texas communities",
    "Custom home cooling solutions for Texas heat",
    "Local delivery service connecting Texas farmers to urban consumers",
    "Bilingual business consulting for Texas-Mexico commerce",
    "Solar installation company for residential Texas properties",
    "Barbecue equipment and supplies retailer",
    "Water conservation technology for Texas ranches and farms",
    "Texas-themed subscription box featuring local products",
  ],
  "self-employment": [
    "Freelance content creator specializing in Texas tourism",
    "Mobile notary public serving rural Texas communities",
    "Social media manager for Texas small businesses",
    "Independent real estate investor focusing on Texas border towns",
    "Personal chef specializing in Texas regional cuisines",
    "Drone photographer for Texas ranches and properties",
    "Online Texas history tutor for homeschooled students",
    "Virtual assistant for Texas oil and gas professionals",
    "Custom boot maker preserving Texas craftsmanship",
    "Independent insurance agent specializing in Texas weather risks",
    "Freelance translator for Texas-Mexico business documents",
    "Mobile auto detailing service for luxury vehicles in Texas suburbs",
    "Independent tour guide for Texas historical sites",
    "Handmade Texas-themed crafts seller on e-commerce platforms",
    "Personal fitness trainer specializing in outdoor Texas activities",
  ],
  contracts: [
    "School district technology implementation specialist",
    "Municipal website development and maintenance",
    "Environmental impact assessment for Texas infrastructure projects",
    "Grant writer for Texas rural development initiatives",
    "Event coordinator for Texas state and county fairs",
    "Healthcare facility compliance consultant",
    "Texas government agency IT security auditor",
    "Public transportation planning consultant for growing Texas cities",
    "Renewable energy project manager for municipal installations",
    "Disaster recovery specialist for Gulf Coast communities",
    "Cultural sensitivity trainer for Texas businesses with diverse workforces",
    "Water quality testing for Texas municipalities",
    "Bilingual community outreach coordinator for public health initiatives",
    "Texas historical building restoration specialist",
    "Energy efficiency consultant for Texas public buildings",
  ],
}

// Function to generate a random idea based on the selected category
export async function generateIdea(category: string): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const ideas = ideasDatabase[category as keyof typeof ideasDatabase] || []
  if (ideas.length === 0) {
    return "No ideas available for this category yet."
  }

  const randomIndex = Math.floor(Math.random() * ideas.length)
  return ideas[randomIndex]
}

