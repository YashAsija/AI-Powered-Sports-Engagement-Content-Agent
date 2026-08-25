export type SportType = 
  | 'Cricket'
  | 'Football'
  | 'Tennis'
  | 'Badminton'
  | 'Basketball'
  | 'Formula 1'
  | 'Athletics & Olympics'
  | 'Custom';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type ContentFormatType = 
  | 'mcq'
  | 'true_false'
  | 'this_or_that_poll'
  | 'fill_in_blank'
  | 'guess_the_number'
  | 'mixed_batch';

export type GroundingSourceType = 'web_search' | 'vector_db' | 'hybrid' | 'opinion_unverified';

export interface GroundingCitation {
  sourceType: GroundingSourceType;
  sourceTitle: string;
  sourceUrl?: string;
  sourceSnippet?: string;
  vectorSimilarity?: number;
  retrievalTimestamp: string;
  verifiedFact: boolean;
}

export interface BaseContentItem {
  id: string;
  sport: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: ContentFormatType;
  citation: GroundingCitation;
  instagramHook?: string;
  suggestedHashtags?: string[];
  createdAt: number;
}

export interface MCQContentItem extends BaseContentItem {
  type: 'mcq';
  question: string;
  options: [string, string, string, string]; // exactly 4
  correctAnswer: string; // matches one of options
  explanation: string;
}

export interface TrueFalseContentItem extends BaseContentItem {
  type: 'true_false';
  statement: string;
  correctAnswer: boolean; // true or false
  explanation: string;
}

export interface PollContentItem extends BaseContentItem {
  type: 'this_or_that_poll';
  prompt: string;
  options: [string, string]; // exactly 2
  isOpinionBased: true;
  engagementContext: string;
  explanation?: string;
}

export interface FillInBlankContentItem extends BaseContentItem {
  type: 'fill_in_blank';
  sentence: string; // contains '_____'
  options: [string, string, string, string]; // exactly 4
  correctAnswer: string;
  explanation: string;
}

export interface GuessTheNumberContentItem extends BaseContentItem {
  type: 'guess_the_number';
  question: string;
  targetNumber: number;
  toleranceRange: number; // e.g. 5 means targetNumber ± 5
  unitLabel?: string; // e.g. "runs", "goals", "mph", "titles"
  explanation: string;
}

export type SportsContentItem = 
  | MCQContentItem
  | TrueFalseContentItem
  | PollContentItem
  | FillInBlankContentItem
  | GuessTheNumberContentItem;

export interface BatchGenerationRequest {
  sport: string;
  difficulty: DifficultyLevel;
  contentType: ContentFormatType;
  batchSize: number; // 4 to 5
  topicFocus?: string; // e.g. "2024 IPL finals", "Champions League records", "Wimbledon history"
  useWebSearch: boolean;
  useVectorDB: boolean;
  recencyFilter?: 'all_time' | 'last_30_days' | 'current_season' | 'historical_records';
  previousQuestions?: string[]; // for deduplication
}

export interface BatchGenerationResponse {
  batchId: string;
  items: SportsContentItem[];
  metadata: {
    sport: string;
    difficulty: DifficultyLevel;
    topicFocus?: string;
    contentType?: ContentFormatType;
    timestamp: string;
    webSearchGroundingUsed: boolean;
    vectorKnowledgeUsed: boolean;
    totalGenerated: number;
    validatedCount: number;
    executionTimeMs: number;
  };
}

export interface VectorFactDocument {
  id: string;
  sport: string;
  category: 'records' | 'tournaments' | 'rules' | 'milestones' | 'biographies';
  factTitle: string;
  factSnippet: string;
  era: string;
  keywords: string[];
  sourceReference: string;
}

export interface SharedSessionData {
  id: string;
  sport: string;
  items: SportsContentItem[];
  metadata?: BatchGenerationResponse['metadata'] | null;
  createdAt: number;
  title?: string;
}

export interface ViralityScore {
  overallScore: number; // 0 to 100
  tier: 'Viral Outlier' | 'High Velocity' | 'Strong Engagement' | 'Solid Reach';
  tierColor: string;
  breakdown: {
    hookPower: number; // 0 to 25
    formatDynamics: number; // 0 to 25
    complexityBalance: number; // 0 to 25
    topicResonance: number; // 0 to 25
  };
  metrics: {
    shareabilityPct: number; // e.g. 88%
    completionRatePct: number; // e.g. 92%
    debatePotentialPct: number; // e.g. 95%
    projectedDwellSeconds: number; // e.g. 6.4s
  };
  rationales: {
    engagement: string; // Explains format engagement & tap mechanic
    trendRecency: string; // Explains topic recency, entity resonance, and tournament relevancy
    contentComplexity: string; // Explains cognitive difficulty balance vs audience drop-off
    hookPower: string; // Explains first-line trigger and thumb-stopping power
  };
  keyDrivers: string[];
  bestTimeToPost: string;
  improvementTip: string;
}

