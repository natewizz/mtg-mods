/**
 * Google Apps Script to create Cantripped Beta Feedback Form
 * 
 * Instructions:
 * 1. Open Google Apps Script (script.google.com)
 * 2. Create a new project
 * 3. Copy and paste this code
 * 4. Run the createCantrippedFeedbackForm function
 * 5. Run the createMTGModsFeedbackForm function
 */

function createCantrippedFeedbackForm() {
  const form = FormApp.create('Cantripped Beta Testing Feedback');
  
  form.setDescription('Thank you for testing Cantripped! We\'re building a community platform for Magic: The Gathering rule modifications and custom game variants. Your feedback will help us improve before our full launch.');
  
  // Basic info section
  const basicInfoSection = form.addSectionHeaderItem();
  basicInfoSection.setTitle('Basic Information');
  
  // Email (required)
  const emailItem = form.addTextItem();
  emailItem.setTitle('Email Address')
    .setRequired(true)
    .setHelpText('We\'ll use this to follow up on your feedback and notify you about updates.');
  
  // Age group
  const ageItem = form.addMultipleChoiceItem();
  ageItem.setTitle('What is your age group?')
    .setChoiceValues([
      'Under 18',
      '18-24',
      '25-34', 
      '35-44',
      '45-54',
      '55+'
    ])
    .setRequired(true);
  
  // MTG experience
  const experienceItem = form.addMultipleChoiceItem();
  experienceItem.setTitle('How long have you been playing Magic: The Gathering?')
    .setChoiceValues([
      'Less than 1 year',
      '1-3 years',
      '3-5 years',
      '5-10 years',
      '10+ years',
      'I don\'t play MTG'
    ])
    .setRequired(true);
  
  // Platform usage section
  const usageSection = form.addSectionHeaderItem();
  usageSection.setTitle('Platform Usage');
  
  // How did you find us
  const discoveryItem = form.addMultipleChoiceItem();
  discoveryItem.setTitle('How did you discover Cantripped?')
    .setChoiceValues([
      'Social media (Twitter/X, Instagram, etc.)',
      'Friend recommendation',
      'Search engine',
      'MTG community forum',
      'Discord server',
      'Other'
    ])
    .setRequired(true);
  
  // Usage frequency
  const frequencyItem = form.addMultipleChoiceItem();
  frequencyItem.setTitle('How often do you use Cantripped?')
    .setChoiceValues([
      'Daily',
      'Several times a week',
      'Once a week',
      'A few times a month',
      'Rarely',
      'This is my first time'
    ])
    .setRequired(true);
  
  // Features section
  const featuresSection = form.addSectionHeaderItem();
  featuresSection.setTitle('Features & Functionality');
  
  // Recipe creation
  const recipeCreationItem = form.addMultipleChoiceItem();
  recipeCreationItem.setTitle('Have you created any recipes on Cantripped?')
    .setChoiceValues([
      'Yes, multiple recipes',
      'Yes, one recipe',
      'No, but I plan to',
      'No, and I don\'t plan to'
    ])
    .setRequired(true);
  
  // Favorite features
  const favoriteFeaturesItem = form.addCheckboxGridItem();
  favoriteFeaturesItem.setTitle('Which features do you find most useful? (Check all that apply)')
    .setRows([
      'Recipe browsing',
      'Recipe creation',
      'User profiles',
      'Voting system',
      'Tag system',
      'Community features',
      'Mobile experience',
      'Search functionality'
    ])
    .setColumns(['Very Useful', 'Somewhat Useful', 'Not Useful'])
    .setRequired(true);
  
  // Feedback section
  const feedbackSection = form.addSectionHeaderItem();
  feedbackSection.setTitle('Feedback & Suggestions');
  
  // Overall experience
  const experienceRatingItem = form.addScaleItem();
  experienceRatingItem.setTitle('How would you rate your overall experience with Cantripped?')
    .setBounds(1, 10)
    .setLabels('Poor', 'Excellent')
    .setRequired(true);
  
  // Describe to friend
  const describeItem = form.addParagraphTextItem();
  describeItem.setTitle('How would you describe Cantripped to a friend?')
    .setRequired(true)
    .setHelpText('Please be honest and specific about what you like and don\'t like.');
  
  // Recommendation likelihood
  const recommendationItem = form.addScaleItem();
  recommendationItem.setTitle('How likely are you to recommend Cantripped to other Magic players?')
    .setBounds(0, 10)
    .setLabels('Not at all likely', 'Extremely likely')
    .setRequired(true);
  
  // What they like most
  const likesItem = form.addParagraphTextItem();
  likesItem.setTitle('What did you like most about Cantripped?')
    .setRequired(true)
    .setHelpText('What features or aspects stood out to you?');
  
  // What could be improved
  const improvementsItem = form.addParagraphTextItem();
  improvementsItem.setTitle('What could Cantripped improve?')
    .setRequired(true)
    .setHelpText('Be specific about what you\'d like to see changed or added.');
  
  // Additional comments
  const commentsItem = form.addParagraphTextItem();
  commentsItem.setTitle('Any additional comments or suggestions?')
    .setRequired(false);
  
  // Contact preferences
  const contactSection = form.addSectionHeaderItem();
  contactSection.setTitle('Contact Preferences');
  
  const contactItem = form.addMultipleChoiceItem();
  contactItem.setTitle('Would you like us to contact you about your feedback?')
    .setChoiceValues([
      'Yes, please contact me',
      'No, thank you'
    ])
    .setRequired(true);
  
  // Set form settings
  form.setCollectEmail(true);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  
  // Set confirmation message
  form.setConfirmationMessage('Thank you for your feedback! We appreciate you taking the time to help us improve Cantripped.');
  
  console.log('Form created successfully!');
  console.log('Form URL: ' + form.getPublishedUrl());
  console.log('Form ID: ' + form.getId());
  
  return form;
}

// Simple version for quick testing
function createSimpleForm() {
  const form = FormApp.create('Cantripped Beta Test - Simple');
  
  form.setDescription('Quick test version of the Cantripped feedback form');
  
  const emailItem = form.addTextItem();
  emailItem.setTitle('Email Address').setRequired(true);
  
  const feedbackItem = form.addParagraphTextItem();
  feedbackItem.setTitle('What do you think of Cantripped?').setRequired(true);
  
  const ratingItem = form.addScaleItem();
  ratingItem.setTitle('Rate your experience (1-10)').setBounds(1, 10);
  
  form.setConfirmationMessage('Thanks for your feedback!');
  
  console.log('Simple form created!');
  console.log('Form URL: ' + form.getPublishedUrl());
  
  return form;
} 