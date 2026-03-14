'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Gamepad2,
  Hammer,
  Home,
  Keyboard,
  MessageCircle,
  Package,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">Loading...</div>
  </div>
)

export default function HomePage() {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidblocks.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Lucid Blocks Wiki",
        description: "Complete Lucid Blocks Wiki covering crafting, biomes, creatures, items, achievements, lore, and survival tips for the surreal voxel sandbox on Steam.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Lucid Blocks - Surreal Voxel Survival Sandbox",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Lucid Blocks Wiki",
        alternateName: "Lucid Blocks",
        url: siteUrl,
        description: "Complete Lucid Blocks Wiki resource hub for crafting, biomes, creatures, items, achievements, and survival guides",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Lucid Blocks Wiki - Surreal Voxel Survival Sandbox",
        },
        sameAs: [
          'https://store.steampowered.com/app/3495730/Lucid_Blocks/',
          'https://discord.com/invite/lucidblocks',
          'https://www.reddit.com/r/LucidBlocks/',
          'https://www.youtube.com/@lucy_b_locks',
        ],
      },
      {
        '@type': 'VideoGame',
        name: "Lucid Blocks",
        gamePlatform: ['PC', 'Steam'],
        applicationCategory: 'Game',
        genre: ['Survival', 'Sandbox', 'Adventure', 'Psychedelic'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://store.steampowered.com/app/3495730/Lucid_Blocks/',
        },
      },
    ],
  }

  // Copy state
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPath(text)
      setTimeout(() => setCopiedPath(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons - External links only */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://store.steampowered.com/app/3495730/Lucid_Blocks/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/3495730/Lucid_Blocks/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Ad Banner 1 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="7C7fybRM_No"
              title="LUCID BLOCKS | AVAILABLE NOW"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'demo-download', 'beginner-guide', 'coop-guide', 'tasks-objectives',
                'controls-keybinds', 'content-settings', 'crafting-equipment', 'loot-items',
                'enemies-hazards', 'stealth-escape', 'home-upgrades', 'community-discord',
                'mods-bepinex', 'popular-mods', 'controller-support', 'player-count'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 1: Demo Download */}
      <section id="demo-download" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.demoDownload.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.demoDownload.subtitle}
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Download Size', value: t.modules.demoDownload.downloadSize },
              { label: 'Disk Size', value: t.modules.demoDownload.diskSize },
              { label: 'Release Date', value: t.modules.demoDownload.releaseDate },
              { label: 'Price', value: t.modules.demoDownload.price },
            ].map((fact, index) => (
              <div key={index} className="p-4 bg-white/5 border border-border rounded-xl text-center">
                <div className="text-2xl font-bold text-[hsl(var(--nav-theme-light))] mb-1">
                  {fact.value}
                </div>
                <div className="text-sm text-muted-foreground">{fact.label}</div>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="scroll-reveal space-y-6 mb-8">
            {t.modules.demoDownload.sections.map((section: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                  {section.heading}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://store.steampowered.com/app/3495730/Lucid_Blocks/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                         bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                         text-white rounded-lg font-semibold transition-colors"
            >
              <Download className="w-5 h-5" />
              {t.modules.demoDownload.primaryCTA}
            </a>
            <a
              href="https://steamdb.info/app/4356080/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                         border border-border hover:bg-white/10 rounded-lg
                         font-semibold transition-colors"
            >
              {t.modules.demoDownload.secondaryCTA}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.beginnerGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.beginnerGuide.subtitle}
            </p>
          </div>

          {/* 5-Step Flow */}
          <div className="scroll-reveal mb-12">
            <div className="space-y-4">
              {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full
                                  bg-[hsl(var(--nav-theme)/0.2)]
                                  border-2 border-[hsl(var(--nav-theme)/0.5)]
                                  flex items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pitfall Cards */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6 text-center">Common Pitfalls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.beginnerGuide.pitfalls.map((pitfall: any, index: number) => (
                <div key={index} className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="font-bold mb-2 text-yellow-400">{pitfall.title}</h4>
                  <p className="text-sm text-muted-foreground">{pitfall.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 3: Co-op Guide */}
      <section id="coop-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.coopGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.coopGuide.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mt-4">
              <Users className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-semibold">Up to {t.modules.coopGuide.maxPlayers} Players</span>
            </div>
          </div>

          {/* Role Cards */}
          <div className="scroll-reveal mb-12">
            <h3 className="text-2xl font-bold mb-6">Team Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.modules.coopGuide.roles.map((role: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <DynamicIcon
                      name={role.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                    <h4 className="text-lg font-bold">{role.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Threats List */}
          <div className="scroll-reveal mb-8">
            <h3 className="text-2xl font-bold mb-6">Threats to Plan Around</h3>
            <div className="p-6 bg-white/5 border border-border rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {t.modules.coopGuide.threats.map((threat: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm">{threat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="scroll-reveal">
            <div className="p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Communication</h4>
                  <p className="text-sm text-muted-foreground">{t.modules.coopGuide.communication}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Tasks & Objectives */}
      <section id="tasks-objectives" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.tasksObjectives.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.tasksObjectives.subtitle}
            </p>
          </div>

          {/* Task Type Cards */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.tasksObjectives.taskTypes.map((taskType: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                  <ClipboardCheck className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <h3 className="text-lg font-bold mb-3">{taskType.type}</h3>
                  <ul className="space-y-2">
                    {taskType.examples.map((example: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[hsl(var(--nav-theme-light))]">•</span>
                        <span className="text-muted-foreground">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Tips */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6">Efficiency Tips</h3>
            <div className="p-6 bg-white/5 border border-border rounded-xl">
              <ul className="space-y-3">
                {t.modules.tasksObjectives.efficiency.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Module 5: Controls & Keybinds */}
      <section id="controls-keybinds" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.controlsKeybinds.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.controlsKeybinds.subtitle}
            </p>
          </div>

          {/* Keybind Table */}
          <div className="scroll-reveal mb-8">
            <div className="bg-white/5 border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
                {t.modules.controlsKeybinds.keybinds.map((bind: any, index: number) => (
                  <div key={index} className="p-4 bg-card">
                    <div className="font-mono font-bold text-[hsl(var(--nav-theme-light))] mb-1">
                      {bind.key}
                    </div>
                    <div className="text-sm text-muted-foreground">{bind.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Path */}
          <div className="scroll-reveal">
            <div className="p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-start gap-3">
                <Keyboard className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">How to Change Controls</h4>
                  <p className="text-sm text-muted-foreground">{t.modules.controlsKeybinds.changePath}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 6: Content Settings */}
      <section id="content-settings" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.contentSettings.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.contentSettings.subtitle}
            </p>
          </div>

          {/* Content Descriptors */}
          <div className="scroll-reveal mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {t.modules.contentSettings.descriptors.map((descriptor: string, index: number) => (
                <div key={index} className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <span className="text-sm font-semibold text-yellow-400">{descriptor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Sections */}
          <div className="scroll-reveal space-y-6">
            {t.modules.contentSettings.details.map((detail: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                  {detail.heading}
                </h3>
                <ul className="space-y-2">
                  {detail.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Crafting & Equipment */}
      <section id="crafting-equipment" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.craftingEquipment.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.craftingEquipment.subtitle}
            </p>
          </div>

          {/* Equipment Grid */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.modules.craftingEquipment.equipment.map((equip: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Hammer className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="text-lg font-bold">{equip.item}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{equip.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="scroll-reveal space-y-6">
            {t.modules.craftingEquipment.sections.map((section: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                  {section.heading}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Loot & Items */}
      <section id="loot-items" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.lootItems.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.lootItems.subtitle}
            </p>
          </div>

          {/* Category Cards */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.lootItems.categories.map((category: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                  <Package className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <h3 className="text-lg font-bold mb-3">{category.type}</h3>
                  <ul className="space-y-2">
                    {category.examples.map((example: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Carry Tips */}
          <div className="scroll-reveal mb-8">
            <h3 className="text-2xl font-bold mb-6">Carry Tips</h3>
            <div className="p-6 bg-white/5 border border-border rounded-xl">
              <ul className="space-y-3">
                {t.modules.lootItems.carryTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Levels */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6">Risk Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.lootItems.riskLevels.map((risk: any, index: number) => (
                <div key={index} className={`p-6 border rounded-xl ${
                  risk.level === 'Low' ? 'bg-green-500/10 border-green-500/30' :
                  risk.level === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-red-500/10 border-red-500/30'
                }`}>
                  <h4 className={`font-bold mb-2 ${
                    risk.level === 'Low' ? 'text-green-400' :
                    risk.level === 'Medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>{risk.level} Risk</h4>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 9: Enemies & Hazards */}
      <section id="enemies-hazards" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.enemiesHazards.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.enemiesHazards.subtitle}
            </p>
          </div>

          {/* Threat Cards */}
          <div className="scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.modules.enemiesHazards.threats.map((threat: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-lg font-bold">{threat.name}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Trigger:</span>
                      <p className="mt-1">{threat.trigger}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">What Happens:</span>
                      <p className="mt-1">{threat.behavior}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Counter:</span>
                      <p className="mt-1 text-[hsl(var(--nav-theme-light))]">{threat.counter}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 10: Stealth & Escape */}
      <section id="stealth-escape" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.stealthEscape.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.stealthEscape.subtitle}
            </p>
          </div>

          {/* Do/Don't Cards */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400">DO</h3>
                </div>
                <ul className="space-y-2">
                  {t.modules.stealthEscape.do.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <X className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-400">DON'T</h3>
                </div>
                <ul className="space-y-2">
                  {t.modules.stealthEscape.dont.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6 text-center">Quick Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.stealthEscape.quickTips.map((tip: any, index: number) => (
                <div key={index} className="p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
                  <h4 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 11: Home Upgrades */}
      <section id="home-upgrades" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.homeUpgrades.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.homeUpgrades.subtitle}
            </p>
          </div>

          {/* Branch Cards */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.modules.homeUpgrades.branches.map((branch: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <Home className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <h3 className="text-lg font-bold mb-2">{branch.branch}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{branch.summary}</p>
                  <ul className="space-y-1">
                    {branch.items.map((item: string, idx: number) => (
                      <li key={idx} className="text-xs text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Ranking */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6">Recommended Priority</h3>
            <div className="space-y-4">
              {t.modules.homeUpgrades.priority.map((priority: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full
                                  bg-[hsl(var(--nav-theme)/0.2)]
                                  border-2 border-[hsl(var(--nav-theme)/0.5)]
                                  flex items-center justify-center">
                    <span className="font-bold text-[hsl(var(--nav-theme-light))]">#{priority.rank}</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{priority.title}</h4>
                    <p className="text-sm text-muted-foreground">{priority.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 12: Community & Discord */}
      <section id="community-discord" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.community.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.community.subtitle}
            </p>
          </div>

          {/* Community Link Cards */}
          <div className="scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.modules.community.links.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-white/5 border border-border rounded-xl
                             hover:border-[hsl(var(--nav-theme)/0.5)]
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]
                             transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <MessageCircle className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
                    <span className="px-3 py-1 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]
                                   rounded-full text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                      Official
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{link.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm text-[hsl(var(--nav-theme-light))]">
                    Visit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 13: Mods & BepInEx */}
      <section id="mods-bepinex" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.modsBepInEx.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.modsBepInEx.subtitle}
            </p>
          </div>

          {/* Installation Steps */}
          <div className="scroll-reveal mb-8">
            <div className="space-y-4">
              {t.modules.modsBepInEx.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full
                                  bg-[hsl(var(--nav-theme)/0.2)]
                                  border-2 border-[hsl(var(--nav-theme)/0.5)]
                                  flex items-center justify-center">
                    <span className="font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Install Paths */}
          <div className="scroll-reveal mb-8">
            <h3 className="text-2xl font-bold mb-6">Install Paths</h3>
            <div className="space-y-4">
              {t.modules.modsBepInEx.paths.map((path: any, index: number) => (
                <div key={index} className="p-4 bg-white/5 border border-border rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{path.label}</div>
                    <div className="font-mono text-sm">{path.path}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(path.path)}
                    className="flex-shrink-0 p-2 rounded-lg border border-border
                               hover:bg-white/10 transition-colors"
                  >
                    {copiedPath === path.path ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Multiplayer Note */}
          <div className="scroll-reveal">
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2 text-yellow-400">Multiplayer Note</h4>
                  <p className="text-sm text-muted-foreground">{t.modules.modsBepInEx.multiplayerNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 14: Popular Mods */}
      <section id="popular-mods" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.popularMods.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.popularMods.subtitle}
            </p>
          </div>

          {/* Mod Cards */}
          <div className="scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.modules.popularMods.mods.map((mod: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <Star className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                    <div className="flex flex-wrap gap-2">
                      {mod.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-[hsl(var(--nav-theme)/0.1)]
                                                  border border-[hsl(var(--nav-theme)/0.3)]
                                                  rounded text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>
                  {mod.controls && (
                    <div className="space-y-1 mb-3">
                      {mod.controls.map((control: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <kbd className="px-2 py-1 bg-white/10 rounded font-mono text-xs">{control.key}</kbd>
                          <span className="text-muted-foreground">{control.action}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {mod.note && (
                    <p className="text-xs text-yellow-400 mt-2">ℹ️ {mod.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 15: Controller Support */}
      <section id="controller-support" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.controllerSupport.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.controllerSupport.subtitle}
            </p>
          </div>

          {/* Native vs Mod Comparison */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-border rounded-xl">
                <Gamepad2 className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mb-4" />
                <h3 className="text-lg font-bold mb-2">{t.modules.controllerSupport.native.title}</h3>
                <p className="text-sm text-muted-foreground">{t.modules.controllerSupport.native.description}</p>
              </div>
              <div className="p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
                <Star className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mb-4" />
                <h3 className="text-lg font-bold mb-2">{t.modules.controllerSupport.mod.title}</h3>
                <p className="text-sm text-muted-foreground">{t.modules.controllerSupport.mod.description}</p>
              </div>
            </div>
          </div>

          {/* Feature Checklist */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6">Features (Controller Mod)</h3>
            <div className="p-6 bg-white/5 border border-border rounded-xl">
              <ul className="space-y-3">
                {t.modules.controllerSupport.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Module 16: Player Count */}
      <section id="player-count" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.playerCount.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.modules.playerCount.subtitle}
            </p>
          </div>

          {/* Stat Tiles */}
          <div className="scroll-reveal mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(t.modules.playerCount.stats).map((stat: any, index: number) => (
                <div key={index} className="p-8 bg-white/5 border border-border rounded-xl text-center
                                            hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <TrendingUp className="w-8 h-8 text-[hsl(var(--nav-theme-light))] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-[hsl(var(--nav-theme-light))] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold mb-6">Milestones</h3>
            <div className="space-y-4">
              {t.modules.playerCount.milestones.map((milestone: any, index: number) => (
                <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--nav-theme))] mt-2"></div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{milestone.date}</div>
                    <h4 className="font-bold mb-1">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner 2 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/lucidblocks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/lucidblocks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/3495730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/3495730/Lucid_Blocks/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
