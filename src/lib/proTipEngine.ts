import { SportsContentItem } from '../types';

export interface ProTipData {
  title: string;
  category: string;
  stickerRecommendation: {
    name: string;
    description: string;
    placement: string;
    idealZone: string;
    sampleText: string;
  };
  visualGuidance: {
    backgroundAdvice: string;
    typographyAdvice: string;
    contrastTip: string;
  };
  reachAlgorithmBoost: {
    retentionTactic: string;
    expectedMetricLift: string;
    storyFlowTip: string;
  };
  bestPostingWindow: string;
  soundOrMusicRecommendation: string;
}

export function getProTipForContent(item: SportsContentItem): ProTipData {
  const sport = item.sport || 'Sports';

  switch (item.type) {
    case 'mcq':
      return {
        title: 'Quiz Sticker & Two-Slide Reveal Loop',
        category: 'Interactive Trivia',
        stickerRecommendation: {
          name: 'Instagram Quiz Sticker',
          description: 'Place the native Quiz Sticker with 4 options and mark the correct option so Instagram animates green confetti upon tap.',
          placement: 'Center screen (45% - 70% vertical safe zone)',
          idealZone: 'Thumb-reach sweet spot — ensures 1-handed taps without covering player faces',
          sampleText: `Q: ${item.question}\nOptions: A) ${item.options[0]} | B) ${item.options[1]} | C) ${item.options[2]} | D) ${item.options[3]}`,
        },
        visualGuidance: {
          backgroundAdvice: `Use a high-contrast action shot of ${sport} with a 45% dark linear gradient overlay from bottom-to-top.`,
          typographyAdvice: 'Keep the question hook in 28-32pt Bold Classic Font with solid background highlight banner.',
          contrastTip: 'Never place white text over un-darkened stadium floodlights; add a subtle dark vignette around borders.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Two-Slide Story Loop: Do not post the full explanation here. Add a "Swipe to Next Story for Full Breakdown" sticker to double story impressions.',
          expectedMetricLift: '+42% Tap Engagement & +1.8x Story Completion Rate',
          storyFlowTip: 'Post 2-3 quiz stories in sequence before a live match to warm up the story tray algorithm.',
        },
        bestPostingWindow: '1.5 to 2 hours prior to match kickoff or during halftime breaks.',
        soundOrMusicRecommendation: 'Trending sports stadium organ or bass-heavy countdown beat at low volume.',
      };

    case 'true_false':
      return {
        title: 'Polarizing Statement & 2-Option Poll Sticker',
        category: 'Fact-Check & Debate',
        stickerRecommendation: {
          name: 'Instagram 2-Option Poll Sticker (TRUE / FALSE)',
          description: 'Use the native 2-option Poll sticker with custom text "TRUE" (left) vs "FALSE" (right) or emojis "🎯 FACT" vs "🧢 CAP".',
          placement: 'Lower-middle quadrant (60% vertical line)',
          idealZone: 'Directly beneath the bold statement banner to invite immediate binary votes',
          sampleText: `Statement: "${item.statement}"\nPoll: TRUE (Fact) vs FALSE (Cap)`,
        },
        visualGuidance: {
          backgroundAdvice: 'Split or cinematic freeze-frame image with high grain/contrast to give a breaking sports report aesthetic.',
          typographyAdvice: 'Use all-caps for key record stats and highlight controversial numbers in neon yellow/orange.',
          contrastTip: 'Use a dark drop shadow (offset 2px) on headline font to ensure 100% legibility against dynamic backgrounds.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Ask in a small text box below: "Did this record shock you? Drop your reaction in DMs!" Instagram heavily weights story reply DMs for feed ranking.',
          expectedMetricLift: '+65% Reply Rate & High Viral Tray Visibility',
          storyFlowTip: 'Pin the correct source breakdown on the next slide with a verified citation sticker.',
        },
        bestPostingWindow: 'Within 60 minutes of breaking sports news, post-match press conferences, or viral record moments.',
        soundOrMusicRecommendation: 'Dramatic suspense riser sound effect or viral sports podcast audio bite.',
      };

    case 'this_or_that_poll':
      return {
        title: 'Split-Screen Faceoff & Custom Poll Sticker',
        category: 'Fan Tribe Rivalry',
        stickerRecommendation: {
          name: 'Instagram Custom Poll Sticker',
          description: 'Use 2 distinct custom emoji labels or athlete nicknames (e.g., "🐐 GOAT" vs "🔥 BEAST") instead of generic Yes/No.',
          placement: 'Directly on the central dividing seam of the two athletes/teams',
          idealZone: 'Eye-level center (50% vertical) right between comparing graphics',
          sampleText: `Debate: ${item.prompt}\nOption 1: ${item.options[0]} | Option 2: ${item.options[1]}`,
        },
        visualGuidance: {
          backgroundAdvice: '50/50 vertical or diagonal split screen contrasting both players with vivid complementary team jersey colors.',
          typographyAdvice: 'Large versus badge ("VS") in center with high-voltage neon glow or metallic texture.',
          contrastTip: 'Ensure each side features clear high-resolution cutouts with contrasting dark rim-lighting.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Share real-time vote percentage results on your story 4 hours later with an interactive Question Box: "Defend your pick in the box!".',
          expectedMetricLift: '+80% Shareability & +2.5x Story Re-shares to Fan Group Chats',
          storyFlowTip: 'Tag official fan accounts or athlete hashtag communities in micro-text (hidden behind sticker) to trigger discoverability.',
        },
        bestPostingWindow: 'Game day morning (8 AM - 10 AM) or rivalry derby week build-up.',
        soundOrMusicRecommendation: 'Hype athletic walkout song or viral electronic rivalry drop.',
      };

    case 'fill_in_blank':
      return {
        title: '"Add Yours" Sticker / Question Box Prompt',
        category: 'Community Recall & Trivia',
        stickerRecommendation: {
          name: 'Instagram Question Box or "Add Yours" Sticker',
          description: 'Place a Question Sticker titled "Fill in the blank 👇" or use Quiz sticker with multiple choices for quick friction-free guessing.',
          placement: 'Positioned right over the blank line "_____" in the graphic',
          idealZone: 'Upper-middle portion so keyboard pop-up doesn\'t obscure the prompt when users type',
          sampleText: `Fill in the Blank:\n"${item.sentence}"\nAnswer: ${item.correctAnswer}`,
        },
        visualGuidance: {
          backgroundAdvice: 'Moody, dramatic stadium backdrop with warm spotlighting highlighting the subject in action.',
          typographyAdvice: 'Highlight the blank space with a glowing neon underline or pill box to create an optical focal point.',
          contrastTip: 'Use deep navy or slate background (#0f172a) with crisp pure white (#ffffff) lettering for 14:1 contrast ratio.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Repost the first 3 fans who answer correctly to your story with a "@mention" shoutout — this incentivizes rapid notification click-throughs.',
          expectedMetricLift: '+55% DM Conversations & Higher Fan Loyalty',
          storyFlowTip: 'Include a countdown timer to the deadline when answers will be graded.',
        },
        bestPostingWindow: 'Midday lulls (12 PM - 2 PM) or Trivia Tuesday / Flashback Friday slots.',
        soundOrMusicRecommendation: 'Upbeat retro arcade chime or energetic game show background track.',
      };

    case 'guess_the_number':
      return {
        title: 'Emoji Slider Sticker & Tolerance Challenge',
        category: 'Stat Prediction Challenge',
        stickerRecommendation: {
          name: 'Instagram Emoji Slider Sticker (🔥 or 🎯)',
          description: 'Place the Emoji Slider sticker or a Question Box asking fans to predict the exact number.',
          placement: 'Lower-third interactive safe area (65% vertical position)',
          idealZone: 'Comfortable drag zone allowing continuous slider thumb movement across full width',
          sampleText: `Stat Challenge: ${item.question}\nTarget: ${item.targetNumber} ${item.unitLabel || ''} (Tolerance: ±${item.toleranceRange})`,
        },
        visualGuidance: {
          backgroundAdvice: 'Action silhouette or blurred motion backdrop with bold stat infographic overlays.',
          typographyAdvice: 'Render the mystery stat unit (e.g., MPH, GOALS, RUNS) in oversized semi-transparent background watermark lettering.',
          contrastTip: 'Keep central prompt text bounded inside a translucent matte frosted glass banner.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Long Dwell Time Trick: Slider stickers force viewers to hold down the screen for 2-4 seconds, skyrocketing algorithmic dwell time score on Instagram.',
          expectedMetricLift: '+3.4x Average Dwell Time & Priority Ranking in Story Queue',
          storyFlowTip: 'Reward viewers who hit within the ±tolerance range with a digital badge on next slide.',
        },
        bestPostingWindow: 'Pre-game broadcast countdown (30-45 minutes before first whistle).',
        soundOrMusicRecommendation: 'Tension-building drumline cadence or ticking clock soundbed.',
      };

    default:
      return {
        title: 'Interactive Engagement Sticker Boost',
        category: 'Sports Content',
        stickerRecommendation: {
          name: 'Instagram Poll / Quiz Sticker',
          description: 'Use native interactive stickers to trigger one-touch engagement and boost your algorithmic story ranking.',
          placement: 'Center 50% thumb-safe zone',
          idealZone: 'Center screen with minimum 15% top/bottom margin',
          sampleText: 'Tap your choice below!',
        },
        visualGuidance: {
          backgroundAdvice: 'High contrast sports backdrop with dark vignette overlay for legibility.',
          typographyAdvice: 'Bold, legible sans-serif font with high contrast.',
          contrastTip: 'Ensure at least 7:1 contrast ratio between text and background.',
        },
        reachAlgorithmBoost: {
          retentionTactic: 'Prompt viewers to reply in DMs or check the next story for results.',
          expectedMetricLift: '+35% Overall Engagement',
          storyFlowTip: 'Post consistently in 2-3 story batch arcs.',
        },
        bestPostingWindow: 'Matchday evening (6 PM - 9 PM).',
        soundOrMusicRecommendation: 'Trending sports hype audio track.',
      };
  }
}
