/**
 * Google Apps Script to create MTG Mods Beta Feedback Form
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Run the createMTGModsFeedbackForm function
 * 5. Check your Google Drive for the new form
 */

function createMTGModsFeedbackForm() {
  // Create the form
  const form = FormApp.create('MTG Mods Beta Testing Feedback');
  
  // Set form description
  form.setDescription('Thank you for testing MTG Mods! We\'re building a community platform for Magic: The Gathering rule modifications and custom game variants. Your feedback will help us improve before our full launch.');
  
  // Set form settings
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setAcceptingResponses(true);
  
  // Section 1: Getting Started
  form.addSectionHeaderItem()
    .setTitle('Getting Started');
  
  form.addMultipleChoiceItem()
    .setTitle('How easy was it to sign up and get started?')
    .setChoiceValues(['Very easy', 'Easy', 'Neutral', 'Difficult', 'Very difficult'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('What sign-in method did you use?')
    .setChoiceValues(['Google', 'Discord', 'Email/Password', 'I didn\'t sign up'])
    .setRequired(true);
  
  form.addTextItem()
    .setTitle('If you had trouble signing up, what was the issue?')
    .setRequired(false);
  
  // Section 2: Core Features
  form.addSectionHeaderItem()
    .setTitle('Core Features');
  
  form.addMultipleChoiceItem()
    .setTitle('Did you try creating a recipe? If yes, how was the experience?')
    .setChoiceValues(['Yes, it was intuitive', 'Yes, but I needed help figuring it out', 'Yes, but it was confusing', 'No, I didn\'t try', 'No, I couldn\'t find how to do it'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('Did you try browsing/reading recipes? How was that experience?')
    .setChoiceValues(['Great - easy to find and read recipes', 'Good - mostly clear', 'Okay - some confusion', 'Poor - hard to navigate', 'I didn\'t browse recipes'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('How clear is the concept of "recipes" for MTG rule modifications?')
    .setChoiceValues(['Very clear - I immediately understood', 'Clear - made sense after looking around', 'Somewhat clear - needed some thinking', 'Unclear - confusing terminology', 'Very unclear - I don\'t get it'])
    .setRequired(true);
  
  // Section 3: Specific Feedback
  form.addSectionHeaderItem()
    .setTitle('Specific Feedback');
  
  form.addCheckboxItem()
    .setTitle('What features did you use? (Check all that apply)')
    .setChoiceValues(['Browsing recipes', 'Creating a recipe', 'Editing a recipe', 'Voting on recipes', 'Bookmarking recipes', 'Marking recipes as "tried"', 'Filtering by tags', 'Contact form', 'Profile setup'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('Did you encounter any bugs or errors?')
    .setChoiceValues(['No issues', 'Minor issues that didn\'t stop me', 'Major issues that prevented me from doing something', 'The site was mostly broken for me'])
    .setRequired(true);
  
  form.addParagraphTextItem()
    .setTitle('If you encountered bugs, please describe them:')
    .setRequired(false);
  
  // Section 4: Content & Community
  form.addSectionHeaderItem()
    .setTitle('Content & Community');
  
  form.addParagraphTextItem()
    .setTitle('How would you describe MTG Mods to a friend?')
    .setRequired(true);
  
  form.addCheckboxItem()
    .setTitle('What type of MTG rule modifications interest you most?')
    .setChoiceValues(['Casual/fun variants', 'Competitive format tweaks', 'Deck building restrictions', 'Multiplayer modifications', 'Draft/limited variants', 'Commander/EDH modifications', 'Other'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('Would you share your own rule modifications here?')
    .setChoiceValues(['Definitely yes', 'Probably yes', 'Maybe', 'Probably not', 'Definitely not'])
    .setRequired(true);
  
  // Section 5: Missing Features
  form.addSectionHeaderItem()
    .setTitle('Missing Features');
  
  form.addCheckboxItem()
    .setTitle('What features do you wish existed? (Check all that apply)')
    .setChoiceValues(['Comments on recipes', 'Recipe ratings/reviews', 'Following other users', 'Recipe collections/folders', 'Advanced search', 'Mobile app', 'Recipe templates', 'Playtesting notes', 'Video/image uploads', 'Integration with deck builders', 'Other'])
    .setRequired(false);
  
  form.addTextItem()
    .setTitle('What\'s the #1 feature you\'d want added next?')
    .setRequired(true);
  
  // Section 6: Overall Experience
  form.addSectionHeaderItem()
    .setTitle('Overall Experience');
  
  form.addScaleItem()
    .setTitle('How likely are you to recommend MTG Mods to other Magic players?')
    .setBounds(0, 10)
    .setLabels('Not at all likely', 'Extremely likely')
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('What almost stopped you from using the site?')
    .setChoiceValues(['Nothing - smooth experience', 'Confusing navigation', 'Unclear purpose', 'Technical issues', 'Required sign-up', 'Lack of content', 'Other'])
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('Overall, how would you rate your experience?')
    .setChoiceValues(['Excellent', 'Good', 'Fair', 'Poor', 'Very poor'])
    .setRequired(true);
  
  // Section 7: Open Feedback
  form.addSectionHeaderItem()
    .setTitle('Open Feedback');
  
  form.addParagraphTextItem()
    .setTitle('What did you like most about MTG Mods?')
    .setRequired(true);
  
  form.addParagraphTextItem()
    .setTitle('What frustrated you the most?')
    .setRequired(false);
  
  form.addParagraphTextItem()
    .setTitle('Any other suggestions or comments?')
    .setRequired(false);
  
  form.addMultipleChoiceItem()
    .setTitle('Would you like us to follow up with you about your feedback?')
    .setChoiceValues(['Yes (please provide email below)', 'No, thanks'])
    .setRequired(false);
  
  form.addTextItem()
    .setTitle('If yes, your email address:')
    .setRequired(false);
  
  // Set up response destination (optional)
  // Uncomment the next line if you want responses to go to a specific spreadsheet
  // form.setDestination(FormApp.DestinationType.SPREADSHEET, 'your-spreadsheet-id');
  
  // Log the form URL
  console.log('Form created successfully!');
  console.log('Form URL: ' + form.getPublishedUrl());
  console.log('Edit URL: ' + form.getEditUrl());
  
  // Return the form for further manipulation if needed
  return form;
}

/**
 * Alternative function to create a simpler version for testing
 */
function createSimpleTestForm() {
  const form = FormApp.create('MTG Mods Beta Test - Simple');
  
  form.setDescription('Quick test version of the MTG Mods feedback form');
  
  form.addMultipleChoiceItem()
    .setTitle('How easy was sign-up?')
    .setChoiceValues(['Very easy', 'Easy', 'Neutral', 'Difficult', 'Very difficult'])
    .setRequired(true);
  
  form.addParagraphTextItem()
    .setTitle('Any feedback?')
    .setRequired(false);
  
  console.log('Simple form created: ' + form.getPublishedUrl());
  return form;
} 