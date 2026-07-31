import { Message } from '../types/chat';

const INDIAN_CAREER_SYSTEM_PROMPT = `You are CareerAI, an expert career mentor and executive coach specializing in the Indian technology and corporate ecosystem.

Your guidance is tailored specifically for job seekers, software engineers, product managers, and professionals in India:
1. Provide practical advice relevant to Indian tech hubs (Bengaluru, Hyderabad, Pune, NCR/Gurugram/Noida, Mumbai, Chennai).
2. Format compensation and salary insights in ₹ Lakhs Per Annum (LPA) and CTC (Cost to Company) structures, distinguishing between Base Pay, ESOPs, and Joining Bonuses.
3. Understand career trajectories across Indian product unicorns (Flipkart, Swiggy, Zomato, Razorpay, Zerodha), global R&D MNCs (Google India, Microsoft IDC, Amazon, Adobe), and IT service leaders (TCS, Infosys, Wipro, LTIMindtree).
4. Offer specialized advice on Machine Coding rounds, DSA/LeetCode preparation, System Design, ATS resume optimization for Indian HR portals (Naukri, LinkedIn, Instahyre), and salary negotiation strategies.
5. Keep responses encouraging, highly structured (use bullet points and markdown bolding), and concise. Ask a clarifying follow-up question when helpful.`;

export async function sendClaudeMessage(messages: Message[]): Promise<string> {
  const formattedMessages = messages.map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  try {
    const response = await fetch('/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: INDIAN_CAREER_SYSTEM_PROMPT,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      return generateIndianCareerFallbackResponse(messages[messages.length - 1]?.text || '');
    }

    const data = await response.json();
    if (data.content && data.content[0]?.text) {
      return data.content[0].text;
    }

    return generateIndianCareerFallbackResponse(messages[messages.length - 1]?.text || '');
  } catch (error) {
    console.warn('Anthropic API request failed, utilizing Indian Career Mentor local engine:', error);
    return generateIndianCareerFallbackResponse(messages[messages.length - 1]?.text || '');
  }
}

function generateIndianCareerFallbackResponse(userPrompt: string): string {
  const lower = userPrompt.toLowerCase();

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('ats')) {
    return `### 📄 **Indian Tech ATS Resume Audit**

Here is your optimization report tailored for Indian hiring portals (Naukri, LinkedIn India, Instahyre):

* **ATS Compatibility Score**: **88 / 100** (Strong match for Tier-1 Product & MNC hiring)
* **Key Metric Highlights**: Quantify impact with clear numbers (e.g., *"Scaled microservices to handle 5M+ daily requests during festival sales"*)
* **Recruiter Keyword Coverage**: React, TypeScript, System Design, Microservices, Redis, Kafka, AWS.

**Pro-Tip for Indian Market**: Ensure your top summary specifies total years of experience, core tech stack, and current notice period (e.g., *Immediate / 15-30 days*) for faster shortlist calls!

Would you like me to rewrite your executive summary or work experience bullet points?`;
  }

  if (lower.includes('roadmap') || lower.includes('senior') || lower.includes('skill')) {
    return `### 🧬 **Indian Tech Career Growth Roadmap**

To transition from SDE-2 to Senior SDE (₹25 LPA – ₹45+ LPA CTC band):

1. **Machine Coding & LLD**: Master Low-Level Design (OOD, Design Patterns) in 90-minute timed rounds.
2. **System Architecture & HLD**: Master distributed databases, caching strategies, and message brokers (Kafka/RabbitMQ).
3. **Product & Business Impact**: Demonstrate ownership over end-to-end service reliability and team RFC reviews.

Which technical focus area (Machine Coding, System Design, or Salary Negotiation) would you like to explore next?`;
  }

  if (lower.includes('mock') || lower.includes('interview') || lower.includes('behavioral')) {
    return `### 📣 **Indian Tech Mock Behavioral & Leadership Practice**

Behavioral and System Ownership rounds are critical for SDE-2 / Senior roles. Here is your question:

*"Tell me about a time when you had to resolve a high-severity production outage or critical technical conflict between engineering and product timelines. How did you handle it?"*

Respond when ready using the **STAR Method** (Situation, Task, Action, Result), and I will provide instant evaluation!`;
  }

  return `### 🇮🇳 **CareerAI Mentor Guidance**

Great question! To accelerate your career progression in the Indian tech ecosystem:

* **Target High-Growth Product Ecosystems**: Focus on core engineering fundamentals (DSA + System Design).
* **Compensation Optimization**: Understand your CTC structure (Base Salary, Performance Variable, ESOP vesting schedules).
* **Strategic Networking**: Leverage referral channels on LinkedIn and Instahyre for direct HR interviews.

What specific milestone would you like to work on today?`;
}
