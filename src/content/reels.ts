// Short editorial hooks for the feed. Project facts still come from projects.ts.
export const reelStories: Record<string, { hook: string; takeaway: string; note: string }> = {
  "password-manager": {
    hook: "Your passwords. Your side of the boundary.",
    takeaway: "Signing in and decrypting a vault are two different jobs. This project explores that boundary.",
    note: "Custom sessions → encrypted storage → client-side decryption",
  },
  "fund-my-vision": {
    hook: "An idea needs someone who believes in it.",
    takeaway: "A hackathon project bringing ideators and investors into one place, with roles, KYC workflows, and chat.",
    note: "Discover an idea → understand the roles → start a conversation",
  },
  vidya: {
    hook: "Curiosity deserves a starting point.",
    takeaway: "An Olympiad awareness website helping students in Nepal begin exploring new opportunities.",
    note: "A question → a little direction → a world to explore",
  },
};
