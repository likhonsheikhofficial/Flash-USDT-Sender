/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import JsonLd from "@/components/json-ld"

export default function AboutPage() {
  // About page structured data
  const aboutPageData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://flash-usdt-sender.com/about/#webpage",
    url: "https://flash-usdt-sender.com/about/",
    name: "About Flash USDT Sender - Our Story and Mission",
    description:
      "Learn about Flash USDT Sender's history, mission, and the team behind the fastest USDT transfer service.",
    isPartOf: {
      "@id": "https://flash-usdt-sender.com/#website",
    },
    about: {
      "@id": "https://flash-usdt-sender.com/#organization",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://flash-usdt-sender.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://flash-usdt-sender.com/about/",
        },
      ],
    },
  }

  // Team members structured data
  const teamData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Person",
          name: "David Chen",
          jobTitle: "Founder & CEO",
          description: "Former blockchain architect with 10+ years in fintech",
          image: "https://flash-usdt-sender.com/confident-asian-professional.png",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Person",
          name: "Sarah Johnson",
          jobTitle: "CTO",
          description: "Blockchain developer and security expert",
          image: "https://flash-usdt-sender.com/confident-professional.png",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Person",
          name: "Michael Rodriguez",
          jobTitle: "Head of Operations",
          description: "Specialized in scaling fintech platforms globally",
          image: "https://flash-usdt-sender.com/confident-latino-professional.png",
        },
      },
    ],
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <JsonLd data={[aboutPageData, teamData]} />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">About Flash USDT Sender</h1>

        {/* Company Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Founded in 2021, Flash USDT Sender was created to solve a critical problem in the cryptocurrency space:
                slow and expensive USDT transfers across different networks.
              </p>
              <p className="text-lg mb-4">
                Our team of blockchain experts and financial technology specialists came together with a mission to make
                cross-network USDT transfers as simple as sending an email.
              </p>
              <p className="text-lg">
                Today, we serve thousands of users worldwide, processing millions in transaction volume daily while
                maintaining our commitment to security, speed, and reliability.
              </p>
            </div>
            <div className="relative h-80 w-full rounded-lg overflow-hidden">
              <Image src="/blockchain-office-flow.png" alt="Flash USDT Sender office" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-purple-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-center max-w-3xl mx-auto">
            To provide the fastest, most secure, and most accessible USDT transfer service across all major blockchain
            networks, empowering users to move their assets freely without technical barriers.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "David Chen",
                role: "Founder & CEO",
                bio: "Former blockchain architect with 10+ years in fintech",
                image: "/confident-asian-professional.png",
              },
              {
                name: "Sarah Johnson",
                role: "CTO",
                bio: "Blockchain developer and security expert",
                image: "/confident-professional.png",
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Operations",
                bio: "Specialized in scaling fintech platforms globally",
                image: "/confident-latino-professional.png",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                  <p className="mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
