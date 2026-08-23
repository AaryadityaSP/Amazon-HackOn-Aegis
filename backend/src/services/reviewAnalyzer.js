const { BayesClassifier, SentimentAnalyzer, PorterStemmer, JaroWinklerDistance, TfIdf, WordTokenizer } = require('natural');
const { ComprehendClient, DetectSentimentCommand, DetectEntitiesCommand, DetectKeyPhrasesCommand } = require('@aws-sdk/client-comprehend');

const classifier = new BayesClassifier();
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const tokenizer = new WordTokenizer();

// In-memory stores for demo purposes
const productReviews = new Map(); // productId -> array of { text, timestamp, userId }

const comprehendClient = new ComprehendClient({ region: process.env.AWS_REGION || 'us-east-1' });

function initClassifier() {
  console.log('🤖 [ReviewAnalyzer] Initializing Bayesian Classifier...');
  
  const fakePatterns = [
    'Great product highly recommended amazing quality',
    'Best purchase ever fast delivery excellent',
    'Love it perfect buy now',
    'Amazing wonderful superb fantastic',
    'Very good product nice quality recommended',
    '5 stars great buy',
    'Awesome product best in market',
    'Excellent quality fast shipping',
    'Super happy with purchase highly recommend everyone',
    'Good product nice fast shipping recommended'
  ];

  const genuinePatterns = [
    'The battery lasts about 6 hours with heavy use which is decent',
    'Camera quality is good in daylight but struggles in low light conditions',
    'Fits perfectly true to size the material feels premium',
    'Received the product in 3 days packaging was good but the charger was missing',
    'Display is crisp at 120hz refresh rate but speakers could be louder',
    'The stitching on the collar started coming apart after 2 weeks',
    'Works well for basic tasks but lags with heavy multitasking',
    'Good value for the price point compared to Samsung alternatives',
    'The 50MP camera takes sharp photos but video stabilization needs improvement',
    'Build quality is solid but the phone is heavier than expected at 210g'
  ];

  fakePatterns.forEach(text => classifier.addDocument(text, 'fake'));
  genuinePatterns.forEach(text => classifier.addDocument(text, 'genuine'));

  classifier.train();
  console.log('✅ [ReviewAnalyzer] Classifier trained successfully with fake and genuine patterns!');
}

async function analyzeReview(reviewText, rating, userId, productId) {
  console.log(`🔍 [ReviewAnalyzer] Starting analysis for review by user ${userId} on product ${productId}`);
  const now = Date.now();
  
  if (!productReviews.has(productId)) {
    productReviews.set(productId, []);
  }
  const recentReviews = productReviews.get(productId);

  const checks = {};
  const flagReasons = [];

  // 1. Bot Detection (Bayesian Classifier)
  const classification = classifier.classify(reviewText);
  const botConfidence = classification === 'fake' ? 0.85 : 0.9;
  checks.botDetection = {
    classification,
    confidence: botConfidence
  };
  
  let botScore = classification === 'genuine' ? 100 : 20;
  console.log(`🤖 [Bot Detection] Result: ${classification}`);
  if (classification === 'fake') flagReasons.push('Text matches known fake review patterns.');

  // 2. Sentiment Match
  const tokens = tokenizer.tokenize(reviewText);
  const sentimentScore = analyzer.getSentiment(tokens);
  let sentimentLabel = 'neutral';
  if (sentimentScore > 0.2) sentimentLabel = 'positive';
  else if (sentimentScore < -0.2) sentimentLabel = 'negative';

  let matchesRating = true;
  let mismatchPenalty = 0;
  
  if (sentimentLabel === 'positive' && rating <= 2) {
    matchesRating = false;
    mismatchPenalty = 30;
  } else if (sentimentLabel === 'negative' && rating >= 4) {
    matchesRating = false;
    mismatchPenalty = 30;
  }

  checks.sentiment = {
    score: sentimentScore,
    label: sentimentLabel,
    matchesRating,
    mismatchPenalty
  };
  
  let sentimentScoreComponent = matchesRating ? 100 : (100 - mismatchPenalty);
  console.log(`🎭 [Sentiment] Score: ${sentimentScore.toFixed(2)}, Match with Rating (${rating}): ${matchesRating}`);
  if (!matchesRating) flagReasons.push('Sentiment of review does not match the star rating.');

  // 3. Text Similarity
  let mostSimilarReview = null;
  let highestSimilarity = 0;
  let isCopyPaste = false;

  recentReviews.forEach(r => {
    if (r.userId !== userId) {
      const sim = JaroWinklerDistance(reviewText, r.text);
      if (sim > highestSimilarity) {
        highestSimilarity = sim;
        mostSimilarReview = r.text;
      }
    }
  });

  if (highestSimilarity > 0.85) {
    isCopyPaste = true;
  }

  checks.textSimilarity = {
    mostSimilarReview: isCopyPaste ? mostSimilarReview : null,
    similarityScore: highestSimilarity,
    isCopyPaste
  };
  
  console.log(`👯 [Similarity] Highest similarity: ${highestSimilarity.toFixed(2)} - CopyPaste: ${isCopyPaste}`);
  if (isCopyPaste) flagReasons.push('Review is highly similar to a recent review (possible copy-paste).');

  // 4. Specificity
  const tfidf = new TfIdf();
  tfidf.addDocument(reviewText);
  
  const numbersOrMeasurements = reviewText.match(/\b(\d+[a-zA-Z]+|\d+\.\d+|\d+)\b/g) || [];
  const longWords = tokens.filter(t => t.length > 7);
  
  let specificityScore = Math.min(100, (numbersOrMeasurements.length * 15) + (longWords.length * 5));
  if (specificityScore < 20) specificityScore = 20; 
  
  checks.specificity = {
    score: specificityScore,
    productSpecificTerms: numbersOrMeasurements,
    genericTermCount: tokens.length - longWords.length - numbersOrMeasurements.length
  };
  console.log(`🔬 [Specificity] Score: ${specificityScore}`);

  // 5. Temporal Anomaly
  const ONE_HOUR = 60 * 60 * 1000;
  const reviewsInLastHour = recentReviews.filter(r => (now - r.timestamp) < ONE_HOUR).length;
  const isAnomaly = reviewsInLastHour > 10;
  
  checks.temporalAnomaly = {
    reviewsInLastHour,
    isAnomaly,
    threshold: 10
  };
  
  console.log(`⏰ [Temporal] Reviews in last hour: ${reviewsInLastHour} - Anomaly: ${isAnomaly}`);
  if (isAnomaly) flagReasons.push('Unusual spike in review volume for this product.');

  // 6. AWS Comprehend
  let comprehendData = {
    sentiment: 'UNKNOWN',
    sentimentScores: {},
    entities: [],
    keyPhrases: []
  };
  
  try {
    const [sentimentRes, entitiesRes, phrasesRes] = await Promise.all([
      comprehendClient.send(new DetectSentimentCommand({ Text: reviewText, LanguageCode: 'en' })),
      comprehendClient.send(new DetectEntitiesCommand({ Text: reviewText, LanguageCode: 'en' })),
      comprehendClient.send(new DetectKeyPhrasesCommand({ Text: reviewText, LanguageCode: 'en' }))
    ]);
    
    comprehendData = {
      sentiment: sentimentRes.Sentiment,
      sentimentScores: sentimentRes.SentimentScore,
      entities: entitiesRes.Entities.map(e => e.Text),
      keyPhrases: phrasesRes.KeyPhrases.map(p => p.Text)
    };
    console.log(`☁️ [Comprehend] AWS Analysis successful. Entities found: ${comprehendData.entities.length}`);
  } catch (error) {
    console.error(`⚠️ [Comprehend] AWS Comprehend analysis failed: ${error.message}`);
  }
  checks.comprehend = comprehendData;
  
  let comprehendScore = (comprehendData.entities.length > 0 || comprehendData.keyPhrases.length > 1) ? 100 : 50;

  // Calculate Overall Score
  let authenticityScore = (
    (botScore * 0.30) +
    (sentimentScoreComponent * 0.20) +
    (specificityScore * 0.20) +
    (comprehendScore * 0.15)
  );
  
  // Penalties (remaining 15% weight)
  if (isCopyPaste) authenticityScore -= 10;
  if (isAnomaly) authenticityScore -= 5;
  
  authenticityScore = Math.max(0, Math.min(100, Math.round(authenticityScore)));
  
  const flagged = authenticityScore < 40;
  if (flagged && flagReasons.length === 0) {
    flagReasons.push('Low overall authenticity score.');
  }

  console.log(`📊 [ReviewAnalyzer] Final Authenticity Score: ${authenticityScore}/100. Flagged: ${flagged}`);

  // Store review
  recentReviews.push({ text: reviewText, timestamp: now, userId });

  return {
    authenticityScore,
    checks,
    flagged,
    flagReasons
  };
}

module.exports = {
  initClassifier,
  analyzeReview
};
