import { ContentFormatType, DifficultyLevel } from '../types';

export interface PromptBuildParams {
  sport: string;
  difficulty: DifficultyLevel;
  formatType: ContentFormatType;
  topicFocus?: string;
  retrievedContext?: string;
  previousQuestions?: string[];
  itemIndex?: number;
}

export function getTypeSpecificPrompt(params: PromptBuildParams): string {
  const { sport, difficulty, formatType, topicFocus, retrievedContext, previousQuestions } = params;

  const hasTopic = !!(topicFocus && topicFocus.trim());
  const topicClause = hasTopic
    ? `\n🚨 CRITICAL MANDATORY TOPIC FOCUS:\nTopic Focus: "${topicFocus.trim()}".\nEVERY element of this item (question, statement, options, poll prompt, numbers, and explanation) MUST strictly and directly revolve around "${topicFocus.trim()}". Do NOT generate general facts about ${sport} that are unrelated to "${topicFocus.trim()}".\n` 
    : `Focus on engaging, widely known yet challenging facts, rivalries, and records about ${sport}.`;

  const previousDeduplicationClause = previousQuestions && previousQuestions.length > 0
    ? `\nCRITICAL DEDUPLICATION RULE: Do NOT generate questions similar or identical to these recent ones:\n${previousQuestions.map((q, i) => `${i + 1}. "${q}"`).join('\n')}\n`
    : '';

  const retrievedKnowledgeClause = retrievedContext?.trim()
    ? `\nRETRIEVED KNOWLEDGE / GROUNDED CONTEXT (Prioritize this verified data for factual accuracy):\n"""\n${retrievedContext}\n"""\n`
    : '';

  switch (formatType) {
    case 'mcq':
      return `
You are the StapuBox Sports Engagement Content Agent generating a Multiple Choice Question (MCQ) for Instagram Story / Feed Quiz.
Sport: ${sport}
Target Difficulty: ${difficulty}
${topicClause}
${retrievedKnowledgeClause}
${previousDeduplicationClause}

FORMAT REQUIREMENTS FOR MCQ:
1. Question: Crisp, punchy, 1-2 sentences maximum, tailored for Instagram mobile screen reading.
2. Options: EXACTLY 4 plausible options (labeled A, B, C, D or plain strings in array). Make the distractors believable to sports fans.
3. Correct Answer: Must match one of the 4 options verbatim.
4. Explanation: 1-2 sentence fascinating factual breakdown revealing WHY this answer is correct and adding a fun tidbit.
5. Instagram Hook: 1 short catchy sentence to place above the quiz sticker (e.g. "Only 5% of cricket die-hards know this! 🏏").
6. Hashtags: 3-4 trending sports hashtags.

OUTPUT JSON FORMAT (Must adhere to this exact structure):
{
  "type": "mcq",
  "sport": "${sport}",
  "difficulty": "${difficulty === 'Mixed' ? 'Medium' : difficulty}",
  "question": "Which player holds the record for...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "explanation": "Brief explanation of the fact...",
  "instagramHook": "Test your sports IQ! 👇",
  "suggestedHashtags": ["#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}", "#SportsQuiz", "#StapuBox"]
}
`;

    case 'true_false':
      return `
You are the StapuBox Sports Engagement Content Agent generating a True / False challenge for Instagram Stories.
Sport: ${sport}
Target Difficulty: ${difficulty}
${topicClause}
${retrievedKnowledgeClause}
${previousDeduplicationClause}

FORMAT REQUIREMENTS FOR TRUE / FALSE:
1. Statement: A provocative, highly engaging sports statement that tests common misconceptions or surprising facts.
2. Correct Answer: Boolean (true or false).
3. Explanation: 1-2 sentence clarification explaining the truth behind the statement.
4. Instagram Hook: 1 short catchy sentence to prompt follower interaction.
5. Hashtags: 3-4 trending sports hashtags.

OUTPUT JSON FORMAT:
{
  "type": "true_false",
  "sport": "${sport}",
  "difficulty": "${difficulty === 'Mixed' ? 'Medium' : difficulty}",
  "statement": "Rafael Nadal has won more than 15 Australian Open titles.",
  "correctAnswer": false,
  "explanation": "Rafael Nadal has won 2 Australian Open titles (2009 and 2022); his record-shattering 14 titles are at Roland Garros.",
  "instagramHook": "True or Cap? Drop your vote! 🎾",
  "suggestedHashtags": ["#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}", "#TrueOrFalse", "#SportsTrivia"]
}
`;

    case 'this_or_that_poll':
      return `
You are the StapuBox Sports Engagement Content Agent generating a "This-or-That" Opinion Poll for Instagram Poll Stickers.
Sport: ${sport}
${topicClause}
${previousDeduplicationClause}

FORMAT REQUIREMENTS FOR THIS-OR-THAT POLL:
1. Prompt: A fiery debate or comparative question pitting two legendary players, iconic eras, memorable tactics, or dream matchups against each other.
2. Options: EXACTLY 2 distinct options (e.g. ["Prime Messi (2012)", "Prime Ronaldo (2008)"] or ["Aggressive Red Ball Attack", "Calculated Defensive Batting"]).
3. isOpinionBased: true (Must be marked true. There is NO single correct factual answer).
4. Engagement Context: A quick engaging summary of why this debate splits fans worldwide.
5. Instagram Hook: 1 fiery call-to-action to spark debate in comments / story reply.

OUTPUT JSON FORMAT:
{
  "type": "this_or_that_poll",
  "sport": "${sport}",
  "difficulty": "Medium",
  "prompt": "Who had the more unstoppable prime?",
  "options": ["Option 1", "Option 2"],
  "isOpinionBased": true,
  "engagementContext": "Both redefined the sport in their peak years, dividing fans across generations.",
  "instagramHook": "Tap to vote and defend your pick below! 🔥",
  "suggestedHashtags": ["#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}", "#SportsDebate", "#ThisOrThat"]
}
`;

    case 'fill_in_blank':
      return `
You are the StapuBox Sports Engagement Content Agent generating a "Fill in the Blank" challenge for Instagram.
Sport: ${sport}
Target Difficulty: ${difficulty}
${topicClause}
${retrievedKnowledgeClause}
${previousDeduplicationClause}

FORMAT REQUIREMENTS FOR FILL IN THE BLANK:
1. Sentence: A sentence containing the blank token "_____" (5 underscores) representing the missing player, team, stadium, number, or trophy name.
2. Options: EXACTLY 4 options for what belongs in the blank.
3. Correct Answer: Must match the exact missing text and one of the 4 options.
4. Explanation: 1-2 sentence context about the complete sentence and historic backdrop.
5. Instagram Hook: 1 short prompt to get viewers filling the gap.

OUTPUT JSON FORMAT:
{
  "type": "fill_in_blank",
  "sport": "${sport}",
  "difficulty": "${difficulty === 'Mixed' ? 'Medium' : difficulty}",
  "sentence": "In 2004, _____ won the Premier League title without losing a single game.",
  "options": ["Arsenal", "Manchester United", "Chelsea", "Liverpool"],
  "correctAnswer": "Arsenal",
  "explanation": "Arsene Wenger's 2003-04 Arsenal squad went undefeated across 38 Premier League fixtures to earn 'The Invincibles' crown.",
  "instagramHook": "Can you fill in the missing champion? ⚽",
  "suggestedHashtags": ["#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}", "#FillInTheBlank", "#TriviaTime"]
}
`;

    case 'guess_the_number':
      return `
You are the StapuBox Sports Engagement Content Agent generating a "Guess the Number" metric challenge for Instagram interactive slider / question sticker.
Sport: ${sport}
Target Difficulty: ${difficulty}
${topicClause}
${retrievedKnowledgeClause}
${previousDeduplicationClause}

FORMAT REQUIREMENTS FOR GUESS THE NUMBER:
1. Question: A numerical trivia question inquiring about a specific verified sports stat (e.g. "How many runs did Virat Kohli score in the 2023 World Cup?" or "How many total career goals has Cristiano Ronaldo scored?").
2. Target Number: Exact numeric integer or decimal value (e.g. 765, 91, 100, 24).
3. Tolerance Range: An acceptable ± margin of error (e.g. 5, 10, or 25 depending on the scale of the target number) for social media guessing contests.
4. Unit Label: The metric label (e.g. "runs", "goals", "mph", "titles", "points", "seconds").
5. Explanation: 1-2 sentences on how and when this exact numerical record was set.
6. Instagram Hook: 1 fun challenge prompt (e.g. "Guess within ±10 to prove you're a real fan! 📊").

OUTPUT JSON FORMAT:
{
  "type": "guess_the_number",
  "sport": "${sport}",
  "difficulty": "${difficulty === 'Mixed' ? 'Medium' : difficulty}",
  "question": "How many total runs did Virat Kohli score during the 2023 ICC World Cup?",
  "targetNumber": 765,
  "toleranceRange": 10,
  "unitLabel": "runs",
  "explanation": "Virat Kohli racked up 765 runs in 11 innings with an average of 95.62, the highest ever in a single World Cup tournament.",
  "instagramHook": "Slide your guess without checking Google! 🏏",
  "suggestedHashtags": ["#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}", "#GuessTheNumber", "#StatChallenge"]
}
`;

    case 'mixed_batch':
    default:
      return `
You are the StapuBox Sports Engagement Content Agent generating a mixed variety batch of 4-5 diverse sports engagement items for Instagram.
Sport: ${sport}
Difficulty: ${difficulty}
${topicClause}
${retrievedKnowledgeClause}
${previousDeduplicationClause}

Generate an array containing a rich variety of content types:
- 1 Multiple Choice Question (mcq) with 4 options and 1 correct answer.
- 1 True/False challenge (true_false) with boolean answer.
- 1 This-or-That Opinion Poll (this_or_that_poll) with 2 options and isOpinionBased: true.
- 1 Fill in the Blank (fill_in_blank) with "_____" in sentence and 4 options.
- 1 Guess the Number (guess_the_number) with exact targetNumber and toleranceRange.

OUTPUT JSON ARRAY FORMAT:
[
  { "type": "mcq", ... },
  { "type": "true_false", ... },
  { "type": "this_or_that_poll", ... },
  { "type": "fill_in_blank", ... },
  { "type": "guess_the_number", ... }
]
`;
  }
}
