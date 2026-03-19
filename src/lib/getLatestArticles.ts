import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { ContentItem, Language } from '@/lib/content'

export interface ContentItemWithType extends ContentItem {
  contentType: string
}

/**
 * 根据 Lucid Blocks 玩家热度计算文章权重
 * 基于搜索结果分析的热门话题优先级
 */
function calculatePopularityScore(article: ContentItemWithType): number {
  let score = 0
  const title = article.frontmatter.title.toLowerCase()
  const description = article.frontmatter.description?.toLowerCase() || ''
  const contentType = article.contentType

  // 内容类型基础权重
  const typeWeights: Record<string, number> = {
    'crafting': 100,  // 合成系统最热门
    'guides': 90,     // 新手指南次之
    'items': 70,      // 工具和物品
    'building': 60,   // 建造系统
    'biomes': 50,     // 探索和地图
    'support': 30,    // 支持和FAQ
  }
  score += typeWeights[contentType] || 0

  // 关键词权重（基于热门话题）
  const keywordWeights: Record<string, number> = {
    // 核心机制（最高优先级）
    'apotheosis': 50,
    'crafting': 45,
    'recipe': 40,

    // 新手内容
    'beginner': 35,
    'starter': 35,
    'getting started': 35,
    'first': 30,
    'early': 30,

    // 成就和完成度
    'achievement': 38,
    '100%': 38,
    'complete': 35,

    // 重要系统
    'tiamana': 32,
    'leyline': 32,
    'clonaqualia': 30,
    'base building': 28,

    // 工具和装备
    'glider': 25,
    'hookshot': 25,
    'grappling': 25,
    'tools': 25,
    'weapons': 25,

    // 战斗和生存
    'combat': 22,
    'survival': 22,
    'boss': 20,

    // 探索
    'exploration': 18,
    'world': 18,
    'biome': 18,
  }

  // 检查标题和描述中的关键词
  for (const [keyword, weight] of Object.entries(keywordWeights)) {
    if (title.includes(keyword)) {
      score += weight * 1.5  // 标题中的关键词权重更高
    } else if (description.includes(keyword)) {
      score += weight
    }
  }

  return score
}

/**
 * 获取最新文章（服务器端）
 * @param locale 语言
 * @param max 最大数量
 * @returns 排序后的文章列表
 */
export async function getLatestArticles(
  locale: Language,
  max: number = 15
): Promise<ContentItemWithType[]> {
  // 获取所有内容类型的文章
  const allArticles: ContentItemWithType[] = []

  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    // 为每个 item 添加 contentType 字段
    allArticles.push(...items.map(item => ({ ...item, contentType })))
  }

  // 智能排序逻辑
  allArticles.sort((a, b) => {
    // 1. 首先按日期排序（最新的在前）
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0

    if (dateA !== dateB) {
      return dateB - dateA
    }

    // 2. 日期相同时，按热度权重排序
    const scoreA = calculatePopularityScore(a)
    const scoreB = calculatePopularityScore(b)

    if (scoreA !== scoreB) {
      return scoreB - scoreA
    }

    // 3. 权重相同时，按标题字母顺序
    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })

  // 取前 max 篇
  return allArticles.slice(0, max)
}
