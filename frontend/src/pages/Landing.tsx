import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Target, BarChart3, TrendingUp, Zap, Check, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: "Smart Influencer Matching",
      description: "AI-powered algorithm matches your brand with perfect influencers based on audience, engagement, and values."
    },
    {
      icon: Zap,
      title: "AI Campaign Optimization",
      description: "Continuously optimize campaigns in real-time using machine learning insights."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance metrics, engagement rates, and ROI with comprehensive dashboards."
    },
    {
      icon: TrendingUp,
      title: "ROI Tracking",
      description: "Measure exact returns on your influencer marketing investments with detailed attribution."
    }
  ];

  const companies = ["TechCorp", "StyleHub", "FitLife", "GamerZone", "FoodieApp", "TravelPro"];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      content: "InfluMatch.ai transformed our influencer strategy. We saw 300% ROI increase in just 3 months!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "CEO, StyleHub",
      content: "The AI matching is incredible. We found influencers we never would have discovered manually.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Brand Manager, FitLife",
      content: "Real-time analytics changed everything. We now make data-driven decisions instantly.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      features: ["Up to 5 campaigns", "Basic analytics", "Email support", "1 team member"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth",
      price: "$199",
      features: ["Unlimited campaigns", "Advanced analytics", "Priority support", "10 team members", "AI optimization", "Custom reports"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Growth", "Dedicated account manager", "Custom integrations", "Unlimited team members", "White-label options", "SLA guarantee"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the AI matching work?",
      answer: "Our AI analyzes thousands of data points including audience demographics, engagement patterns, content style, and brand alignment to find the perfect influencer matches for your campaigns."
    },
    {
      question: "What social platforms do you support?",
      answer: "We support all major platforms including Instagram, TikTok, YouTube, Twitter, and LinkedIn. More platforms are added regularly based on user feedback."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
    },
    {
      question: "How accurate is the ROI tracking?",
      answer: "Our ROI tracking uses advanced attribution models with 95%+ accuracy. We track conversions, engagement, and sales data to provide comprehensive ROI insights."
    },
    {
      question: "Do you offer training for new users?",
      answer: "Yes! All Growth and Enterprise plans include onboarding sessions and access to our learning center with video tutorials and best practices."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Chatbot />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Turn influencer marketing from{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  guesswork into data-driven success
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with the perfect influencers, optimize campaigns with AI, and track real ROI—all in one platform.
              </p>
              <div className="flex gap-4">
                <Link to="/signup/company">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src={heroImage}
                alt="Influencer Marketing Platform"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company) => (
              <div key={company} className="text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Marketing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run successful influencer campaigns at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Real results from real companies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-2 border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full w-fit mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup/company">
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
