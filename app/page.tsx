"use client";

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Button from "./components/button"
import { ArrowRight, Heart, Users, Scale, Shield, Award, ThumbsUp, Menu, X } from 'lucide-react'
import { playfair, inter } from './fonts'
import Navigation from './components/Navigation'
import BottomNavigation from './components/BottomNavigation'

const categories = [
  {
    title: "Getting Married",
    description: "Prepare for your big day and build a strong foundation for your marriage.",
    icon: <Heart className="w-16 h-16 text-[#0F5C5B]" />,
    color: "bg-[#B2D8D8]", // Lighter teal color
    link: "/getting-married"
  },
  {
    title: "Journey into Parenthood",
    description: "Get support for raising a happy, healthy family.",
    icon: <Users className="w-16 h-16 text-[#0F5C5B]" />,
    color: "bg-[#E8F5E9]",
    link: "/journey-into-parenthood"
  },
  {
    title: "Separation & Divorce",
    description: "Find compassionate guidance through difficult transitions.",
    icon: <Scale className="w-16 h-16 text-[#0F5C5B]" />,
    color: "bg-[#E3F2FD]",
    link: "/separation-divorce-main"
  },
]

const articles = [
  {
    title: "Top 6 Reasons to Get Marriage Counseling",
    excerpt: "Discover why marriage counseling can be beneficial for couples at any stage of their relationship.",
    author: "Dr. Emily Carter",
    date: "September 1, 2023",
    image: "/images/6-reasons-article/image1.jpg",
    link: "/articles/getting-married/top-6-reasons-to-get-marriage-counseling",
  },
  {
    title: "Preparing for Parenthood: Strengthen Your Bond",
    excerpt: "Learn how to set realistic expectations, prioritize postnatal recovery, and build a strong co-parenting foundation as you prepare for the journey of parenthood.",
    author: "Family Edition Team",
    date: "July 15, 2023",
    image: "/images/Preparing for Parenthood: Strengthen Your Bond/image1.jpg",
    link: "/articles/journey-into-parenthood/preparing-for-parenthood-strengthen-your-bond",
  },
  {
    title: "Top 5 Co-Parenting Tips",
    excerpt: "Discover effective strategies for successful co-parenting and ensuring your children's well-being.",
    author: "Family Edition Team",
    date: "June 20, 2023",
    image: "/images/Top 5 co parenting tips/top 5 image1.jpg",
    link: "/articles/divorce-process-guide/top-5-co-parenting-tips",
  },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-start items-center"> {/* Use justify-start */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-3xl font-bold text-[#0F5C5B]">Family Edition</span>
          </Link>
          <nav className="hidden md:block ml-auto"> {/* Added ml-auto for spacing */}
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Home</Link></li>
              <li><Link href="/getting-married" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Getting Married</Link></li>
              <li><Link href="/journey-into-parenthood" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Journey into Parenthood</Link></li>
              <li><Link href="/separation-divorce-main" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Separation & Divorce</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6 text-[#0F5C5B]" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-white z-40 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <Link href="/" className="flex items-center">
                <span className="text-lg font-bold text-[#0F5C5B]">Family Edition</span>
              </Link>
              <button onClick={toggleMenu}>
                <X className="h-6 w-6 text-[#0F5C5B]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                <li>
                  <Link href="/getting-married" className="text-lg text-[#0F5C5B] hover:underline" onClick={toggleMenu}>
                    Getting Married
                  </Link>
                </li>
                <li>
                  <Link href="/journey-into-parenthood" className="text-lg text-[#0F5C5B] hover:underline" onClick={toggleMenu}>
                    Journey to Parenthood
                  </Link>
                </li>
                <li>
                  <Link href="/separation-divorce-main" className="text-lg text-[#0F5C5B] hover:underline" onClick={toggleMenu}>
                    Separation & Divorce
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg text-[#0F5C5B] hover:underline" onClick={toggleMenu}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg text-[#0F5C5B] hover:underline" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="bg-[#0F5C5B] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Navigate Life's Relationships with Expert Guidance</h1>
              <p className="text-xl mb-8">From first dates to family milestones, we're here to support you every step of the way.</p>
              <Link href="/relationship-support-quiz">
                <Button 
                  className="bg-white text-[#0F5C5B] hover:bg-gray-100 hover:text-[#0A4342] px-8 py-4 rounded-full text-lg font-bold"
                  variant="ghost"
                >
                  Start Your Relationship Support Quiz
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* We're Here to Help Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-6 text-center text-[#0F5C5B]`}>We're Here to Help at Every Stage of Your Relationship</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className={`${category.color} rounded-lg p-6 text-center flex flex-col items-center justify-between`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-4">
                    {category.icon}
                  </div>
                  <h3 className={`${playfair.className} text-2xl font-bold mb-2 text-[#0F5C5B]`}>{category.title}</h3>
                  <p className="text-gray-700 mb-4 text-lg">{category.description}</p>
                  <Link href={category.link}>
                    <Button className="bg-[#0F5C5B] text-white hover:bg-[#0A4342] transition-colors duration-300 rounded-full py-2 px-4">
                      Explore Options
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-12 text-center text-[#0F5C5B]`}>Why Choose Family Edition?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-16 h-16 text-[#0F5C5B] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
                <p>Access a network of certified professionals for personalized advice.</p>
              </div>
              <div className="text-center">
                <Award className="w-16 h-16 text-[#0F5C5B] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Trusted Resources</h3>
                <p>Benefit from our curated collection of articles and tools.</p>
              </div>
              <div className="text-center">
                <ThumbsUp className="w-16 h-16 text-[#0F5C5B] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
                <p>Join a compassionate community for shared experiences and support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-12 text-center text-[#0F5C5B]`}>Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div 
                  key={index}
                  className="bg-[#FFE8D6] rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <Image src={article.image} alt={article.title} width={400} height={200} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#0F5C5B]">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-4">{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                    <Link href={article.link}>
                      <Button className="w-full bg-[#0F5C5B] text-white hover:bg-[#0A4342] transition-colors duration-300 rounded-full py-2 px-4">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BottomNavigation />
    </div>
  )
}
