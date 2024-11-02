# Required Libraries
import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from sentence_transformers import SentenceTransformer
import torch
from collections import Counter, defaultdict
import spacy
from sklearn.cluster import KMeans
from textblob import TextBlob

# Class Definition
class EnhancedReviewAnalyzer:
    def __init__(self, batch_size=8):
        # Initialize models
        self.sentiment_model_name = "cardiffnlp/twitter-roberta-base-sentiment"
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model=self.sentiment_model_name,
            tokenizer=self.sentiment_model_name,
            device=0 if torch.cuda.is_available() else -1
        )
        
        # Initialize Sentence-BERT for semantic analysis
        self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Load spaCy for NLP tasks
        self.nlp = spacy.load('en_core_web_sm')
        
        self.batch_size = batch_size
        
        # Define problem categories and keywords
        self.problem_categories = {
            'service': ['slow', 'rude', 'unprofessional', 'wait', 'service', 'staff', 'waiter', 'waitress'],
            'food_quality': ['cold', 'undercooked', 'raw', 'stale', 'burnt', 'tasteless', 'bland'],
            'hygiene': ['dirty', 'unclean', 'hair', 'bug', 'insect', 'cockroach', 'flies'],
            'price': ['expensive', 'overpriced', 'pricey', 'costly', 'price'],
            'portion': ['small', 'tiny', 'portion', 'size', 'quantity'],
            'ambiance': ['noisy', 'loud', 'dirty', 'crowded', 'uncomfortable', 'temperature']
        }

    def analyze_reviews(self, reviews):
        """Main analysis function"""
        # Basic sentiment and aspect analysis
        sentiments = self._analyze_sentiment(reviews)
        aspects = self._extract_aspects(reviews)
        
        # Problem identification
        problems = self._identify_problems(reviews, sentiments)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(problems, aspects)
        
        # Detailed statistics
        statistics = self._calculate_detailed_stats(sentiments, problems)
        
        return {
            'sentiment_analysis': sentiments,
            'identified_problems': problems,
            'recommendations': recommendations,
            'statistics': statistics,
            'aspects': aspects
        }

    def _analyze_sentiment(self, reviews):
        """Analyze the sentiment of the reviews"""
        return self.sentiment_analyzer(reviews)

    def _extract_aspects(self, reviews):
        """Extract aspects mentioned in the reviews using Sentence-BERT"""
        aspect_embeddings = self.sentence_model.encode(reviews, batch_size=self.batch_size)
        return aspect_embeddings

    def _identify_problems(self, reviews, sentiments):
        """Identify specific problems from negative reviews"""
        problems = defaultdict(list)
        
        for review, sentiment in zip(reviews, sentiments):
            if sentiment['label'] == 'LABEL_0' or sentiment['score'] < 0.6:  # Assuming 'LABEL_0' as negative
                doc = self.nlp(review.lower())
                
                # Check each problem category
                for category, keywords in self.problem_categories.items():
                    for keyword in keywords:
                        if keyword in review.lower():
                            # Find the specific sentence containing the problem
                            sentences = [sent.text.strip() for sent in doc.sents if keyword in sent.text.lower()]
                            if sentences:
                                problems[category].append({
                                    'review_text': review,
                                    'problem_sentence': sentences[0],
                                    'severity': self._calculate_severity(sentiment['score'], sentences[0])
                                })
                                
        return dict(problems)
    
    def _calculate_severity(self, sentiment_confidence, problem_sentence):
        """Calculate problem severity based on sentiment and language"""
        # Use TextBlob for additional sentiment analysis
        blob = TextBlob(problem_sentence)
        
        # Factors affecting severity:
        # 1. Sentiment confidence
        # 2. Presence of intense words
        # 3. TextBlob polarity
        intense_words = ['very', 'extremely', 'terrible', 'horrible', 'worst', 'never']
        intensity_factor = sum(1 for word in intense_words if word in problem_sentence.lower())
        
        severity = (
            (1 - sentiment_confidence) * 0.4 +  # Sentiment confidence contribution
            (abs(blob.sentiment.polarity) * 0.4) +  # TextBlob polarity contribution
            (min(intensity_factor * 0.2, 0.2))  # Intensity words contribution
        )
        
        # Normalize to 1-5 scale
        return round(1 + severity * 4)

    def _generate_recommendations(self, problems, aspects):
        """Generate specific recommendations based on identified problems"""
        recommendations = {
            'critical': [],
            'important': [],
            'moderate': []
        }
        
        # Problem-specific recommendations
        problem_count = defaultdict(int)
        severity_sum = defaultdict(int)
        
        # Calculate average severity and frequency for each category
        for category, issues in problems.items():
            problem_count[category] = len(issues)
            severity_sum[category] = sum(issue['severity'] for issue in issues)
            
            avg_severity = severity_sum[category] / len(issues) if issues else 0
            
            if avg_severity >= 4:
                priority = 'critical'
            elif avg_severity >= 3:
                priority = 'important'
            else:
                priority = 'moderate'
            
            # Generate specific recommendations
            if category == 'service':
                if avg_severity >= 4:
                    recommendations[priority].append({
                        'area': 'Service',
                        'issue': f"Serious service issues identified in {len(issues)} reviews",
                        'recommendation': "Implement immediate staff training program and review service protocols",
                        'example_reviews': [issue['problem_sentence'] for issue in issues[:3]]
                    })
            elif category == 'food_quality':
                recommendations[priority].append({
                    'area': 'Food Quality',
                    'issue': f"Quality concerns found in {len(issues)} reviews",
                    'recommendation': "Review food preparation standards and implement quality checks",
                    'example_reviews': [issue['problem_sentence'] for issue in issues[:3]]
                })
                
            # Add similar blocks for other categories...
        
        return recommendations

    def _calculate_detailed_stats(self, sentiments, problems):
        """Calculate detailed statistics including problem distribution"""
        sentiment_counts = Counter(s['label'] for s in sentiments)
        problem_counts = {category: len(issues) for category, issues in problems.items()}
        
        return {
            'total_reviews': len(sentiments),
            'sentiment_distribution': dict(sentiment_counts),
            'problem_distribution': problem_counts,
            'top_problems': sorted(
                problem_counts.items(),
                key=lambda x: x[1],
                reverse=True
            )[:3],
            'average_problem_severity': {
                category: np.mean([issue['severity'] for issue in issues]) if len(issues) > 0 else 0
                for category, issues in problems.items()
            }
        }

# Sample input

# Running the analysis
# analyzer = EnhancedReviewAnalyzer()
# results = analyzer.analyze_reviews(sample_reviews)

# Displaying the results
