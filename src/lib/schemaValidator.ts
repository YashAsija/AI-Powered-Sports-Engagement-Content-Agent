import { 
  SportsContentItem, 
  MCQContentItem, 
  TrueFalseContentItem, 
  PollContentItem, 
  FillInBlankContentItem, 
  GuessTheNumberContentItem,
  GroundingCitation 
} from '../types';

export interface ValidationResult {
  valid: boolean;
  sanitizedItem?: SportsContentItem;
  errors: string[];
}

export function validateAndSanitizeSportsItem(rawItem: any, fallbackCitation?: GroundingCitation): ValidationResult {
  const errors: string[] = [];

  if (!rawItem || typeof rawItem !== 'object') {
    return { valid: false, errors: ['Item is not an object'] };
  }

  const id = rawItem.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const sport = (rawItem.sport && typeof rawItem.sport === 'string' && rawItem.sport.trim()) || 'Sports';
  const difficulty = (['Easy', 'Medium', 'Hard'].includes(rawItem.difficulty)) ? rawItem.difficulty : 'Medium';
  const type = rawItem.type;
  const instagramHook = typeof rawItem.instagramHook === 'string' ? rawItem.instagramHook.trim() : undefined;
  const suggestedHashtags = Array.isArray(rawItem.suggestedHashtags) 
    ? rawItem.suggestedHashtags.filter((h: any) => typeof h === 'string' && h.startsWith('#'))
    : [`#${sport.toLowerCase().replace(/[^a-z0-9]/g, '')}`, '#SportsTrivia', '#StapuBox'];

  const citation: GroundingCitation = rawItem.citation || fallbackCitation || {
    sourceType: type === 'this_or_that_poll' ? 'opinion_unverified' : 'web_search',
    sourceTitle: type === 'this_or_that_poll' ? 'Editorial Opinion Prompt' : 'Verified Sports Database',
    retrievalTimestamp: new Date().toISOString(),
    verifiedFact: type !== 'this_or_that_poll'
  };

  const createdAt = typeof rawItem.createdAt === 'number' ? rawItem.createdAt : Date.now();

  // 1. MCQ Validation
  if (type === 'mcq') {
    const question = typeof rawItem.question === 'string' ? rawItem.question.trim() : '';
    if (!question) errors.push('MCQ question is required');

    let options = Array.isArray(rawItem.options) ? rawItem.options.map(String).map(s => s.trim()) : [];
    if (options.length !== 4) {
      // If we have fewer than 4 or more, sanitize
      if (options.length < 4) {
        errors.push(`MCQ requires exactly 4 options (found ${options.length})`);
      } else {
        options = options.slice(0, 4);
      }
    }

    let correctAnswer = typeof rawItem.correctAnswer === 'string' ? rawItem.correctAnswer.trim() : '';
    if (!correctAnswer) {
      errors.push('MCQ correct answer is required');
    } else if (!options.includes(correctAnswer)) {
      // Check if it's "A", "B", "C", "D" or index
      const letterIndex = ['a', 'b', 'c', 'd', 'option a', 'option b', 'option c', 'option d'].indexOf(correctAnswer.toLowerCase());
      if (letterIndex >= 0 && options[letterIndex % 4]) {
        correctAnswer = options[letterIndex % 4];
      } else {
        // Match closest or default to first if not matched
        const matched = options.find(o => o.toLowerCase().includes(correctAnswer.toLowerCase()) || correctAnswer.toLowerCase().includes(o.toLowerCase()));
        if (matched) {
          correctAnswer = matched;
        } else if (options.length > 0) {
          options[0] = correctAnswer;
        }
      }
    }

    const explanation = typeof rawItem.explanation === 'string' ? rawItem.explanation.trim() : `The verified correct answer is ${correctAnswer}.`;

    if (errors.length === 0 && options.length === 4) {
      const sanitized: MCQContentItem = {
        id,
        sport,
        difficulty,
        type: 'mcq',
        question,
        options: [options[0], options[1], options[2], options[3]],
        correctAnswer,
        explanation,
        citation,
        instagramHook,
        suggestedHashtags,
        createdAt
      };
      return { valid: true, sanitizedItem: sanitized, errors: [] };
    }
  }

  // 2. True / False Validation
  else if (type === 'true_false') {
    const statement = typeof rawItem.statement === 'string' 
      ? rawItem.statement.trim() 
      : (typeof rawItem.question === 'string' ? rawItem.question.trim() : '');
    if (!statement) errors.push('True/False statement is required');

    let correctAnswer: boolean;
    if (typeof rawItem.correctAnswer === 'boolean') {
      correctAnswer = rawItem.correctAnswer;
    } else if (typeof rawItem.correctAnswer === 'string') {
      correctAnswer = rawItem.correctAnswer.toLowerCase().includes('true');
    } else {
      correctAnswer = true;
    }

    const explanation = typeof rawItem.explanation === 'string' 
      ? rawItem.explanation.trim() 
      : `Statement is ${correctAnswer ? 'TRUE' : 'FALSE'}.`;

    if (errors.length === 0) {
      const sanitized: TrueFalseContentItem = {
        id,
        sport,
        difficulty,
        type: 'true_false',
        statement,
        correctAnswer,
        explanation,
        citation,
        instagramHook,
        suggestedHashtags,
        createdAt
      };
      return { valid: true, sanitizedItem: sanitized, errors: [] };
    }
  }

  // 3. This-or-That Poll Validation
  else if (type === 'this_or_that_poll') {
    const prompt = typeof rawItem.prompt === 'string' 
      ? rawItem.prompt.trim() 
      : (typeof rawItem.question === 'string' ? rawItem.question.trim() : '');
    if (!prompt) errors.push('Poll prompt is required');

    let options = Array.isArray(rawItem.options) ? rawItem.options.map(String).map(s => s.trim()) : [];
    if (options.length !== 2) {
      if (options.length > 2) {
        options = options.slice(0, 2);
      } else if (options.length === 1) {
        options.push('Alternative Option');
      } else {
        options = ['Option A', 'Option B'];
      }
    }

    const engagementContext = typeof rawItem.engagementContext === 'string' 
      ? rawItem.engagementContext.trim() 
      : 'Fan debate with no single correct answer.';

    const sanitized: PollContentItem = {
      id,
      sport,
      difficulty,
      type: 'this_or_that_poll',
      prompt,
      options: [options[0], options[1]],
      isOpinionBased: true,
      engagementContext,
      explanation: typeof rawItem.explanation === 'string' ? rawItem.explanation : undefined,
      citation: {
        sourceType: 'opinion_unverified',
        sourceTitle: 'StapuBox Editorial Engagement Engine (Opinion-Based)',
        retrievalTimestamp: new Date().toISOString(),
        verifiedFact: false
      },
      instagramHook,
      suggestedHashtags,
      createdAt
    };
    return { valid: true, sanitizedItem: sanitized, errors: [] };
  }

  // 4. Fill in the Blank Validation
  else if (type === 'fill_in_blank') {
    let sentence = typeof rawItem.sentence === 'string' ? rawItem.sentence.trim() : '';
    if (!sentence && typeof rawItem.question === 'string') {
      sentence = rawItem.question.trim();
    }
    if (!sentence) {
      errors.push('Fill-in-the-blank sentence is required');
    } else if (!sentence.includes('_____') && !sentence.includes('___') && !sentence.includes('[blank]')) {
      // Add blank token if missing
      sentence = sentence + ' (Answer: _____)';
    }

    let options = Array.isArray(rawItem.options) ? rawItem.options.map(String).map(s => s.trim()) : [];
    if (options.length !== 4) {
      if (options.length > 4) {
        options = options.slice(0, 4);
      } else {
        errors.push(`Fill in the blank requires 4 options (found ${options.length})`);
      }
    }

    let correctAnswer = typeof rawItem.correctAnswer === 'string' ? rawItem.correctAnswer.trim() : '';
    if (!correctAnswer && options.length > 0) {
      correctAnswer = options[0];
    } else if (!options.includes(correctAnswer) && options.length > 0) {
      options[0] = correctAnswer;
    }

    const explanation = typeof rawItem.explanation === 'string' ? rawItem.explanation.trim() : `The blank is filled by ${correctAnswer}.`;

    if (errors.length === 0 && options.length === 4) {
      const sanitized: FillInBlankContentItem = {
        id,
        sport,
        difficulty,
        type: 'fill_in_blank',
        sentence,
        options: [options[0], options[1], options[2], options[3]],
        correctAnswer,
        explanation,
        citation,
        instagramHook,
        suggestedHashtags,
        createdAt
      };
      return { valid: true, sanitizedItem: sanitized, errors: [] };
    }
  }

  // 5. Guess the Number Validation
  else if (type === 'guess_the_number') {
    const question = typeof rawItem.question === 'string' ? rawItem.question.trim() : '';
    if (!question) errors.push('Guess the number question is required');

    let targetNumber = Number(rawItem.targetNumber);
    if (isNaN(targetNumber)) {
      // Attempt parse from string
      const numMatch = String(rawItem.targetNumber || rawItem.correctAnswer || '').match(/[-+]?[0-9]*\.?[0-9]+/);
      if (numMatch) {
        targetNumber = parseFloat(numMatch[0]);
      } else {
        errors.push('Guess the number requires a valid numeric targetNumber');
      }
    }

    let toleranceRange = Number(rawItem.toleranceRange);
    if (isNaN(toleranceRange) || toleranceRange <= 0) {
      // Default to 5% or 5
      toleranceRange = Math.max(1, Math.round(Math.abs(targetNumber) * 0.05));
    }

    const unitLabel = typeof rawItem.unitLabel === 'string' ? rawItem.unitLabel.trim() : '';
    const explanation = typeof rawItem.explanation === 'string' ? rawItem.explanation.trim() : `The exact target is ${targetNumber} ${unitLabel}.`;

    if (errors.length === 0) {
      const sanitized: GuessTheNumberContentItem = {
        id,
        sport,
        difficulty,
        type: 'guess_the_number',
        question,
        targetNumber,
        toleranceRange,
        unitLabel,
        explanation,
        citation,
        instagramHook,
        suggestedHashtags,
        createdAt
      };
      return { valid: true, sanitizedItem: sanitized, errors: [] };
    }
  } else {
    errors.push(`Unknown content type: ${type}`);
  }

  return { valid: false, errors };
}
