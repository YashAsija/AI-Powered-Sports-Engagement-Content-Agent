import { VectorFactDocument } from '../types';

export const INITIAL_VECTOR_FACTS: VectorFactDocument[] = [
  // CRICKET
  {
    id: 'cric-001',
    sport: 'Cricket',
    category: 'records',
    factTitle: 'Highest Individual Score in ODI Cricket',
    factSnippet: 'Rohit Sharma holds the world record for the highest individual score in One Day Internationals (ODI), scoring 264 runs off 173 balls against Sri Lanka at Eden Gardens, Kolkata on November 13, 2014.',
    era: '2014',
    keywords: ['rohit sharma', '264', 'odi record', 'highest score', 'eden gardens', 'sri lanka', 'double century'],
    sourceReference: 'ICC Official Archive / ESPNcricinfo Records',
  },
  {
    id: 'cric-002',
    sport: 'Cricket',
    category: 'records',
    factTitle: 'Virat Kohli Most Runs in a Single World Cup Edition',
    factSnippet: 'Virat Kohli scored a record-breaking 765 runs in 11 innings during the 2023 ICC Men\'s Cricket World Cup, surpassing Sachin Tendulkar\'s previous record of 673 runs set in 2003.',
    era: '2023 World Cup',
    keywords: ['virat kohli', '765 runs', '2023 world cup', 'sachin tendulkar', 'odi record', 'most runs'],
    sourceReference: 'ICC Cricket World Cup 2023 Tournament Stats',
  },
  {
    id: 'cric-003',
    sport: 'Cricket',
    category: 'milestones',
    factTitle: 'Muttiah Muralitharan 800 Test Wickets',
    factSnippet: 'Muttiah Muralitharan of Sri Lanka is the highest wicket-taker in Test cricket history with 800 wickets in 133 matches, claiming his 800th wicket with his final delivery in Test cricket against India in 2010.',
    era: '1992-2010',
    keywords: ['muttiah muralitharan', '800 wickets', 'test cricket', 'sri lanka', 'highest wicket taker'],
    sourceReference: 'Wisden Cricketers\' Almanack',
  },
  {
    id: 'cric-004',
    sport: 'Cricket',
    category: 'tournaments',
    factTitle: 'Australia ICC Men\'s ODI World Cup Titles',
    factSnippet: 'The Australia Men\'s national cricket team has won the ICC Men\'s Cricket World Cup a record 6 times (1987, 1999, 2003, 2007, 2015, and 2023).',
    era: '1987-2023',
    keywords: ['australia', 'world cup titles', '6 titles', '1987', '1999', '2003', '2007', '2015', '2023', 'pat cummins'],
    sourceReference: 'ICC Historical World Cup Database',
  },
  {
    id: 'cric-005',
    sport: 'Cricket',
    category: 'records',
    factTitle: 'Yuvraj Singh 6 Sixes in an Over',
    factSnippet: 'Yuvraj Singh smashed Stuart Broad for 6 consecutive sixes in an over during the inaugural 2007 ICC World Twenty20 match between India and England in Durban, scoring a 12-ball fifty.',
    era: '2007 T20 World Cup',
    keywords: ['yuvraj singh', '6 sixes', 'stuart broad', '2007 t20 world cup', 'durban', '12 ball fifty'],
    sourceReference: 'ICC T20 Archives',
  },
  {
    id: 'cric-006',
    sport: 'Cricket',
    category: 'records',
    factTitle: 'Brian Lara 400 Not Out in Test Match',
    factSnippet: 'Brian Lara scored 400 not out for the West Indies against England at Antigua Recreation Ground in April 2004, the highest individual score in Test match cricket history.',
    era: '2004',
    keywords: ['brian lara', '400 not out', 'test record', 'antigua', 'west indies', 'quadruple century'],
    sourceReference: 'West Indies Cricket Board / Wisden Records',
  },
  {
    id: 'cric-007',
    sport: 'Cricket',
    category: 'milestones',
    factTitle: 'Glenn Maxwell 201 Not Out World Cup Chasing Double Ton',
    factSnippet: 'Glenn Maxwell struck an unbeaten 201 off 128 balls while battling severe full-body cramps to guide Australia from 91/7 to 293/7 against Afghanistan in the 2023 ICC World Cup at Wankhede Stadium.',
    era: '2023 World Cup',
    keywords: ['glenn maxwell', '201 not out', 'wankhede', 'afghanistan', 'cramps double ton', 'australia chase'],
    sourceReference: 'ICC World Cup 2023 Match Archives',
  },
  {
    id: 'cric-008',
    sport: 'Cricket',
    category: 'milestones',
    factTitle: 'Anil Kumble 10 Wickets in a Test Innings (Perfect 10)',
    factSnippet: 'Anil Kumble took all 10 wickets in a single Test innings (10/74 in 26.3 overs) against Pakistan at Feroz Shah Kotla, Delhi on February 7, 1999, becoming only the second bowler after Jim Laker to achieve the feat.',
    era: '1999',
    keywords: ['anil kumble', 'perfect 10', '10 wickets', 'feroz shah kotla', 'pakistan', 'jim laker'],
    sourceReference: 'BCCI & ICC Test Archives',
  },

  // FOOTBALL
  {
    id: 'foot-001',
    sport: 'Football',
    category: 'records',
    factTitle: 'Lionel Messi 91 Goals in a Calendar Year',
    factSnippet: 'In 2012, Lionel Messi scored 91 official goals (79 for FC Barcelona and 12 for Argentina) in 69 games, breaking Gerd Müller\'s 40-year-old world record of 85 goals set in 1972.',
    era: '2012',
    keywords: ['lionel messi', '91 goals', 'calendar year', 'barcelona', 'argentina', 'gerd muller', 'guinness world records'],
    sourceReference: 'Guinness World Records / FIFA Official Statistics',
  },
  {
    id: 'foot-002',
    sport: 'Football',
    category: 'records',
    factTitle: 'Cristiano Ronaldo All-Time International Top Scorer',
    factSnippet: 'Cristiano Ronaldo is the all-time leading international goalscorer in men\'s football history, surpassing Ali Daei\'s 109 goals in September 2021, and boasting over 130 international goals for Portugal.',
    era: '2003-Present',
    keywords: ['cristiano ronaldo', 'international goals', 'portugal', 'ali daei', 'all-time top scorer', '130+ goals'],
    sourceReference: 'UEFA / FIFA Official International Records',
  },
  {
    id: 'foot-003',
    sport: 'Football',
    category: 'tournaments',
    factTitle: 'Real Madrid 15 UEFA Champions League Titles',
    factSnippet: 'Real Madrid holds the record for the most UEFA Champions League / European Cup titles with 15 trophies, securing their 15th victory at Wembley Stadium in June 2024 against Borussia Dortmund.',
    era: '1956-2024',
    keywords: ['real madrid', '15 titles', 'la decimoquinta', 'champions league', 'wembley 2024', 'carlo ancelotti'],
    sourceReference: 'UEFA Champions League Official Record Book',
  },
  {
    id: 'foot-004',
    sport: 'Football',
    category: 'records',
    factTitle: 'Pele Only Player with Three FIFA World Cup Victories',
    factSnippet: 'Pelé (Edson Arantes do Nascimento) of Brazil is the only football player in history to win three FIFA World Cup tournaments: Sweden 1958, Chile 1962, and Mexico 1970.',
    era: '1958-1970',
    keywords: ['pele', '3 world cups', 'brazil', '1958', '1962', '1970', 'edson arantes'],
    sourceReference: 'FIFA Museum & World Cup Archive',
  },
  {
    id: 'foot-005',
    sport: 'Football',
    category: 'milestones',
    factTitle: 'Arsenal 2003-04 Invincibles Season',
    factSnippet: 'Arsenal completed the entire 38-game 2003–04 Premier League season undefeated under manager Arsène Wenger, finishing with 26 wins, 12 draws, and 0 losses (The Invincibles).',
    era: '2003-2004',
    keywords: ['arsenal', 'invincibles', 'arsene wenger', 'thierry henry', 'undefeated', '38 games', 'premier league'],
    sourceReference: 'Premier League Official Archives',
  },
  {
    id: 'foot-006',
    sport: 'Football',
    category: 'records',
    factTitle: 'Robert Lewandowski 5 Goals in 9 Minutes',
    factSnippet: 'On September 22, 2015, Robert Lewandowski came on as a second-half substitute for Bayern Munich against Wolfsburg and scored 5 goals in just 8 minutes and 59 seconds, setting 4 Guinness World Records.',
    era: '2015',
    keywords: ['robert lewandowski', '5 goals 9 minutes', 'bayern munich', 'wolfsburg', 'guinness world records', 'fastest hattrick'],
    sourceReference: 'Bundesliga Official Historical Stats',
  },
  {
    id: 'foot-007',
    sport: 'Football',
    category: 'milestones',
    factTitle: 'Leicester City 5000-to-1 Premier League Title (2015-16)',
    factSnippet: 'Under Claudio Ranieri, Leicester City won the 2015–16 English Premier League title with 81 points after bookmakers opened the season offering odds of 5,000-to-1 against them.',
    era: '2015-2016',
    keywords: ['leicester city', '5000 to 1', 'premier league title', 'jamie vardy', 'riyad mahrez', 'claudio ranieri'],
    sourceReference: 'Premier League Historical Archive',
  },

  // TENNIS
  {
    id: 'ten-001',
    sport: 'Tennis',
    category: 'records',
    factTitle: 'Rafael Nadal 14 French Open (Roland Garros) Titles',
    factSnippet: 'Rafael Nadal has won the French Open (Roland Garros) men\'s singles title a historic 14 times between 2005 and 2022, earning the title "King of Clay" with a 112-4 win-loss match record in Paris.',
    era: '2005-2022',
    keywords: ['rafael nadal', '14 roland garros', 'french open', 'king of clay', '112-4', 'grand slam'],
    sourceReference: 'Roland Garros Official Historical Archives',
  },
  {
    id: 'ten-002',
    sport: 'Tennis',
    category: 'records',
    factTitle: 'Novak Djokovic Most Men\'s Singles Grand Slam Titles',
    factSnippet: 'Novak Djokovic holds the all-time men\'s record for the most Grand Slam singles titles with 24 titles (10 Australian Opens, 7 Wimbledons, 4 US Opens, 3 French Opens), plus the Career Golden Slam achieved at Paris 2024.',
    era: '2008-Present',
    keywords: ['novak djokovic', '24 grand slams', 'australian open 10', 'career golden slam', 'paris 2024 gold'],
    sourceReference: 'ATP Tour / ITF Records Database',
  },
  {
    id: 'ten-003',
    sport: 'Tennis',
    category: 'records',
    factTitle: 'Roger Federer 237 Consecutive Weeks at World No. 1',
    factSnippet: 'Roger Federer holds the all-time ATP record for the most consecutive weeks ranked World No. 1 at 237 consecutive weeks from February 2, 2004 to August 17, 2008.',
    era: '2004-2008',
    keywords: ['roger federer', '237 consecutive weeks', 'world number 1', 'atp tour', 'tennis legend'],
    sourceReference: 'ATP Rankings History',
  },
  {
    id: 'ten-004',
    sport: 'Tennis',
    category: 'records',
    factTitle: 'Longest Match in Tennis History (Isner vs Mahut)',
    factSnippet: 'The longest tennis match in history was played at Wimbledon 2010 between John Isner and Nicolas Mahut, lasting 11 hours and 5 minutes over 3 days, ending 70–68 in the 5th set in favor of Isner.',
    era: 'Wimbledon 2010',
    keywords: ['john isner', 'nicolas mahut', '11 hours 5 minutes', '70-68', 'longest tennis match', 'wimbledon'],
    sourceReference: 'Wimbledon All England Lawn Tennis Club Archives',
  },
  {
    id: 'ten-005',
    sport: 'Tennis',
    category: 'records',
    factTitle: 'Steffi Graf Calendar Year Golden Slam 1988',
    factSnippet: 'In 1988, Steffi Graf achieved the only Calendar Year Golden Slam in tennis history by winning all four Grand Slam singles titles (Australian Open, French Open, Wimbledon, US Open) and Olympic Gold in Seoul in the same year.',
    era: '1988',
    keywords: ['steffi graf', 'golden slam', '1988', 'seoul olympics', 'all four grand slams', 'wta record'],
    sourceReference: 'WTA / ITF Tennis Hall of Fame',
  },
  {
    id: 'ten-006',
    sport: 'Tennis',
    category: 'milestones',
    factTitle: 'Carlos Alcaraz Youngest Men\'s World No. 1 in ATP History',
    factSnippet: 'Carlos Alcaraz became the youngest ATP World No. 1 in history at 19 years, 4 months and 6 days after winning the 2022 US Open, and later won titles across hard, clay, and grass before age 21.',
    era: '2022-Present',
    keywords: ['carlos alcaraz', 'youngest world no 1', '19 years', 'us open 2022', 'wimbledon 2023', 'roland garros 2024'],
    sourceReference: 'ATP Tour Record Book',
  },

  // BASKETBALL
  {
    id: 'bask-001',
    sport: 'Basketball',
    category: 'records',
    factTitle: 'Wilt Chamberlain 100-Point Game',
    factSnippet: 'Wilt Chamberlain scored 100 points for the Philadelphia Warriors against the New York Knicks on March 2, 1962 in Hershey, Pennsylvania, which remains the single-game scoring record in NBA history.',
    era: '1962',
    keywords: ['wilt chamberlain', '100 points', 'nba single game record', 'philadelphia warriors', '1962'],
    sourceReference: 'NBA Official Historical Records',
  },
  {
    id: 'bask-002',
    sport: 'Basketball',
    category: 'records',
    factTitle: 'LeBron James All-Time NBA Scoring Leader',
    factSnippet: 'LeBron James surpassed Kareem Abdul-Jabbar\'s 38,387 career points on February 7, 2023, and became the first player in NBA history to surpass 40,000 career regular season points in March 2024.',
    era: '2003-Present',
    keywords: ['lebron james', 'all-time scoring leader', '40000 points', 'kareem abdul-jabbar', 'lakers', 'nba'],
    sourceReference: 'NBA Official Stats Database',
  },
  {
    id: 'bask-003',
    sport: 'Basketball',
    category: 'records',
    factTitle: 'Stephen Curry All-Time 3-Point Field Goal Leader',
    factSnippet: 'Stephen Curry broke Ray Allen\'s NBA career three-point record in December 2021 at Madison Square Garden, and is the first player in NBA history to cross 3,500 made career 3-pointers.',
    era: '2009-Present',
    keywords: ['stephen curry', '3-pointers', 'three point record', 'golden state warriors', 'ray allen', 'madison square garden'],
    sourceReference: 'NBA Stats & Elias Sports Bureau',
  },
  {
    id: 'bask-004',
    sport: 'Basketball',
    category: 'tournaments',
    factTitle: 'Boston Celtics Most NBA Championships (18)',
    factSnippet: 'The Boston Celtics won their 18th NBA Championship in June 2024 after defeating the Dallas Mavericks 4-1, breaking their tie with the Los Angeles Lakers (17) for the most titles in NBA history.',
    era: '1957-2024',
    keywords: ['boston celtics', '18 championships', 'banner 18', 'lakers tie', 'jayson tatum', 'jaylen brown', '2024 nba finals'],
    sourceReference: 'NBA Finals Encyclopedia',
  },
  {
    id: 'bask-005',
    sport: 'Basketball',
    category: 'records',
    factTitle: 'Kobe Bryant 81-Point Game in Modern Era',
    factSnippet: 'On January 22, 2006, Kobe Bryant scored 81 points for the Los Angeles Lakers against the Toronto Raptors, the second-highest single-game point total in NBA history.',
    era: '2006',
    keywords: ['kobe bryant', '81 points', 'toronto raptors', 'lakers', 'modern scoring record'],
    sourceReference: 'NBA Official Game Logs 2006',
  },

  // BADMINTON
  {
    id: 'bad-001',
    sport: 'Badminton',
    category: 'records',
    factTitle: 'Lin Dan Two-Time Olympic Singles Champion & Super Grand Slam',
    factSnippet: 'Lin Dan of China ("Super Dan") is the only men\'s singles badminton player to complete the "Super Grand Slam" by winning all nine major badminton titles, and won back-to-back Olympic Gold medals in 2008 and 2012.',
    era: '2004-2016',
    keywords: ['lin dan', 'super dan', 'olympic gold 2008 2012', 'super grand slam', 'china badminton', 'lee chong wei rivalry'],
    sourceReference: 'BWF (Badminton World Federation) Hall of Fame',
  },
  {
    id: 'bad-002',
    sport: 'Badminton',
    category: 'records',
    factTitle: 'Fastest Badminton Smash in Recorded History',
    factSnippet: 'The official Guinness World Record for the fastest smash in badminton was struck by Satwiksairaj Rankireddy of India at 565 km/h (351 mph) in a controlled test in 2023, faster than the top speed of an F1 car.',
    era: '2023',
    keywords: ['fastest badminton smash', '565 km/h', 'satwiksairaj rankireddy', 'yonex nanoray', 'guinness world records', 'badminton speed'],
    sourceReference: 'Guinness World Records / Yonex Test Data',
  },
  {
    id: 'bad-003',
    sport: 'Badminton',
    category: 'milestones',
    factTitle: 'PV Sindhu Consecutive Olympic Medals for India',
    factSnippet: 'PV Sindhu is the first Indian woman to win two individual Olympic medals in badminton, winning Silver at Rio 2016 and Bronze at Tokyo 2020, as well as the BWF World Championship Gold in 2019.',
    era: '2016-2021',
    keywords: ['pv sindhu', 'olympic medals', 'rio 2016', 'tokyo 2020', 'bwf world championship 2019', 'india badminton'],
    sourceReference: 'Indian Olympic Association / BWF Records',
  },
  {
    id: 'bad-004',
    sport: 'Badminton',
    category: 'records',
    factTitle: 'Viktor Axelsen 39-Match Unbeaten Streak in 2022',
    factSnippet: 'Viktor Axelsen of Denmark went on a dominant 39-match unbeaten streak in 2022, securing Olympic Gold, the World Championship, and the All England Open title in the same calendar year.',
    era: '2021-2024',
    keywords: ['viktor axelsen', '39 match streak', 'denmark badminton', 'world champion', 'olympic champion'],
    sourceReference: 'BWF Official Tour Records',
  },

  // FORMULA 1
  {
    id: 'f1-001',
    sport: 'Formula 1',
    category: 'records',
    factTitle: 'Lewis Hamilton & Michael Schumacher 7 World Championships',
    factSnippet: 'Lewis Hamilton and Michael Schumacher share the record for the most Formula 1 World Drivers\' Championships in history, each with 7 World Championship titles.',
    era: '1994-2020',
    keywords: ['lewis hamilton', 'michael schumacher', '7 world championships', 'f1 titles', 'ferrari', 'mercedes'],
    sourceReference: 'FIA Formula 1 World Championship Official Records',
  },
  {
    id: 'f1-002',
    sport: 'Formula 1',
    category: 'records',
    factTitle: 'Max Verstappen 19 Wins in a Single F1 Season (2023)',
    factSnippet: 'Max Verstappen set the all-time Formula 1 record for most Grand Prix wins in a single season in 2023, winning 19 out of 22 races (an 86.4% win rate) with Red Bull Racing.',
    era: '2023',
    keywords: ['max verstappen', '19 wins', '2023 season', 'red bull racing', 'f1 record', 'win percentage'],
    sourceReference: 'Formula 1 Official Database 2023',
  },
  {
    id: 'f1-003',
    sport: 'Formula 1',
    category: 'records',
    factTitle: 'Ayrton Senna 6 Monaco Grand Prix Victories',
    factSnippet: 'Ayrton Senna holds the record for the most Monaco Grand Prix victories with 6 wins (including 5 consecutive wins between 1989 and 1993), earning the title "King of Monaco".',
    era: '1987-1993',
    keywords: ['ayrton senna', 'monaco grand prix', '6 wins', 'king of monaco', 'mclaren', 'monaco circuit'],
    sourceReference: 'Automobile Club de Monaco / FIA Records',
  },
  {
    id: 'f1-004',
    sport: 'Formula 1',
    category: 'milestones',
    factTitle: 'Sebastian Vettel 9 Consecutive Grand Prix Victories in 2013',
    factSnippet: 'Sebastian Vettel won 9 consecutive Grand Prix races in the 2013 season with Red Bull Racing from Belgium to Brazil, setting a long-standing consecutive win milestone.',
    era: '2013',
    keywords: ['sebastian vettel', '9 consecutive wins', '2013 season', 'red bull racing', 'consecutive victories'],
    sourceReference: 'Formula 1 Official Records',
  },

  // ATHLETICS & OLYMPICS
  {
    id: 'ath-001',
    sport: 'Athletics & Olympics',
    category: 'records',
    factTitle: 'Usain Bolt 9.58s 100m World Record',
    factSnippet: 'Usain Bolt of Jamaica set the 100-meter world record at 9.58 seconds at the 2009 World Athletics Championships in Berlin, reaching a top running speed of 44.72 km/h (27.78 mph).',
    era: '2009',
    keywords: ['usain bolt', '9.58', '100m world record', 'berlin 2009', 'fastest man alive', 'jamaica'],
    sourceReference: 'World Athletics Official Records',
  },
  {
    id: 'ath-002',
    sport: 'Athletics & Olympics',
    category: 'records',
    factTitle: 'Michael Phelps 23 Olympic Gold Medals',
    factSnippet: 'Michael Phelps of the USA is the most decorated Olympian of all time with 28 total Olympic medals, including an astonishing 23 Olympic Gold medals won between Athens 2004 and Rio 2016.',
    era: '2004-2016',
    keywords: ['michael phelps', '23 gold medals', '28 medals', 'most decorated olympian', 'swimming', 'usa'],
    sourceReference: 'International Olympic Committee (IOC) Historical Records',
  },
  {
    id: 'ath-003',
    sport: 'Athletics & Olympics',
    category: 'records',
    factTitle: 'Eliud Kipchoge Historic Sub-2-Hour Marathon (1:59:40)',
    factSnippet: 'Eliud Kipchoge of Kenya became the first person in human history to run a marathon in under two hours, clocking 1:59:40.2 at the INEOS 1:59 Challenge in Vienna on October 12, 2019.',
    era: '2019',
    keywords: ['eliud kipchoge', 'sub 2 hour marathon', '1:59:40', 'vienna', 'marathon world record', 'kenya'],
    sourceReference: 'INEOS 1:59 Challenge / World Athletics',
  },
  {
    id: 'ath-004',
    sport: 'Athletics & Olympics',
    category: 'records',
    factTitle: 'Mondo Duplantis 6.25m+ Pole Vault World Record',
    factSnippet: 'Armand "Mondo" Duplantis of Sweden cleared 6.25 meters at the Paris 2024 Olympics, breaking the pole vault world record for the 9th time in his career in front of 80,000 spectators.',
    era: 'Paris 2024',
    keywords: ['mondo duplantis', '6.25m', 'pole vault world record', 'paris 2024 olympics', 'sweden'],
    sourceReference: 'World Athletics / Olympic Paris 2024 Records',
  }
];

// Vector Store Engine (ChromaDB-compatible In-Memory Store with TF-IDF Vector Cosine Similarity)
export class ChromaSportsVectorStore {
  private documents: VectorFactDocument[] = [];
  private vocabulary: Map<string, number> = new Map();
  private docVectors: Map<string, number[]> = new Map();

  constructor(initialDocs: VectorFactDocument[] = INITIAL_VECTOR_FACTS) {
    this.documents = [...initialDocs];
    this.buildIndex();
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }

  private buildIndex() {
    this.vocabulary.clear();
    this.docVectors.clear();

    // 1. Build vocabulary
    let termIndex = 0;
    for (const doc of this.documents) {
      const fullText = `${doc.sport} ${doc.category} ${doc.factTitle} ${doc.factSnippet} ${doc.keywords.join(' ')}`;
      const tokens = this.tokenize(fullText);
      for (const token of tokens) {
        if (!this.vocabulary.has(token)) {
          this.vocabulary.set(token, termIndex++);
        }
      }
    }

    const vocabSize = this.vocabulary.size;
    if (vocabSize === 0) return;

    // 2. Compute vectors for each doc
    for (const doc of this.documents) {
      const fullText = `${doc.sport} ${doc.category} ${doc.factTitle} ${doc.factSnippet} ${doc.keywords.join(' ')}`;
      const tokens = this.tokenize(fullText);
      const vec = new Array(vocabSize).fill(0);
      for (const token of tokens) {
        const idx = this.vocabulary.get(token);
        if (idx !== undefined) {
          vec[idx] += 1;
        }
      }
      // Normalize vector length
      const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
      if (norm > 0) {
        for (let i = 0; i < vocabSize; i++) {
          vec[i] = vec[i] / norm;
        }
      }
      this.docVectors.set(doc.id, vec);
    }
  }

  public query(queryText: string, sportFilter?: string, topK: number = 3): { document: VectorFactDocument; score: number }[] {
    const vocabSize = this.vocabulary.size;
    if (vocabSize === 0) return [];

    const queryTokens = this.tokenize(queryText);
    const queryVec = new Array(vocabSize).fill(0);
    for (const token of queryTokens) {
      const idx = this.vocabulary.get(token);
      if (idx !== undefined) {
        queryVec[idx] += 1;
      }
    }
    const queryNorm = Math.sqrt(queryVec.reduce((sum, val) => sum + val * val, 0));
    if (queryNorm > 0) {
      for (let i = 0; i < vocabSize; i++) {
        queryVec[i] = queryVec[i] / queryNorm;
      }
    }

    const scored: { document: VectorFactDocument; score: number }[] = [];

    for (const doc of this.documents) {
      if (sportFilter && sportFilter !== 'All' && sportFilter !== 'Custom') {
        if (!doc.sport.toLowerCase().includes(sportFilter.toLowerCase()) && 
            !sportFilter.toLowerCase().includes(doc.sport.toLowerCase())) {
          continue;
        }
      }

      const docVec = this.docVectors.get(doc.id);
      if (!docVec) continue;

      // Cosine similarity
      let dotProduct = 0;
      for (let i = 0; i < vocabSize; i++) {
        dotProduct += queryVec[i] * docVec[i];
      }

      // Keyword boost
      const queryLower = queryText.toLowerCase();
      let boost = 0;
      if (doc.keywords.some(k => queryLower.includes(k.toLowerCase()) || k.toLowerCase().includes(queryLower))) {
        boost += 0.25;
      }
      if (queryLower.includes(doc.sport.toLowerCase())) {
        boost += 0.15;
      }

      const finalScore = Math.min(0.99, Number((dotProduct + boost).toFixed(4)));
      scored.push({ document: doc, score: finalScore });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  public getAll(): VectorFactDocument[] {
    return [...this.documents];
  }

  public addDocument(doc: Omit<VectorFactDocument, 'id'>): VectorFactDocument {
    const newDoc: VectorFactDocument = {
      ...doc,
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    this.documents.push(newDoc);
    this.buildIndex();
    return newDoc;
  }
}

export const globalVectorStore = new ChromaSportsVectorStore();
