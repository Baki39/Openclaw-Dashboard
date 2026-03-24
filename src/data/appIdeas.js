// Multiple App Ideas for Selection
// User can select which app they want to build

export const appIdeas = [
  {
    id: 1,
    name: 'AI Image Enhancer',
    icon: '🖼️',
    tagline: 'Enhance blurry photos with AI power',
    primaryKeyword: 'AI Photo Enhancer',
    searchVolume: '15,000+/month',
    difficulty: 'Low-Medium (32/100)',
    revenue: '$200-500/month',
    developmentTime: '5-6 days',
    category: 'Photography',
    monetization: 'Free (AdMob) + Premium ($2.99)',
    status: 'Waiting for Selection',
    
    // Technical Details
    apiIntegrations: [
      { name: 'Google ML Kit', purpose: 'Image labeling & face detection', required: true },
      { name: 'Firebase Analytics', purpose: 'Track user behavior', required: true },
      { name: 'AdMob', purpose: 'Banner + Interstitial ads', required: true },
    ],
    
    features: [
      'AI-powered photo enhancement',
      'One-tap quality boost',
      'Blur removal',
      'Resolution upscaling',
      'Before/After comparison',
      'Save & Share functionality',
      'Batch processing (Premium)',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM + Clean Architecture',
    },
    
    storeListing: {
      title: 'AI Image Enhancer - Photo Quality Booster',
      shortDescription: 'Enhance blurry photos with advanced AI technology',
      fullDescription: 'Transform your photos with AI-powered enhancement. Fix blur, upscale resolution, and make old photos crystal clear. Perfect for social media, printing, and memories.',
      tags: ['photo enhancer', 'ai photo', 'image quality', 'blur remover', 'photo editor'],
    },
  },
  {
    id: 2,
    name: 'Budget Tracker Pro',
    icon: '💰',
    tagline: 'Track expenses & save money effortlessly',
    primaryKeyword: 'Budget Tracker',
    searchVolume: '12,000+/month',
    difficulty: 'Low (28/100)',
    revenue: '$150-400/month',
    developmentTime: '4-5 days',
    category: 'Finance',
    monetization: 'Free (Ads) + Premium ($3.99)',
    status: 'Available',
    
    apiIntegrations: [
      { name: 'Firebase Auth', purpose: 'User authentication', required: true },
      { name: 'Firebase Firestore', purpose: 'Store transactions & categories', required: true },
      { name: 'AdMob', purpose: 'Banner ads', required: false },
    ],
    
    features: [
      'Add/Edit/Delete transactions',
      'Category management',
      'Budget limits per category',
      'Monthly summary charts',
      'Export to CSV',
      'Recurring transactions',
      'Dark mode',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM + Clean Architecture',
    },
    
    storeListing: {
      title: 'Budget Tracker Pro - Expense Manager',
      shortDescription: 'Track expenses and manage your budget with ease',
      fullDescription: 'Take control of your finances with Budget Tracker Pro. Track expenses, set budgets, and see where your money goes. Beautiful charts and easy exports.',
      tags: ['budget', 'expense tracker', 'money manager', 'personal finance', 'savings'],
    },
  },
  {
    id: 3,
    name: 'Habit Tracker',
    icon: '✅',
    tagline: 'Build better habits, one day at a time',
    primaryKeyword: 'Habit Tracker',
    searchVolume: '10,000+/month',
    difficulty: 'Low (25/100)',
    revenue: '$100-300/month',
    developmentTime: '4-5 days',
    category: 'Productivity',
    monetization: 'Free (Ads) + Premium ($2.99)',
    status: 'Available',
    
    apiIntegrations: [
      { name: 'Firebase Auth', purpose: 'User authentication', required: false },
      { name: 'Firebase Firestore', purpose: 'Store habits & progress', required: true },
      { name: 'WorkManager', purpose: 'Daily reminders', required: true },
    ],
    
    features: [
      'Create custom habits',
      'Daily/Weekly tracking',
      'Streak counters',
      'Progress charts',
      'Reminders & notifications',
      'Habit categories',
      'Statistics dashboard',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 26,
      targetSdk: 34,
      architecture: 'MVVM',
    },
    
    storeListing: {
      title: 'Habit Tracker - Build Better Habits',
      shortDescription: 'Track daily habits and build consistent routines',
      fullDescription: 'Develop positive habits and break bad ones with Habit Tracker. Set goals, track progress, and celebrate streaks. Your personal accountability partner.',
      tags: ['habit tracker', 'productivity', 'goal setting', 'self improvement', 'daily routine'],
    },
  },
  {
    id: 4,
    name: 'AI Writing Assistant',
    icon: '✍️',
    tagline: 'Write better content with AI help',
    primaryKeyword: 'AI Writing Assistant',
    searchVolume: '8,000+/month',
    difficulty: 'Medium (38/100)',
    revenue: '$300-600/month',
    developmentTime: '6-7 days',
    category: 'Productivity',
    monetization: 'Freemium (API calls limited)',
    status: 'Available',
    
    apiIntegrations: [
      { name: 'OpenAI API', purpose: 'AI text generation', required: true },
      { name: 'Firebase Auth', purpose: 'User accounts', required: true },
      { name: 'AdMob', purpose: 'Interstitial ads', required: false },
    ],
    
    features: [
      'AI-powered text generation',
      'Grammar & style checker',
      'Content templates',
      'History & saved drafts',
      'Export to docs',
      'Tone adjustment',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM + Repository',
    },
    
    storeListing: {
      title: 'AI Writing Assistant - Create Better Content',
      shortDescription: 'Write emails, posts, and stories with AI assistance',
      fullDescription: 'Supercharge your writing with AI Writing Assistant. Generate ideas, improve grammar, and create better content faster. Perfect for emails, social media, and more.',
      tags: ['ai writer', 'writing assistant', 'content creator', 'grammar checker', 'email writer'],
    },
  },
  {
    id: 5,
    name: 'Meal Planner',
    icon: '🍳',
    tagline: 'Plan meals, shop smart, eat better',
    primaryKeyword: 'Meal Planner',
    searchVolume: '7,000+/month',
    difficulty: 'Low (30/100)',
    revenue: '$150-350/month',
    developmentTime: '5-6 days',
    category: 'Lifestyle',
    monetization: 'Free (Ads) + Premium ($3.99)',
    status: 'Available',
    
    apiIntegrations: [
      { name: 'Firebase Auth', purpose: 'User accounts', required: true },
      { name: 'Firebase Firestore', purpose: 'Store recipes & plans', required: true },
      { name: 'AdMob', purpose: 'Banner ads', required: true },
    ],
    
    features: [
      'Weekly meal planning',
      'Recipe database',
      'Shopping list generation',
      'Calorie tracking',
      'Nutritional info',
      'Meal categories',
      'Favorites & collections',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM + Clean Architecture',
    },
    
    storeListing: {
      title: 'Meal Planner - Plan & Shop Smart',
      shortDescription: 'Plan weekly meals and generate shopping lists',
      fullDescription: 'Simplify your meal planning with Meal Planner. Plan weekly menus, track nutrition, and automatically generate shopping lists. Eat healthier and save time.',
      tags: ['meal planner', 'recipe app', 'healthy eating', 'shopping list', 'nutrition'],
    },
  },
  {
    id: 6,
    name: 'Background Remover',
    icon: '✂️',
    tagline: 'Remove backgrounds from any image',
    primaryKeyword: 'Background Remover',
    searchVolume: '11,000+/month',
    difficulty: 'Medium (35/100)',
    revenue: '$200-450/month',
    developmentTime: '5-6 days',
    category: 'Photography',
    monetization: 'Freemium (credits system)',
    status: 'Available',
    
    apiIntegrations: [
      { name: 'remove.bg API', purpose: 'Background removal', required: true },
      { name: 'Firebase Storage', purpose: 'Store processed images', required: true },
      { name: 'AdMob', purpose: 'Banner + Interstitial', required: true },
    ],
    
    features: [
      'One-tap background removal',
      'Multiple export formats',
      'Batch processing',
      'Custom backgrounds',
      'Before/After view',
      'Social media templates',
    ],
    
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM',
    },
    
    storeListing: {
      title: 'Background Remover - Cut Out Any Image',
      shortDescription: 'Remove backgrounds from photos instantly',
      fullDescription: 'Easily remove backgrounds from any image. Perfect for product photos, profile pictures, and creative projects. Professional results in seconds.',
      tags: ['background remover', 'photo cutout', 'image editor', 'product photography', 'transparent background'],
    },
  },
];

// Get app by ID
export const getAppById = (id) => {
  return appIdeas.find(app => app.id === id);
};

// Default export
export default appIdeas;