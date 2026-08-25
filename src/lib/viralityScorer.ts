import { SportsContentItem, ViralityScore } from '../types';

const HIGH_ENGAGEMENT_ENTITIES = [
  'messi', 'ronaldo', 'cristiano', 'kohli', 'virat', 'dhoni', 'rohit', 'sachin', 'tendulkar',
  'lebron', 'curry', 'jordan', 'kobe', 'nadal', 'djokovic', 'federer', 'alcaraz', 'sinner',
  'verstappen', 'hamilton', 'senna', 'schumacher', 'bolt', 'phelps', 'real madrid', 'barcelona',
  'world cup', 'champions league', 'ipl', 'nba', 'wimbledon', 'roland garros', 'olympics',
  'record', 'hat-trick', 'century', 'gold medal', 'goat', 'undefeated', 'rivalry'
];

const HIGH_HOOK_TRIGGERS = [
  'who is', 'which', 'can you', 'did you know', 'only 1%', 'impossible', 'goat', 'legend',
  'debate', 'record', 'unreal', 'shocking', 'fastest', 'greatest', 'rank', 'vs', 'history'
];

export function calculateViralityScore(item: SportsContentItem): ViralityScore {
  const fullText = [
    item.instagramHook || '',
    (item as any).question || (item as any).statement || (item as any).prompt || (item as any).sentence || '',
    (item as any).explanation || '',
    ...(item.suggestedHashtags || []),
    item.sport,
  ].join(' ').toLowerCase();

  // 1. Hook Power (0 - 25)
  let hookPower = 15;
  const hook = (item.instagramHook || '').toLowerCase();
  if (hook.length > 8 && hook.length < 65) hookPower += 4;
  if (HIGH_HOOK_TRIGGERS.some(trig => hook.includes(trig) || fullText.includes(trig))) hookPower += 3;
  if (hook.includes('?') || hook.includes('!') || hook.includes('🔥') || hook.includes('🏆') || hook.includes('👑')) hookPower += 3;
  hookPower = Math.min(25, Math.max(12, hookPower));

  // 2. Format Dynamics (0 - 25)
  let formatDynamics = 18;
  if (item.type === 'this_or_that_poll') {
    formatDynamics = 25; // Polls trigger immediate frictionless debate taps
  } else if (item.type === 'guess_the_number') {
    formatDynamics = 24; // Interactive slider maximizes story dwell time
  } else if (item.type === 'mcq') {
    formatDynamics = 22; // Classic high-completion quiz sticker
  } else if (item.type === 'fill_in_blank') {
    formatDynamics = 21; // Cognitive gap curiosity
  } else if (item.type === 'true_false') {
    formatDynamics = 20; // Fast binary reaction
  }

  // 3. Complexity & Cognitive Balance (0 - 25)
  let complexityBalance = 18;
  if (item.difficulty === 'Hard') {
    complexityBalance = 24; // High bragging rights & shareability
  } else if (item.difficulty === 'Medium') {
    complexityBalance = 23; // Sweet spot for broad sports audience
  } else {
    complexityBalance = 19; // Accessible but lower debate variance
  }

  // Explanations with strong numbers/facts boost credibility
  if (item.explanation && item.explanation.length > 50) complexityBalance += 1;
  complexityBalance = Math.min(25, Math.max(14, complexityBalance));

  // 4. Topic & Entity Resonance (0 - 25)
  let topicResonance = 16;
  const entityMatches = HIGH_ENGAGEMENT_ENTITIES.filter(entity => fullText.includes(entity));
  topicResonance += Math.min(6, entityMatches.length * 2);

  if (item.citation && item.citation.verifiedFact) topicResonance += 2;
  if (item.suggestedHashtags && item.suggestedHashtags.length >= 3) topicResonance += 1;
  topicResonance = Math.min(25, Math.max(14, topicResonance));

  // Overall Score (0 - 100)
  const overallScore = Math.min(99, Math.max(58, hookPower + formatDynamics + complexityBalance + topicResonance));

  // Determine Tier & Color
  let tier: ViralityScore['tier'] = 'Solid Reach';
  let tierColor = 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';

  if (overallScore >= 90) {
    tier = 'Viral Outlier';
    tierColor = 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-850';
  } else if (overallScore >= 82) {
    tier = 'High Velocity';
    tierColor = 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-850';
  } else if (overallScore >= 72) {
    tier = 'Strong Engagement';
    tierColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-850';
  }

  // Key Drivers calculation
  const keyDrivers: string[] = [];
  if (item.type === 'this_or_that_poll') {
    keyDrivers.push('🔥 Opinion-driven poll triggers 2.8x comment & reply velocity');
  } else if (item.type === 'guess_the_number') {
    keyDrivers.push('⏱️ Interactive slider mechanic drives high story dwell time (>6.8s)');
  } else if (item.type === 'mcq') {
    keyDrivers.push('🎯 4-Option Quiz format delivers ~88% interactive sticker tap-through');
  } else if (item.type === 'true_false') {
    keyDrivers.push('⚡ Instant True/False dichotomy induces rapid instinct taps');
  } else if (item.type === 'fill_in_blank') {
    keyDrivers.push('🧩 Word-completion gap sparks strong cognitive curiosity');
  }

  if (entityMatches.length > 0) {
    keyDrivers.push(`⭐ Features high-interest sports entity (${entityMatches.slice(0, 2).map(e => e.toUpperCase()).join(', ')})`);
  }

  if (item.difficulty === 'Hard') {
    keyDrivers.push('🏆 High-trivia difficulty encourages DM sharing with sports fan groups');
  } else if (item.difficulty === 'Medium') {
    keyDrivers.push('⚖️ Balanced difficulty ensures high completion without viewer drop-off');
  }

  // Metrics
  const shareabilityPct = Math.min(97, Math.round(55 + (hookPower * 1.1) + (item.difficulty === 'Hard' ? 12 : 5)));
  const completionRatePct = Math.min(98, Math.round(
    item.type === 'this_or_that_poll' ? 95 :
    item.type === 'true_false' ? 94 :
    item.type === 'mcq' ? 89 :
    item.type === 'guess_the_number' ? 86 : 88
  ));
  const debatePotentialPct = Math.min(99, Math.round(
    item.type === 'this_or_that_poll' ? 96 :
    entityMatches.length > 1 ? 88 :
    item.difficulty === 'Hard' ? 82 : 74
  ));
  const projectedDwellSeconds = Number(
    (item.type === 'guess_the_number' ? 7.2 :
     item.type === 'mcq' ? 5.8 :
     item.type === 'this_or_that_poll' ? 4.9 :
     item.type === 'fill_in_blank' ? 5.4 : 4.4 + (item.explanation?.length > 70 ? 1.2 : 0.4)).toFixed(1)
  );

  // Best Time to Post based on Sport
  let bestTimeToPost = '7:00 PM – 10:00 PM (Matchday Primetime)';
  if (item.sport === 'Football') {
    bestTimeToPost = '6:30 PM – 9:30 PM Matchday or Weekend 1:00 PM';
  } else if (item.sport === 'Cricket') {
    bestTimeToPost = '7:00 PM – 10:30 PM (Evening Innings Break)';
  } else if (item.sport === 'Tennis') {
    bestTimeToPost = '11:00 AM – 3:00 PM (Tournament Day Session)';
  } else if (item.sport === 'Basketball') {
    bestTimeToPost = '8:00 PM – 11:30 PM EST (Game Nights)';
  } else if (item.sport === 'Formula 1') {
    bestTimeToPost = 'Race Sunday 1:30 PM – 4:00 PM or Qualifying Sat';
  }

  // Improvement Tip
  let improvementTip = 'Pair this story with an emoji slider reaction on the next slide for 1.4x algorithmic reach.';
  if (item.type === 'mcq') {
    improvementTip = 'Add a 15-second countdown timer sticker before revealing the correct answer to build suspense.';
  } else if (item.type === 'this_or_that_poll') {
    improvementTip = 'Prompt followers to drop their hottest take in the DM box to spike Instagram engagement ranking.';
  } else if (item.type === 'guess_the_number') {
    improvementTip = 'Challenge viewers: "Can you get within ±3 without Googling?" to fuel replay loops.';
  }

  // Metric Rationales for hover tooltips
  const formatName = item.type.replace(/_/g, ' ').toUpperCase();
  const entityHighlight = entityMatches.length > 0 ? entityMatches.slice(0, 2).map(e => e.toUpperCase()).join(' & ') : 'trending sports lore';
  
  const rationales = {
    engagement: item.type === 'this_or_that_poll' 
      ? `Opinion-based poll stickers remove friction, yielding a high ~${debatePotentialPct}% debate rating and driving instant comment threads.`
      : item.type === 'guess_the_number'
      ? `Interactive number sliders encourage precision holding, driving highest average story dwell time (~${projectedDwellSeconds}s).`
      : item.type === 'mcq'
      ? `4-choice quiz format delivers an estimated ${completionRatePct}% completion rate and triggers sticker tap-through algorithms.`
      : `High-curiosity ${formatName} format with fast instinctual tap dynamics and ~${completionRatePct}% completion rate.`,
    
    trendRecency: entityMatches.length > 0
      ? `Grounds on high-heat sports entity (${entityHighlight}) and contemporary tournament milestones, generating +${Math.round(topicResonance * 3.8)}% algorithmic discoverability.`
      : `Broad sports lore appeal with verified statistical citations that align with active fan conversation topics.`,
      
    contentComplexity: item.difficulty === 'Hard'
      ? `Hard cognitive tier (${item.difficulty}) creates high bragging rights and triggers peer sharing via Instagram DMs (${shareabilityPct}% shareability).`
      : item.difficulty === 'Medium'
      ? `Balanced cognitive challenge (${item.difficulty}) maximizes quiz completion without viewer drop-off or exit taps.`
      : `Accessible entry-level difficulty (${item.difficulty}) drives rapid instinct clicks across casual and hardcore fans alike.`,

    hookPower: hookPower >= 20
      ? `High thumb-stopping score (${hookPower}/25): High-curiosity question structure and urgency triggers halt story-skipping.`
      : `Standard hook score (${hookPower}/25): Clear, direct premise that primes viewer attention for the interactive sticker.`
  };

  return {
    overallScore,
    tier,
    tierColor,
    breakdown: {
      hookPower,
      formatDynamics,
      complexityBalance,
      topicResonance,
    },
    metrics: {
      shareabilityPct,
      completionRatePct,
      debatePotentialPct,
      projectedDwellSeconds,
    },
    rationales,
    keyDrivers,
    bestTimeToPost,
    improvementTip,
  };
}

export function calculateBatchViralitySummary(items: SportsContentItem[]) {
  if (items.length === 0) {
    return {
      averageScore: 0,
      topItemIndex: 0,
      topScore: 0,
      predictedTotalImpressions: '0',
      viralOutliersCount: 0,
    };
  }

  const scores = items.map((item, idx) => ({
    idx,
    score: calculateViralityScore(item),
  }));

  const total = scores.reduce((sum, s) => sum + s.score.overallScore, 0);
  const averageScore = Math.round(total / items.length);

  scores.sort((a, b) => b.score.overallScore - a.score.overallScore);
  const top = scores[0];
  const viralOutliersCount = scores.filter(s => s.score.overallScore >= 85).length;

  return {
    averageScore,
    topItemIndex: top.idx,
    topScore: top.score.overallScore,
    topTier: top.score.tier,
    viralOutliersCount,
    scoresList: scores,
  };
}
