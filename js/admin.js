// Blog Management Functions for SAMIRs Point Of View

// Sample posts data - in a real application, this would be stored in a database
const samplePosts = [
    {
        title: "5 Simple Ways to Overcome Procrastination",
        category: "productivity",
        excerpt: "Discover effective strategies to stop putting things off and start getting things done in your daily life.",
        content: `Procrastination is something we all struggle with from time to time. Whether it's that work project you've been putting off or the household chores that keep getting postponed, procrastination can significantly impact our productivity and mental well-being.

Here are 5 simple strategies that have helped me overcome procrastination:

1. The 2-Minute Rule: If a task takes less than 2 minutes to complete, do it immediately. This simple rule helps build momentum and prevents small tasks from piling up.

2. Break It Down: Large tasks can feel overwhelming. Break them into smaller, manageable steps and focus on completing one step at a time.

3. Use Time Blocking: Schedule specific time slots for tasks in your calendar. Treat these time blocks as important appointments you can't miss.

4. Eliminate Distractions: Identify what typically distracts you and create an environment that minimizes these interruptions.

5. Reward Yourself: Celebrate small wins along the way. Positive reinforcement makes it easier to stay motivated.

Remember, overcoming procrastination is a gradual process. Start with one strategy that resonates with you and build from there.`,
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        readTime: 5,
        date: "2024-12-10",
        file: "posts/overcome-procrastination.html"
    },
    {
        title: "How to Communicate Better With Your Partner",
        category: "relationships",
        excerpt: "Learn practical communication techniques that can transform your relationships and reduce daily conflicts.",
        content: `Effective communication is the foundation of any healthy relationship. Yet, many of us struggle to express our needs and listen actively to our partners.

Through my own experiences and research, I've discovered several communication techniques that can significantly improve relationship dynamics:

Active Listening Techniques:
- Give your full attention when your partner is speaking
- Avoid interrupting or formulating responses while they're talking
- Paraphrase what you heard to ensure understanding
- Ask clarifying questions instead of making assumptions

"I" Statements Framework:
Instead of saying "You always..." or "You never...", try using "I" statements:
- "I feel frustrated when..."
- "I would appreciate it if..."
- "I need help with..."

The 24-Hour Rule:
If something bothers you, address it within 24 hours. Don't let small issues build up into major resentments.

Regular Check-ins:
Schedule weekly relationship check-ins where you can discuss anything without judgment or immediate solutions needed.

Remember, communication is a skill that improves with practice. Be patient with yourself and your partner as you work on these techniques together.`,
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        readTime: 7,
        date: "2024-12-08",
        file: "posts/communicate-better-partner.html"
    },
    {
        title: "Managing Money Stress: A Practical Guide",
        category: "finance",
        excerpt: "Simple steps to take control of your finances and reduce the anxiety that comes with money management.",
        content: `Money stress affects nearly everyone at some point in their lives. Whether it's worrying about bills, saving for the future, or dealing with debt, financial anxiety can be overwhelming.

After years of struggling with money management, I've developed a practical approach that has significantly reduced my financial stress:

1. Create a Basic Budget:
Start with the 50/30/20 rule:
- 50% for needs (rent, utilities, groceries)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

2. Build an Emergency Fund:
Aim for 3-6 months of living expenses. Start small - even $500 can cover most minor emergencies.

3. Track Your Spending:
Use a simple app or spreadsheet to understand where your money goes each month. Awareness is the first step toward control.

4. Automate Your Finances:
Set up automatic transfers for savings and bill payments. This reduces decision fatigue and ensures consistency.

5. Educate Yourself:
Spend 15 minutes each week learning about personal finance. Small, consistent learning adds up over time.

6. Practice Mindful Spending:
Before making purchases, ask yourself:
- Do I need this?
- Will this bring me lasting happiness?
- Can I afford this without stress?

Remember, financial peace isn't about having lots of money - it's about having control over the money you have. Start with one small step today.`,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        readTime: 6,
        date: "2024-12-05",
        file: "posts/managing-money-stress.html"
    }
];

// Get all posts
async function getAllPosts() {
    // In a real application, this would fetch from an API or database
    // For now, we return the sample posts
    return samplePosts;
}

// Get posts by category
async function getPostsByCategory(category) {
    const posts = await getAllPosts();
    if (category === 'all') return posts;
    return posts.filter(post => post.category === category);
}

// Get single post by file name
async function getPostByFile(fileName) {
    const posts = await getAllPosts();
    return posts.find(post => post.file === fileName);
}
